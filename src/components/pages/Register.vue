<template>
    <master>
        <template slot="page">
            <b-container>
                <b-row class="justify-content-md-center">
                    <b-col lg="6">
                        <b-card :title="$makeless.t('pages.register.title')">
                            <b-form @submit="onSubmit">
                                <b-alert v-if="form.hasError() && form.getResponse()" variant="danger" dismissible :show="true">
                                    <template v-if="form.getResponse().getCode() >= 400 && form.getResponse().getCode() < 500">
                                        {{ $makeless.t('pages.register.form.errors.4x') }}
                                    </template>

                                    <template v-if="form.getResponse().getCode() >= 500">
                                        {{ $makeless.t('pages.register.form.errors.5x') }}
                                    </template>
                                </b-alert>

                                <b-alert v-if="form.getResponse() && form.getResponse().getCode() === 200" variant="success" dismissible :show="true">
                                    {{ $makeless.t('pages.register.form.errors.2x') }}
                                    -
                                    <b-link :to="{name: 'login'}">{{ $makeless.t('pages.register.login') }}</b-link>
                                </b-alert>

                                <b-form-group :label="$makeless.t('pages.register.form.fields.name.label')" label-for="name">
                                    <b-form-input id="name" v-model="register.name" type="text" required :placeholder="$makeless.t('pages.register.form.fields.name.placeholder')"></b-form-input>
                                    <b-form-invalid-feedback :state="validateName()">
                                        {{ $makeless.t('pages.register.form.validations.name') }}
                                    </b-form-invalid-feedback>
                                </b-form-group>

                                <b-form-group :label="$makeless.t('pages.register.form.fields.email.label')" label-for="email">
                                    <b-form-input id="email" v-model="register.email" type="email" required :placeholder="$makeless.t('pages.register.form.fields.email.placeholder')"></b-form-input>
                                    <b-form-invalid-feedback :state="validateEmail()">
                                        {{ $makeless.t('pages.register.form.validations.email') }}
                                    </b-form-invalid-feedback>
                                </b-form-group>

                                <b-form-group :label="$makeless.t('pages.register.form.fields.password.label')" label-for="password">
                                    <b-form-input id="password" v-model="register.password" type="password" required :placeholder="$makeless.t('pages.register.form.fields.password.placeholder')"></b-form-input>
                                    <b-form-invalid-feedback :state="validatePassword()">
                                        {{ $makeless.t('pages.register.form.validations.password') }}
                                    </b-form-invalid-feedback>
                                </b-form-group>

                                <b-form-group :label="$makeless.t('pages.register.form.fields.passwordConfirmation.label')" label-for="passwordConfirmation">
                                    <b-form-input id="passwordConfirmation" v-model="register.passwordConfirmation" type="password" required :placeholder="$makeless.t('pages.register.form.fields.passwordConfirmation.placeholder')"></b-form-input>
                                    <b-form-invalid-feedback :state="validatePasswordConfirmation()">
                                        {{ $makeless.t('pages.register.form.validations.passwordConfirmation') }}
                                    </b-form-invalid-feedback>
                                </b-form-group>

                                <b-form-group>
                                    <b-form-checkbox size="sm" id="legalConfirmation" v-model="register.legalConfirmation" required>
                                        {{ $makeless.t('pages.register.form.fields.legalConfirmation.accept') }}
                                        <b-link :to="{name: 'terms'}">{{ $makeless.t('pages.register.form.fields.legalConfirmation.termsOfService') }}</b-link>
                                        {{ $makeless.t('pages.register.form.fields.legalConfirmation.and') }}
                                        <b-link :to="{name: 'privacy'}">{{ $makeless.t('pages.register.form.fields.legalConfirmation.privacyPolicy') }}</b-link>
                                    </b-form-checkbox>
                                    <b-form-invalid-feedback :state="validateLegalConfirmation()">
                                        {{ $makeless.t('pages.register.form.validations.legalConfirmation') }}
                                    </b-form-invalid-feedback>
                                </b-form-group>

                                <b-button type="submit" variant="primary" :disabled="form.isDisabled() || !validator.isValid()">
                                    <b-spinner small v-if="form.isDisabled()" class="mr-1"></b-spinner>
                                    {{ $makeless.t('pages.register.form.button') }}
                                </b-button>

                                <b-button variant="link" :to="{name: 'login'}" class="ml-1">
                                    {{ $makeless.t('pages.register.login') }}
                                </b-button>
                            </b-form>
                        </b-card>
                    </b-col>
                </b-row>
            </b-container>
        </template>
    </master>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import Form from '../../packages/form/basic/form';
import Validator from '../../packages/validator/basic/validator';
import DomUtil from '../../utils/dom';
import ValidatorUtil from '../../utils/validator';
import RegisterModel from '../../structs/register';

@Component({
  name: 'Register',
})
export default class Register extends Vue {
  private register: RegisterModel = new RegisterModel();
  private form: Form = new Form();
  private validator: Validator = new Validator([
    this.validateName,
    this.validateEmail,
    this.validatePassword,
    this.validatePasswordConfirmation,
    this.validateLegalConfirmation,
  ]);

  public validateEmail(): boolean | null {
    if (this.register.email === null) {
      return null;
    }

    return ValidatorUtil.isValidEmail(this.register.email);
  }

  public validateName(): boolean | null {
    if (this.register.name === null) {
      return null;
    }

    return this.register.name.length >= 4 && this.register.name.length <= 50;
  }

  public validatePassword(): boolean | null {
    if (this.register.password === null) {
      return null;
    }

    return this.register.password.length >= 6;
  }

  public validatePasswordConfirmation(): boolean | null {
    if (this.register.passwordConfirmation === null) {
      return null;
    }

    return this.register.passwordConfirmation.length >= 6 && this.register.password === this.register.passwordConfirmation;
  }

  public validateLegalConfirmation(): boolean | null {
    return this.register.legalConfirmation;
  }

  onSubmit($event: Event): void {
    $event.preventDefault();
    DomUtil.removeFocus();

    this.form.setError(false);
    this.form.setDisabled(true);
    this.form.setResponse(null);

    this.$makeless.getHttp().post('/api/register', this.register).then((data) => {
      this.form.setResponse(this.$makeless.getHttp().response(data));
      this.form.setDisabled(false);
      this.register = new RegisterModel();
    }).catch((data) => {
      this.form.setResponse(this.$makeless.getHttp().response(data.response));
      this.form.setError(true);
      this.form.setDisabled(false);
      this.register = new RegisterModel();
    });
  }
}
</script>
