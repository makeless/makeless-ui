<template>
    <b-modal :id="modalId" :ref="modalId" no-fade :title="$saas.t('pages.team-user-team.forms.delete.title')">
        <b-form v-if="teamUser" id="form-team-user-team-delete" @submit="onSubmit">
            <b-alert v-if="form.hasError() && form.getResponse()" variant="danger" dismissible :show="true">
                <template v-if="form.getResponse().getCode() >= 400 && form.getResponse().getCode() < 500">
                    {{ $saas.t('pages.team-user-team.forms.delete.errors.4x') }}
                </template>

                <template v-if="form.getResponse().getCode() >= 500">
                    {{ $saas.t('pages.team-user-team.forms.delete.errors.5x') }}
                </template>
            </b-alert>

            <b-form-group :label="$saas.t('pages.team-user-team.forms.delete.fields.name.label', {name: this.teamUser.user.name})" label-for="name">
                <b-form-input id="name" type="text" v-model="name" autocomplete="off" required :placeholder="$saas.t('pages.team-user-team.forms.delete.fields.name.placeholder')"></b-form-input>
                <b-form-invalid-feedback :state="validateName()">
                    {{ $saas.t('pages.team-user-team.forms.delete.validations.name') }}
                </b-form-invalid-feedback>
            </b-form-group>
        </b-form>

        <template v-slot:modal-footer="{ cancel }">
            <b-button @click="cancel()">
                {{ $saas.t('pages.team-user-team.forms.delete.buttons.cancel') }}
            </b-button>
            <b-button form="form-user-team-delete" type="submit" variant="danger" :disabled="form.isDisabled() || !validator.isValid()">
                <b-spinner small v-if="form.isDisabled()" class="mr-1"></b-spinner>
                {{ $saas.t('pages.team-user-team.forms.delete.buttons.delete') }}
            </b-button>
        </template>
    </b-modal>
</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator';
import Form from '../../../../../packages/form/basic/form';
import Validator from '../../../../../packages/validator/basic/validator';
import {BModal, BvModalEvent} from 'bootstrap-vue';
import TeamUser from '../../../../../models/team-user';
import DomUtil from '../../../../../utils/dom';
import TeamUserTeamDelete from '../../../../../structs/team-user-team-delete';

@Component
export default class Delete extends Vue {
  @Prop(Object) readonly teamUser!: TeamUser;
  @Prop(Array) readonly teamUsers!: TeamUser[];

  private modalId: string = 'team-user-team-delete';
  private name: string | null = null;
  private form: Form = new Form();
  private validator: Validator = new Validator([
    this.validateName,
  ]);

  public validateName(): boolean | null {
    if (this.name === null) {
      return null;
    }

    return this.teamUser.user!.name === this.name;
  }

  created() {
    this.onModalHide();
  }

  public onModalHide(): void {
    this.$root.$on('bv::modal::hide', (bvEvent: BvModalEvent, modalId: string) => {
      if (this.modalId === modalId) {
        this.name = null;
        this.form = new Form();
      }
    });
  }

  public removeUser(teamUser: TeamUser): void {
    for (let i = 0; i < this.teamUsers.length; i++) {
      if (this.teamUsers[i].id !== teamUser.id) {
        continue;
      }

      this.teamUsers.splice(i, 1);
      return;
    }
  }

  public onSubmit($event: Event) {
    $event.preventDefault();
    DomUtil.removeFocus();

    this.form.setError(false);
    this.form.setDisabled(true);
    this.form.setResponse(null);

    const teamUserTeamDelete: TeamUserTeamDelete = Object.assign(new TeamUserTeamDelete(), {
      id: this.teamUser.id,
    });

    this.$saas.getHttp().delete('/api/auth/team/team-user', {
      data: teamUserTeamDelete,
      headers: {
        'Team': this.$saas.getSecurity().getTeam()!.id,
      },
    }).then((data) => {
      this.form.setResponse(this.$saas.getHttp().response(data));
      this.form.setDisabled(false);
      this.removeUser(this.teamUser);
      (this.$refs[this.modalId] as BModal).hide();
    }).catch((data) => {
      this.form.setResponse(this.$saas.getHttp().response(data.response));
      this.form.setError(true);
      this.form.setDisabled(false);
    });
  }
}
</script>
