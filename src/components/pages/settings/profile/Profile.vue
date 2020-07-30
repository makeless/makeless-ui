<template>
    <master>
        <template slot="page">
            <b-container>
                <b-row>
                    <b-col lg="3">
                        <settings-navigation></settings-navigation>
                    </b-col>

                    <b-col lg="9">
                        <h1>{{ $saas.t('pages.profile.title') }}</h1>
                        <hr>
                        <b-form v-if="this.userLoaded && profile" @submit="onSubmit">
                            <b-alert v-if="form.hasError() && form.getResponse()" variant="danger" dismissible :show="true">
                                <template v-if="form.getResponse().getCode() >= 400 && form.getResponse().getCode() < 500">
                                    {{ $saas.t('pages.profile.form.errors.4x') }}
                                </template>

                                <template v-if="form.getResponse().getCode() >= 500">
                                    {{ $saas.t('pages.profile.form.errors.5x') }}
                                </template>
                            </b-alert>

                            <b-alert v-if="form.getResponse() && form.getResponse().getCode() === 200" variant="success" dismissible :show="true">
                                {{ $saas.t('pages.profile.form.errors.2x') }}
                            </b-alert>

                            <b-form-group :label="$saas.t('pages.profile.form.fields.name.label')" label-for="name">
                                <b-form-input id="name" v-model="profile.name" type="text" required :placeholder="$saas.t('pages.profile.form.fields.name.placeholder')"></b-form-input>
                                <b-form-invalid-feedback :state="validateName()">
                                    {{ $saas.t('pages.profile.form.validations.name') }}
                                </b-form-invalid-feedback>
                            </b-form-group>

                            <b-button type="submit" variant="primary" :disabled="form.isDisabled() || !validator.isValid">
                                {{ $saas.t('pages.profile.form.button') }}
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
import UserMixin from './../../../../mixins/User.vue';
import ProfileStruct from '../../../../structs/profile';
import UtilObject from './../../../../utils/object';
import Form from '../../../../packages/form/basic/form';
import Validator from '../../../../packages/validator/basic/validator';

@Component
export default class Profile extends Mixins(UserMixin) {
  private profile: ProfileStruct | null = UtilObject.clone(this.$saas.getSecurity().getUser());
  private form: Form = new Form();
  private validator: Validator = new Validator([
    this.validateName,
  ]);

  public onUserLoaded(): void {
    this.profile = UtilObject.clone(this.$saas.getSecurity().getUser());
  }

  public validateName(): boolean | null {
    if (this.profile === null || this.profile.name === null) {
      return null;
    }

    return this.profile.name.length >= 4 && this.profile.name.length <= 50;
  }

  public onSubmit($event: Event) {
    $event.preventDefault();
    this.form.setError(false);
    this.form.setResponse(null);
    this.form.setDisabled(true);

    this.$saas.getHttp().patch('/api/auth/profile', this.profile).then((data) => {
      this.form.setResponse(this.$saas.getHttp().response(data));
      this.form.setDisabled(false);
      Object.assign(this.$saas.getSecurity().getUser(), {
        name: this.form.getResponse()!.getData().data.name,
      });
    }).catch((data) => {
      this.form.setResponse(this.$saas.getHttp().response(data.response));
      this.form.setError(true);
      this.form.setDisabled(false);
    });
  }
}
</script>
