<template>
    <b-modal :id="modalId" :ref="modalId" no-fade :title="$saas.t('pages.token.forms.create.title')">
        <b-form id="form-token-create" v-if="$saas.getSecurity().isAuth() && this.userLoaded" @submit="onSubmit">
            <b-alert v-if="form.hasError() && form.getResponse()" variant="danger" dismissible :show="true">
                <template v-if="form.getResponse().getCode() >= 400 && form.getResponse().getCode() < 500">
                    {{ $saas.t('pages.token.forms.create.errors.4x') }}
                </template>

                <template v-if="form.getResponse().getCode() >= 500">
                    {{ $saas.t('pages.token.forms.create.errors.5x') }}
                </template>
            </b-alert>

            <b-form-group :label="$saas.t('pages.token.forms.create.fields.note.label')" label-for="note">
                <b-form-input id="note" type="text" v-model="token.note" required autocomplete="off" :placeholder="$saas.t('pages.token.forms.create.fields.note.placeholder')"></b-form-input>
                <b-form-invalid-feedback :state="validateNote()">
                    {{ $saas.t('pages.token.forms.create.validations.note') }}
                </b-form-invalid-feedback>
            </b-form-group>
        </b-form>

        <template v-slot:modal-footer="{ cancel }">
            <b-button @click="cancel()">
                {{ $saas.t('pages.token.forms.create.buttons.cancel') }}
            </b-button>
            <b-button form="form-token-create" type="submit" variant="primary" :disabled="form.isDisabled() || !validator.isValid">
                {{ $saas.t('pages.token.forms.create.buttons.create') }}
            </b-button>
        </template>
    </b-modal>
</template>

<script lang="ts">
import {Component, Mixins, Prop} from 'vue-property-decorator';
import UserMixin from '../../../../mixins/User.vue';
import Form from '../../../../packages/form/basic/form';
import Validator from '../../../../packages/validator/basic/validator';
import {BModal, BvModalEvent} from 'bootstrap-vue';
import Token from '../../../../models/token';
import TokenUtil from '../../../../utils/token';

@Component
export default class Create extends Mixins(UserMixin) {
  @Prop(Array) readonly tokens!: Token[];

  private modalId: string = 'token-create';
  private token: Token = new Token();
  private form: Form = new Form();
  private validator: Validator = new Validator([
    this.validateNote,
  ]);

  public validateNote(): boolean | null {
    if (this.token.note === null) {
      return null;
    }

    return this.token.note.length >= 4 && this.token.note.length <= 30;
  }

  created() {
    this.onModalHide();
  }

  public onModalHide(): void {
    this.$root.$on('bv::modal::hide', (bvEvent: BvModalEvent, modalId: string) => {
      if (this.modalId === modalId) {
        this.token = new Token();
      }
    });
  }

  public onSubmit($event: Event) {
    $event.preventDefault();
    this.form.setError(false);
    this.form.setDisabled(true);
    this.form.setResponse(null);

    this.token.token = TokenUtil.generate();
    this.$saas.getHttp().post('/api/auth/token', this.token).then((data) => {
      this.form.setResponse(this.$saas.getHttp().response(data));
      this.form.setDisabled(false);
      Object.assign(this.token, {
        id: this.form.getResponse()!.getData().data.id,
        createdAt: this.form.getResponse()!.getData().data.createdAt,
        updatedAt: this.form.getResponse()!.getData().data.updatedAt,
        token: this.form.getResponse()!.getData().data.token,
        note: this.form.getResponse()!.getData().data.note,
        userId: this.form.getResponse()!.getData().data.userId,
        teamId: this.form.getResponse()!.getData().data.teamId,
        new: true,
      });
      this.tokens.unshift(this.token);
      (this.$refs[this.modalId] as BModal).hide();
    }).catch((data) => {
      this.form.setResponse(this.$saas.getHttp().response(data.response));
      this.form.setError(true);
      this.form.setDisabled(false);
      this.token = new Token();
    });
  }
}
</script>
