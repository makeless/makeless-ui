<template>
    <b-modal :id="modalId" :ref="modalId" no-fade :title="$makeless.t('pages.token-team.forms.delete.title')">
        <b-form v-if="token" id="form-token-team-delete" @submit="onSubmit">
            <b-alert v-if="form.hasError() && form.getResponse()" variant="danger" dismissible :show="true">
                <template v-if="form.getResponse().getCode() >= 400 && form.getResponse().getCode() < 500">
                    {{ $makeless.t('pages.token-team.forms.delete.errors.4x') }}
                </template>

                <template v-if="form.getResponse().getCode() >= 500">
                    {{ $makeless.t('pages.token-team.forms.delete.errors.5x') }}
                </template>
            </b-alert>

            <b-form-group :label="$makeless.t('pages.token-team.forms.delete.fields.note.label', {note: this.token.note})" label-for="note">
                <b-form-input id="note" type="text" v-model="note" required autocomplete="off" :placeholder="$makeless.t('pages.token-team.forms.delete.fields.note.placeholder')"></b-form-input>
                <b-form-invalid-feedback :state="validateNote()">
                    {{ $makeless.t('pages.token-team.forms.delete.validations.note') }}
                </b-form-invalid-feedback>
            </b-form-group>
        </b-form>

        <template v-slot:modal-footer="{ cancel }">
            <b-button @click="cancel()">
                {{ $makeless.t('pages.token-team.forms.delete.buttons.cancel') }}
            </b-button>
            <b-button form="form-token-team-delete" type="submit" variant="danger" :disabled="form.isDisabled() || !validator.isValid()">
                <b-spinner small v-if="form.isDisabled()" class="mr-1"></b-spinner>
                {{ $makeless.t('pages.token-team.forms.delete.buttons.delete') }}
            </b-button>
        </template>
    </b-modal>
</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator';
import Form from '../../../../../packages/form/basic/form';
import Validator from '../../../../../packages/validator/basic/validator';
import {BModal, BvModalEvent} from 'bootstrap-vue';
import Token from '../../../../../models/token';
import DomUtil from '../../../../../utils/dom';

@Component({
  name: 'Delete',
})
export default class Delete extends Vue {
  @Prop(Object) readonly token!: Token;
  @Prop(Array) readonly tokens!: Token[];

  private modalId: string = 'token-team-delete';
  private note: string | null = null;
  private form: Form = new Form();
  private validator: Validator = new Validator([
    this.validateNote,
  ]);

  public validateNote(): boolean | null {
    if (this.note === null) {
      return null;
    }

    return this.token.note === this.note;
  }

  created() {
    this.onModalHide();
  }

  public onModalHide(): void {
    this.$root.$on('bv::modal::hide', (bvEvent: BvModalEvent, modalId: string) => {
      if (this.modalId === modalId) {
        this.note = null;
        this.form = new Form();
      }
    });
  }

  public removeToken(token: Token): void {
    for (let i = 0; i < this.tokens.length; i++) {
      if (this.tokens[i].id !== token.id) {
        continue;
      }

      this.tokens.splice(i, 1);
      return;
    }
  }

  public onSubmit($event: Event) {
    $event.preventDefault();
    DomUtil.removeFocus();

    this.form.setError(false);
    this.form.setDisabled(true);
    this.form.setResponse(null);

    this.$makeless.getHttp().delete('/api/auth/team/token', {
      data: this.token,
      headers: {
        'Team': this.$makeless.getSecurity().getTeam()!.id,
      },
    }).then((data) => {
      this.form.setResponse(this.$makeless.getHttp().response(data));
      this.form.setDisabled(false);
      this.removeToken(this.token);
      (this.$refs[this.modalId] as BModal).hide();
    }).catch((data) => {
      this.form.setResponse(this.$makeless.getHttp().response(data.response));
      this.form.setError(true);
      this.form.setDisabled(false);
    });
  }
}
</script>
