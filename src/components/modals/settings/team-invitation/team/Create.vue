<template>
    <b-modal :id="modalId" :ref="modalId" no-fade :title="$saas.t('pages.team-user-team.forms.create.title')">
        <b-form id="form-team-invitation-team-create" v-if="teamInvitationTeamCreate" @submit="onSubmit">
            <b-alert v-if="form.hasError() && form.getResponse()" variant="danger" dismissible :show="true">
                <template v-if="form.getResponse().getCode() >= 400 && form.getResponse().getCode() < 500">
                    {{ $saas.t('pages.team-user-team.forms.create.errors.4x') }}
                </template>

                <template v-if="form.getResponse().getCode() >= 500">
                    {{ $saas.t('pages.team-user-team.forms.create.errors.5x') }}
                </template>
            </b-alert>

            <b-form-group :label="$saas.t('pages.team-user-team.forms.create.fields.email.label')" label-for="team-invitation">
                <team-invitation :obj="teamInvitationTeamCreate"></team-invitation>
                <b-form-invalid-feedback :state="validateEmails()">
                    {{ $saas.t('pages.team-user-team.forms.create.validations.invitations.email') }}
                </b-form-invalid-feedback>
            </b-form-group>
        </b-form>

        <template v-slot:modal-footer="{ cancel }">
            <b-button @click="cancel()">
                {{ $saas.t('pages.team-user-team.forms.create.buttons.cancel') }}
            </b-button>
            <b-button form="form-team-invitation-team-create" type="submit" variant="primary" :disabled="form.isDisabled() || !validator.isValid()">
                <b-spinner small v-if="form.isDisabled()" class="mr-1"></b-spinner>
                {{ $saas.t('pages.team-user-team.forms.create.buttons.create') }}
            </b-button>
        </template>
    </b-modal>
</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator';
import Form from '../../../../../packages/form/basic/form';
import Validator from '../../../../../packages/validator/basic/validator';
import {BModal, BvModalEvent} from 'bootstrap-vue';
import ValidatorUtil from '../../../../../utils/validator';
import TeamInvitation from '../../../../selects/team/TeamInvitation.vue';
import TeamUser from '../../../../../models/team-user';
import TeamInvitationTeamCreate from '../../../../../structs/team-invitation-team-create';
import DomUtil from '../../../../../utils/dom';

@Component({
  components: {TeamInvitation},
})
export default class Create extends Vue {
  @Prop(Array) readonly teamUsers!: TeamUser[];

  private modalId: string = 'team-invitation-team-create';
  private teamInvitationTeamCreate: TeamInvitationTeamCreate = new TeamInvitationTeamCreate();
  private form: Form = new Form();
  private validator: Validator = new Validator([
    this.validateEmails,
  ]);

  public validateEmails(): boolean | null {
    if (this.teamInvitationTeamCreate.invitations === null || this.teamInvitationTeamCreate.invitations.length === 0) {
      return null;
    }

    if (this.teamInvitationTeamCreate.invitations.length > 5) {
      return false;
    }

    let index: { [key: string]: boolean } = {};
    for (let i = 0; i < this.teamUsers.length; i++) {
      index[this.teamUsers[i].user!.email!] = true;
    }

    for (let i = 0; i < this.teamInvitationTeamCreate.invitations.length; i++) {
      const invitation = this.teamInvitationTeamCreate.invitations[i];
      if (!ValidatorUtil.isValidEmail(invitation.email) || invitation.email in index) {
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
        this.teamInvitationTeamCreate = new TeamInvitationTeamCreate();
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

    this.$saas.getHttp().post('/api/auth/team/team-invitation', this.teamInvitationTeamCreate, {
      headers: {
        'Team': this.$saas.getSecurity().getTeam()!.id,
      },
    }).then((data) => {
      this.form.setResponse(this.$saas.getHttp().response(data));
      this.form.setDisabled(false);
      (this.$refs[this.modalId] as BModal).hide();
    }).catch((data) => {
      this.form.setResponse(this.$saas.getHttp().response(data.response));
      this.form.setError(true);
      this.form.setDisabled(false);
    });
  }
}
</script>
