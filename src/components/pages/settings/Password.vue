<template>
    <master>
        <template slot="page">
            <b-container>
                <b-row>
                    <b-col lg="3">
                        <settings-navigation></settings-navigation>
                    </b-col>

                    <b-col lg="9">
                        <h1>{{ $saas.t('pages.password.title') }}</h1>
                        <hr>
                        <b-form v-if="$saas.getSecurity().isAuth() && this.userLoaded" @submit="onSubmit">
                            <b-alert v-if="form.hasError() && form.getResponse()" variant="danger" dismissible :show="true">
                                <template v-if="form.getResponse().getCode() >= 400 && form.getResponse().getCode() < 500">
                                    {{ $saas.t('pages.password.form.errors.4x') }}
                                </template>

                                <template v-if="form.getResponse().getCode() >= 500">
                                    {{ $saas.t('pages.password.form.errors.5x') }}
                                </template>
                            </b-alert>

                            <b-alert v-if="form.getResponse() && form.getResponse().getCode() === 200" variant="success" dismissible :show="true">
                                {{ $saas.t('pages.password.form.errors.2x') }}
                            </b-alert>

                            <b-form-group :label="$saas.t('pages.password.form.fields.password.label')" label-for="password">
                                <b-form-input id="password" v-model="passwordReset.password" type="password" required :placeholder="$saas.t('pages.password.form.fields.password.placeholder')"></b-form-input>
                                <b-form-invalid-feedback :state="validatePassword()">
                                    {{ $saas.t('pages.password.form.validations.password') }}
                                </b-form-invalid-feedback>
                            </b-form-group>

                            <b-row>
                                <b-col sm="6">
                                    <b-form-group :label="$saas.t('pages.password.form.fields.newPassword.label')" label-for="newPassword">
                                        <b-form-input id="newPassword" v-model="passwordReset.newPassword" type="password" required :placeholder="$saas.t('pages.password.form.fields.newPassword.placeholder')"></b-form-input>
                                        <b-form-invalid-feedback :state="validateNewPassword()">
                                            {{ $saas.t('pages.password.form.validations.newPassword') }}
                                        </b-form-invalid-feedback>
                                    </b-form-group>
                                </b-col>

                                <b-col sm="6">
                                    <b-form-group :label="$saas.t('pages.password.form.fields.newPasswordConfirmation.label')" label-for="newPasswordConfirmation">
                                        <b-form-input id="newPasswordConfirmation" v-model="passwordReset.newPasswordConfirmation" type="password" required :placeholder="$saas.t('pages.password.form.fields.newPasswordConfirmation.placeholder')"></b-form-input>
                                        <b-form-invalid-feedback :state="validateNewPasswordConfirmation()">
                                            {{ $saas.t('pages.password.form.validations.newPasswordConfirmation') }}
                                        </b-form-invalid-feedback>
                                    </b-form-group>
                                </b-col>
                            </b-row>

                            <b-button type="submit" variant="primary" :disabled="form.isDisabled() || !validator.isValid">
                                {{ $saas.t('pages.password.form.button') }}
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
import UserMixin from './../../../mixins/User.vue';
import Form from '../../../packages/form/basic/form';
import Validator from '../../../packages/validator/basic/validator';
import PasswordReset from '../../../models/password-reset';

@Component
export default class Password extends Mixins(UserMixin) {
  private passwordReset: PasswordReset = new PasswordReset();
  private form: Form = new Form();
  private validator: Validator = new Validator([
    this.validatePassword,
    this.validateNewPassword,
  ]);

  public validatePassword(): boolean | null {
    if (this.passwordReset.password === null) {
      return null;
    }

    return this.passwordReset.password.length >= 3;
  }

  public validateNewPassword(): boolean | null {
    if (this.passwordReset.newPassword === null) {
      return null;
    }

    return this.passwordReset.newPassword.length >= 3;
  }

  public validateNewPasswordConfirmation(): boolean | null {
    if (this.passwordReset.newPasswordConfirmation === null) {
      return null;
    }

    return this.passwordReset.newPasswordConfirmation.length >= 3
        && this.passwordReset.newPassword === this.passwordReset.newPasswordConfirmation;
  }

  public onSubmit($event: Event) {
    $event.preventDefault();
    this.form.setError(false);
    this.form.setResponse(null);
    this.form.setDisabled(true);

    this.$saas.getHttp().patch('/api/auth/password', this.passwordReset).then((data) => {
      this.form.setResponse(this.$saas.getHttp().response(data));
      this.form.setDisabled(false);
      this.passwordReset = new PasswordReset();
    }).catch((data) => {
      this.form.setResponse(this.$saas.getHttp().response(data.response));
      this.form.setError(true);
      this.form.setDisabled(false);
    });
  }
}
</script>
