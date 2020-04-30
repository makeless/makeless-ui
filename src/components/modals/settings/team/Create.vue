<template>
    <b-modal :id="modalId" no-fade :title="$saas.t('pages.team.forms.create.title')">
        <b-form id="form-team-create" v-if="$saas.getSecurity().isAuth() && this.userLoaded && team" @submit="onSubmit">
            <b-alert v-if="form.hasError() && form.getResponse()" variant="danger" dismissible :show="true">
                <template v-if="form.getResponse().getCode() >= 400 && form.getResponse().getCode() < 500">
                    {{ $saas.t('pages.team.forms.create.errors.4x') }}
                </template>

                <template v-if="form.getResponse().getCode() >= 500">
                    {{ $saas.t('pages.team.forms.create.errors.5x') }}
                </template>
            </b-alert>

            <b-form-group :label="$saas.t('pages.team.forms.create.fields.name.label')" label-for="name">
                <b-form-input id="name" type="text" v-model="team.name" required autocomplete="off" :placeholder="$saas.t('pages.team.forms.create.fields.name.placeholder')"></b-form-input>
                <b-form-invalid-feedback :state="validateName()">
                    {{ $saas.t('pages.team.forms.create.validations.name') }}
                </b-form-invalid-feedback>
            </b-form-group>
        </b-form>

        <template v-slot:modal-footer="{ cancel }">
            <b-button @click="cancel()">
                {{ $saas.t('pages.team.forms.create.buttons.cancel') }}
            </b-button>
            <b-button form="form-team-create" type="submit" variant="primary" :disabled="form.isDisabled() || !validator.isValid">
                {{ $saas.t('pages.team.forms.create.buttons.create') }}
            </b-button>
        </template>
    </b-modal>
</template>

<script lang="ts">
import {Component, Mixins} from 'vue-property-decorator';
import UserMixin from './../../../../mixins/User.vue';
import Form from '../../../../packages/form/basic/form';
import Validator from '../../../../packages/validator/basic/validator';
import Team from '../../../../models/team';
import {BvModalEvent} from 'bootstrap-vue';

@Component
export default class Create extends Mixins(UserMixin) {
  private modalId: string = 'team-create';
  private team: Team = new Team();
  private form: Form = new Form();
  private validator: Validator = new Validator([
    this.validateName,
  ]);

  public validateName(): boolean | null {
    if (this.team.name === null) {
      return null;
    }

    return this.team.name.length >= 4;
  }

  created() {
    this.onModalHide();
  }

  public onModalHide(): void {
    this.$root.$on('bv::modal::hide', (bvEvent: BvModalEvent, modalId: string) => {
      if (this.modalId === modalId) {
        this.team.name = null;
      }
    });
  }

  public onSubmit($event: Event) {
    $event.preventDefault();
    this.form.setError(false);
    this.form.setDisabled(true);
    this.form.setResponse(null);

    this.$saas.getHttp().post('/api/auth/team', this.team).then((data) => {
      this.form.setResponse(this.$saas.getHttp().response(data));
      this.form.setDisabled(false);
      Object.assign(this.team, {
        id: this.form.getResponse()!.getData().data.id,
        createdAt: this.form.getResponse()!.getData().data.createdAt,
        updatedAt: this.form.getResponse()!.getData().data.updatedAt,
        name: this.form.getResponse()!.getData().data.name,
        userId: this.form.getResponse()!.getData().data.userId,
      });
      this.$saas.getSecurity().addTeam(this.team);
      this.$saas.getSecurity().switchToTeam(this.team.id!);
    }).catch((data) => {
      this.form.setResponse(this.$saas.getHttp().response(data.response));
      this.form.setError(true);
      this.form.setDisabled(false);
    });
  }
}
</script>
