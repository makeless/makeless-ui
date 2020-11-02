<template>
    <b-modal :id="modalId" :ref="modalId" no-fade :title="$makeless.t('pages.token-team.forms.create.title')">
        <b-form id="form-token-team-create" @submit="onSubmit">
            <b-alert v-if="form.hasError() && form.getResponse()" variant="danger" dismissible :show="true">
                <template v-if="form.getResponse().getCode() >= 400 && form.getResponse().getCode() < 500">
                    {{ $makeless.t('pages.token-team.forms.create.errors.4x') }}
                </template>

                <template v-if="form.getResponse().getCode() >= 500">
                    {{ $makeless.t('pages.token-team.forms.create.errors.5x') }}
                </template>
            </b-alert>

            <b-form-group :label="$makeless.t('pages.token-team.forms.create.fields.note.label')" label-for="note">
                <b-form-input id="note" type="text" v-model="token.note" required autocomplete="off" :placeholder="$makeless.t('pages.token-team.forms.create.fields.note.placeholder')"></b-form-input>
                <b-form-invalid-feedback :state="validateNote()">
                    {{ $makeless.t('pages.token-team.forms.create.validations.note') }}
                </b-form-invalid-feedback>
            </b-form-group>

            <b-form-group :label="$makeless.t('pages.token-team.forms.create.fields.teamUser.label')" label-for="team-user">
                <user :obj="token"></user>
                <b-form-invalid-feedback :state="validateUser()">
                    {{ $makeless.t('pages.token-team.forms.create.validations.user') }}
                </b-form-invalid-feedback>
            </b-form-group>
        </b-form>

        <template v-slot:modal-footer="{ cancel }">
            <b-button @click="cancel()">
                {{ $makeless.t('pages.token-team.forms.create.buttons.cancel') }}
            </b-button>
            <b-button form="form-token-team-create" type="submit" variant="primary" :disabled="form.isDisabled() || !validator.isValid()">
                <b-spinner small v-if="form.isDisabled()" class="mr-1"></b-spinner>
                {{ $makeless.t('pages.token-team.forms.create.buttons.create') }}
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
import TokenUtil from '../../../../../utils/token';
import User from '../../../../selects/team/User.vue';
import TokenTeamCreate from '../../../../../structs/token-team-create';
import DomUtil from '../../../../../utils/dom';

@Component({
  components: {User},
})
export default class Create extends Vue {
  @Prop(Array) readonly tokens!: Token[];

  private modalId: string = 'token-team-create';
  private token: TokenTeamCreate = new TokenTeamCreate();
  private form: Form = new Form();
  private validator: Validator = new Validator([
    this.validateNote,
    this.validateUser,
  ]);

  public validateNote(): boolean | null {
    if (this.token.note === null) {
      return null;
    }

    return this.token.note.length >= 4 && this.token.note.length <= 30;
  }

  public validateUser(): boolean | null {
    if (this.token.user === null) {
      return null;
    }

    return true;
  }

  created() {
    this.onModalHide();
  }

  public onModalHide(): void {
    this.$root.$on('bv::modal::hide', (bvEvent: BvModalEvent, modalId: string) => {
      if (this.modalId === modalId) {
        this.token = new Token();
        this.form = new Form();
      }
    });
  }

  public onSubmit($event: Event): void {
    $event.preventDefault();
    DomUtil.removeFocus();

    this.form.setError(false);
    this.form.setDisabled(true);
    this.form.setResponse(null);

    this.token.token = TokenUtil.generate();
    this.token.userId = this.token.user!.id;
    this.$makeless.getHttp().post('/api/auth/team/token', this.token, {
      headers: {
        'Team': this.$makeless.getSecurity().getTeam()!.id,
      },
    }).then((data) => {
      this.form.setResponse(this.$makeless.getHttp().response(data));
      this.form.setDisabled(false);
      const token = Object.assign(new Token(), this.form.getResponse()!.getData().data, {
        new: true,
      });
      this.tokens.unshift(token);
      (this.$refs[this.modalId] as BModal).hide();
    }).catch((data) => {
      this.form.setResponse(this.$makeless.getHttp().response(data.response));
      this.form.setError(true);
      this.form.setDisabled(false);
      this.token = new TokenTeamCreate();
    });
  }
}
</script>
