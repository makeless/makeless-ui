<template>
    <b-modal id="create" no-fade :title="$saas.t('pages.teams.forms.create.title')">
        <b-form v-if="$saas.getSecurity().isAuth() && this.userLoaded && team" @submit="onSubmit">
            <b-alert v-if="form.hasError() && form.getResponse()" variant="danger" dismissible :show="true">
                <template v-if="form.getResponse().getCode() >= 400 && form.getResponse().getCode() < 500">
                    {{ $saas.t('pages.teams.forms.create.errors.4x') }}
                </template>

                <template v-if="form.getResponse().getCode() >= 500">
                    {{ $saas.t('pages.teams.forms.create.errors.5x') }}
                </template>
            </b-alert>

            <b-form-group :label="$saas.t('pages.teams.forms.create.fields.name.label')" label-for="name">
                <b-form-input id="name" type="text" v-model="team.name" required :placeholder="$saas.t('pages.teams.forms.create.fields.name.placeholder')"></b-form-input>
                <b-form-invalid-feedback :state="validateName()">
                    {{ $saas.t('pages.teams.forms.create.validations.name') }}
                </b-form-invalid-feedback>
            </b-form-group>
        </b-form>
    </b-modal>
</template>

<script lang="ts">
import {Component, Mixins} from 'vue-property-decorator';
import UserMixin from './../../../../mixins/User.vue';
import Form from '../../../../packages/form/basic/form';
import Validator from '../../../../packages/validator/basic/validator';
import Team from '../../../../models/team';

@Component
export default class Create extends Mixins(UserMixin) {
  private team: Team = new Team();
  private form: Form = new Form();
  private validator: Validator = new Validator([
    this.validateName,
  ]);

  public validateName(): boolean | null {
    if (this.team.name === null) {
      return null;
    }

    return this.team.name.length > 0;
  }

  public onSubmit($event: Event) {
    $event.preventDefault();
    this.form.setError(false);
    this.form.setDisabled(true);
    this.form.setResponse(null);

    this.$saas.getHttp().patch('/api/auth/team/create', this.team).then((data) => {
      this.form.setResponse(this.$saas.getHttp().response(data));
      this.form.setDisabled(false);
      Object.assign(this.team, {
        name: this.form.getResponse()!.getData().data.name,
        updatedAt: this.form.getResponse()!.getData().data.updatedAt,
      });
    }).catch((data) => {
      this.form.setResponse(this.$saas.getHttp().response(data.response));
      this.form.setError(true);
      this.form.setDisabled(false);
    });
  }
}
</script>
