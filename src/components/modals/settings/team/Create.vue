<template>
    <b-modal :id="modalId" no-fade :title="$makeless.t('pages.team.forms.create.title')">
        <b-form id="form-team-create" v-if="teamCreate" @submit="onSubmit">
            <b-alert v-if="form.hasError() && form.getResponse()" variant="danger" dismissible :show="true">
                <template v-if="form.getResponse().getCode() >= 400 && form.getResponse().getCode() < 500">
                    {{ $makeless.t('pages.team.forms.create.errors.4x') }}
                </template>

                <template v-if="form.getResponse().getCode() >= 500">
                    {{ $makeless.t('pages.team.forms.create.errors.5x') }}
                </template>
            </b-alert>

            <b-form-group :label="$makeless.t('pages.team.forms.create.fields.name.label')" label-for="name">
                <b-form-input id="name" type="text" v-model="teamCreate.name" required autocomplete="off" :placeholder="$makeless.t('pages.team.forms.create.fields.name.placeholder')"></b-form-input>
                <b-form-invalid-feedback :state="validateName()">
                    {{ $makeless.t('pages.team.forms.create.validations.name') }}
                </b-form-invalid-feedback>
            </b-form-group>

            <b-form-group :label="$makeless.t('pages.team.forms.create.fields.invitation.label')" label-for="team-invitation">
                <team-invitation :obj="teamCreate"></team-invitation>
                <b-form-invalid-feedback :state="validateEmails()">
                    {{ $makeless.t('pages.team.forms.create.validations.invitations.email') }}
                </b-form-invalid-feedback>
            </b-form-group>
        </b-form>

        <template v-slot:modal-footer="{ cancel }">
            <b-button @click="cancel()">
                {{ $makeless.t('pages.team.forms.create.buttons.cancel') }}
            </b-button>
            <b-button form="form-team-create" type="submit" variant="primary" :disabled="form.isDisabled() || !validator.isValid()">
                <b-spinner small v-if="form.isDisabled()" class="mr-1"></b-spinner>
                {{ $makeless.t('pages.team.forms.create.buttons.create') }}
            </b-button>
        </template>
    </b-modal>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import Form from '../../../../packages/form/basic/form';
import Validator from '../../../../packages/validator/basic/validator';
import {BvModalEvent} from 'bootstrap-vue';
import TeamCreate from '../../../../structs/team-create';
import Team from '../../../../models/team';
import TeamInvitation from '../../../selects/team/TeamInvitation.vue';
import ValidatorUtil from '../../../../utils/validator';
import DomUtil from '../../../../utils/dom';

@Component({
  components: {TeamInvitation},
})
export default class Create extends Vue {
  private modalId: string = 'team-create';
  private teamCreate: TeamCreate = new TeamCreate();
  private form: Form = new Form();
  private validator: Validator = new Validator([
    this.validateName,
    this.validateEmails,
  ]);

  public validateName(): boolean | null {
    if (this.teamCreate.name === null) {

      return null;
    }

    return this.teamCreate.name.length >= 4 && this.teamCreate.name.length <= 50;
  }

  public validateEmails(): boolean | null {
    if (this.teamCreate.invitations === null || this.teamCreate.invitations.length === 0) {
      return true;
    }

    if (this.teamCreate.invitations.length > 5) {
      return false;
    }

    for (let i = 0; i < this.teamCreate.invitations.length; i++) {
      const invitation = this.teamCreate.invitations[i];
      if (!ValidatorUtil.isValidEmail(invitation.email) || invitation.email ===
          this.$makeless.getSecurity().getUser()!.getEmail()) {
        return false;
      }
    }

    return true;
  }

  created() {
    this.onModalHide();
  }

  public onModalHide(): void {
    this.$root.$on('bv::modal::hide', (bvEvent: BvModalEvent, modalId: string) => {
      if (this.modalId === modalId) {
        this.teamCreate = new TeamCreate();
        this.form = new Form();
      }
    });
  }

  public onSubmit($event: Event) {
    $event.preventDefault();
    DomUtil.removeFocus();

    this.form.setError(false);
    this.form.setDisabled(true);
    this.form.setResponse(null);

    this.$makeless.getHttp().post('/api/auth/team', this.teamCreate).then((data) => {
      this.form.setResponse(this.$makeless.getHttp().response(data));
      this.form.setDisabled(false);
      const team = Object.assign(new Team(), this.form.getResponse()!.getData().data);
      this.$makeless.getSecurity().addTeam(team);
      this.$makeless.getSecurity().switchToTeam(team.id!);
    }).catch((data) => {
      this.form.setResponse(this.$makeless.getHttp().response(data.response));
      this.form.setError(true);
      this.form.setDisabled(false);
    });
  }
}
</script>
