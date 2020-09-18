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
                        <b-form @submit="onSubmit">
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
                                <b-form-input id="password" v-model="passwordUpdate.password" type="password" required :placeholder="$saas.t('pages.password.form.fields.password.placeholder')" autocomplete="off"></b-form-input>
                                <b-form-invalid-feedback :state="validatePassword()">
                                    {{ $saas.t('pages.password.form.validations.password') }}
                                </b-form-invalid-feedback>
                            </b-form-group>

                            <b-row>
                                <b-col sm="6">
                                    <b-form-group :label="$saas.t('pages.password.form.fields.newPassword.label')" label-for="newPassword">
                                        <b-form-input id="newPassword" v-model="passwordUpdate.newPassword" type="password" required :placeholder="$saas.t('pages.password.form.fields.newPassword.placeholder')" autocomplete="off"></b-form-input>
                                        <b-form-invalid-feedback :state="validateNewPassword()">
                                            {{ $saas.t('pages.password.form.validations.newPassword') }}
                                        </b-form-invalid-feedback>
                                    </b-form-group>
                                </b-col>

                                <b-col sm="6">
                                    <b-form-group :label="$saas.t('pages.password.form.fields.newPasswordConfirmation.label')" label-for="newPasswordConfirmation">
                                        <b-form-input id="newPasswordConfirmation" v-model="passwordUpdate.newPasswordConfirmation" type="password" required :placeholder="$saas.t('pages.password.form.fields.newPasswordConfirmation.placeholder')" autocomplete="off"></b-form-input>
                                        <b-form-invalid-feedback :state="validateNewPasswordConfirmation()">
                                            {{ $saas.t('pages.password.form.validations.newPasswordConfirmation') }}
                                        </b-form-invalid-feedback>
                                    </b-form-group>
                                </b-col>
                            </b-row>

                            <b-button type="submit" variant="primary" :disabled="form.isDisabled() || !validator.isValid()">
                                <b-spinner small v-if="form.isDisabled()" class="mr-1"></b-spinner>
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
import {Component, Vue} from 'vue-property-decorator';
import Form from '../../../packages/form/basic/form';
import Validator from '../../../packages/validator/basic/validator';
import DomUtil from '../../../utils/dom';
import PasswordUpdate from '../../../structs/password-update';

@Component
export default class Password extends Vue {
  private passwordUpdate: PasswordUpdate = new PasswordUpdate();
  private form: Form = new Form();
  private validator: Validator = new Validator([
    this.validatePassword,
    this.validateNewPassword,
    this.validateNewPasswordConfirmation,
  ]);

  public validatePassword(): boolean | null {
    if (this.passwordUpdate.password === null) {
      return null;
    }

    return this.passwordUpdate.password.length >= 6;
  }

  public validateNewPassword(): boolean | null {
    if (this.passwordUpdate.newPassword === null) {
      return null;
    }

    return this.passwordUpdate.newPassword.length >= 6;
  }

  public validateNewPasswordConfirmation(): boolean | null {
    if (this.passwordUpdate.newPasswordConfirmation === null) {
      return null;
    }

    return this.passwordUpdate.newPasswordConfirmation.length >= 6
        && this.passwordUpdate.newPassword === this.passwordUpdate.newPasswordConfirmation;
  }

  public onSubmit($event: Event) {
    $event.preventDefault();
    DomUtil.removeFocus();

    this.form.setError(false);
    this.form.setResponse(null);
    this.form.setDisabled(true);

    this.$saas.getHttp().patch('/api/auth/password', this.passwordUpdate).then((data) => {
      this.form.setResponse(this.$saas.getHttp().response(data));
      this.form.setDisabled(false);
      this.passwordUpdate = new PasswordUpdate();
    }).catch((data) => {
      this.form.setResponse(this.$saas.getHttp().response(data.response));
      this.form.setError(true);
      this.form.setDisabled(false);
    });
  }
}
</script>
