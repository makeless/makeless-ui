<template>
    <master>
        <template slot="page">
            <b-container>
                <b-row>
                    <b-col lg="3">
                        <settings-navigation></settings-navigation>
                    </b-col>

                    <b-col lg="9">
                        <h1>{{ $saas.t('pages.profile-team.title') }}</h1>
                        <hr>
                        <b-form v-if="$saas.getSecurity().isAuth() && this.userLoaded && team" @submit="onSubmit">
                            <b-alert v-if="form.hasError() && form.getResponse()" variant="danger" dismissible :show="true">
                                <template v-if="form.getResponse().getCode() >= 400 && form.getResponse().getCode() < 500">
                                    {{ $saas.t('pages.profile-team.form.errors.4x') }}
                                </template>

                                <template v-if="form.getResponse().getCode() >= 500">
                                    {{ $saas.t('pages.profile-team.form.errors.5x') }}
                                </template>
                            </b-alert>

                            <b-alert v-if="form.getResponse() && form.getResponse().getCode() === 200" variant="success" dismissible :show="true">
                                {{ $saas.t('pages.profile-team.form.errors.2x') }}
                            </b-alert>

                            <b-form-group :label="$saas.t('pages.profile-team.form.fields.name.label')" label-for="name">
                                <b-form-input id="name" v-model="team.name" type="text" required :placeholder="$saas.t('pages.profile-team.form.fields.name.placeholder')"></b-form-input>
                                <b-form-invalid-feedback :state="validateName()">
                                    {{ $saas.t('pages.profile-team.form.validations.name') }}
                                </b-form-invalid-feedback>
                            </b-form-group>

                            <b-button type="submit" variant="primary" :disabled="form.isDisabled() || !validator.isValid">
                                {{ $saas.t('pages.profile-team.form.button') }}
                            </b-button>
                        </b-form>
                    </b-col>
                </b-row>
            </b-container>
        </template>
    </master>
</template>

<script lang="ts">
import {Component, Mixins} from 'vue-property-decorator';
import SettingsNavigation from './../../../../components/navigations/SettingsNavigation.vue';
import UserMixin from './../../../../mixins/User.vue';
import Team from './../../../../models/team';
import UtilObject from '../../../../utils/object';
import Form from '../../../../packages/form/basic/form';
import Validator from '../../../../packages/validator/basic/validator';

@Component({
  components: {
    SettingsNavigation,
  },
})
export default class ProfileTeam extends Mixins(UserMixin) {
  private team: Team | null = UtilObject.clone(this.$saas.getSecurity().getTeam());
  private form: Form = new Form();
  private validator: Validator = new Validator([
    this.validateName,
  ]);

  public onUserLoaded(): void {
    this.team = UtilObject.clone(this.$saas.getSecurity().getTeam());
  }

  public validateName(): boolean | null {
    if (this.team === null || this.team.name === null) {
      return null;
    }

    return this.team.name.length > 0;
  }

  public onSubmit($event: Event) {
    $event.preventDefault();
    this.form.setError(false);
    this.form.setResponse(null);
    this.form.setDisabled(true);

    this.$saas.getHttp().patch('/api/auth/team/profile', this.team, {
      headers: {
        'Team': this.team!.id,
      },
    }).then((data) => {
      this.form.setResponse(this.$saas.getHttp().response(data));
      this.form.setDisabled(false);
      Object.assign(this.$saas.getSecurity().getTeam(), {
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
