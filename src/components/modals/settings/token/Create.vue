<template>
    <b-modal :id="modalId" :ref="modalId" no-fade :title="$saas.t('pages.token.forms.create.title')">
        <b-form id="form-token-create" @submit="onSubmit">
            <b-alert v-if="form.hasError() && form.getResponse()" variant="danger" dismissible :show="true">
                <template v-if="form.getResponse().getCode() >= 400 && form.getResponse().getCode() < 500">
                    {{ $saas.t('pages.token.forms.create.errors.4x') }}
                </template>

                <template v-if="form.getResponse().getCode() >= 500">
                    {{ $saas.t('pages.token.forms.create.errors.5x') }}
                </template>
            </b-alert>

            <b-form-group :label="$saas.t('pages.token.forms.create.fields.note.label')" label-for="note">
                <b-form-input id="note" type="text" v-model="tokenCreate.note" required autocomplete="off" :placeholder="$saas.t('pages.token.forms.create.fields.note.placeholder')"></b-form-input>
                <b-form-invalid-feedback :state="validateNote()">
                    {{ $saas.t('pages.token.forms.create.validations.note') }}
                </b-form-invalid-feedback>
            </b-form-group>
        </b-form>

        <template v-slot:modal-footer="{ cancel }">
            <b-button @click="cancel()">
                {{ $saas.t('pages.token.forms.create.buttons.cancel') }}
            </b-button>
            <b-button form="form-token-create" type="submit" variant="primary" :disabled="form.isDisabled() || !validator.isValid()">
                <b-spinner small v-if="form.isDisabled()" class="mr-1"></b-spinner>
                {{ $saas.t('pages.token.forms.create.buttons.create') }}
            </b-button>
        </template>
    </b-modal>
</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator';
import Form from '../../../../packages/form/basic/form';
import Validator from '../../../../packages/validator/basic/validator';
import {BModal, BvModalEvent} from 'bootstrap-vue';
import Token from '../../../../models/token';
import TokenUtil from '../../../../utils/token';
import TokenCreate from '../../../../structs/token-create';

@Component
export default class Create extends Vue {
  @Prop(Array) readonly tokens!: Token[];

  private modalId: string = 'token-create';
  private tokenCreate: TokenCreate = new TokenCreate();
  private form: Form = new Form();
  private validator: Validator = new Validator([
    this.validateNote,
  ]);

  public validateNote(): boolean | null {
    if (this.tokenCreate.note === null) {
      return null;
    }

    return this.tokenCreate.note.length >= 4 && this.tokenCreate.note.length <= 30;
  }

  created() {
    this.onModalHide();
  }

  public onModalHide(): void {
    this.$root.$on('bv::modal::hide', (bvEvent: BvModalEvent, modalId: string) => {
      if (this.modalId === modalId) {
        this.tokenCreate = new TokenCreate();
        this.form = new Form();
      }
    });
  }

  public onSubmit($event: Event) {
    $event.preventDefault();
    this.form.setError(false);
    this.form.setDisabled(true);
    this.form.setResponse(null);

    this.tokenCreate.token = TokenUtil.generate();
    this.$saas.getHttp().post('/api/auth/token', this.tokenCreate).then((data) => {
      this.form.setResponse(this.$saas.getHttp().response(data));
      this.form.setDisabled(false);
      const token = Object.assign(new Token(), this.form.getResponse()!.getData().data, {
        new: true,
      });
      this.tokens.unshift(token);
      (this.$refs[this.modalId] as BModal).hide();
    }).catch((data) => {
      this.form.setResponse(this.$saas.getHttp().response(data.response));
      this.form.setError(true);
      this.form.setDisabled(false);
      this.tokenCreate = new TokenCreate();
    });
  }
}
</script>
