<template>
    <b-modal :id="modalId" no-fade :title="$saas.t('pages.member-team.forms.invite.title')">
        <b-form id="form-member-team-invite" v-if="teamInvite" @submit="onSubmit">
            <b-alert v-if="form.hasError() && form.getResponse()" variant="danger" dismissible :show="true">
                <template v-if="form.getResponse().getCode() >= 400 && form.getResponse().getCode() < 500">
                    {{ $saas.t('pages.member-team.forms.invite.errors.4x') }}
                </template>

                <template v-if="form.getResponse().getCode() >= 500">
                    {{ $saas.t('pages.member-team.forms.invite.errors.5x') }}
                </template>
            </b-alert>

            <b-form-group :label="$saas.t('pages.member-team.forms.invite.fields.email.label')" label-for="team-invitation">
                <team-invitation :obj="teamInvite"></team-invitation>
                <b-form-invalid-feedback :state="validateEmails()">
                    {{ $saas.t('pages.member-team.forms.invite.validations.invite') }}
                </b-form-invalid-feedback>
            </b-form-group>
        </b-form>

        <template v-slot:modal-footer="{ cancel }">
            <b-button @click="cancel()">
                {{ $saas.t('pages.member-team.forms.invite.buttons.cancel') }}
            </b-button>
            <b-button form="form-member-team-invite" type="submit" variant="primary" :disabled="form.isDisabled() || !validator.isValid()">
                <b-spinner small v-if="form.isDisabled()" class="mr-1"></b-spinner>
                {{ $saas.t('pages.member-team.forms.invite.buttons.invite') }}
            </b-button>
        </template>
    </b-modal>
</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator';
import Form from '../../../../packages/form/basic/form';
import Validator from '../../../../packages/validator/basic/validator';
import {BvModalEvent} from 'bootstrap-vue';
import TeamInvite from '../../../../structs/team-invite';
import ValidatorUtil from '../../../../utils/validator';
import TeamInvitation from '../../../selects/team/TeamInvitation.vue';
import User from '../../../../models/user';

@Component({
  components: {TeamInvitation},
})
export default class Invite extends Vue {
  @Prop(Array) readonly users!: User[];

  private modalId: string = 'member-team-invite';
  private teamInvite: TeamInvite = new TeamInvite();
  private form: Form = new Form();
  private validator: Validator = new Validator([
    this.validateEmails,
  ]);

  public validateEmails(): boolean | null {
    if (this.teamInvite.invitations === null || this.teamInvite.invitations.length === 0) {
      return null;
    }

    if (this.teamInvite.invitations.length > 5) {
      return false;
    }

    let index: { [key: string]: boolean } = {};
    for (let i = 0; i < this.users.length; i++) {
      index[this.users[i].email] = true;
    }

    for (let i = 0; i < this.teamInvite.invitations.length; i++) {
      const invitation = this.teamInvite.invitations[i];
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
        this.teamInvite = new TeamInvite();
        this.form = new Form();
      }
    });
  }

  public onSubmit($event: Event) {
  }
}
</script>
