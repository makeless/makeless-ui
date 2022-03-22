<template>
    <master>
        <template slot="page">
            <b-container>
                <b-row class="justify-content-md-center">
                    <b-col lg="6">
                        <b-card :title="$makeless.t('pages.login.title')">
                            <b-form @submit="onSubmit">
                                <b-alert v-if="form.hasError() && form.getResponse()" variant="danger" dismissible :show="true">
                                    <template v-if="form.getResponse().getCode() >= 400 && form.getResponse().getCode() < 500">
                                        {{ $makeless.t('pages.login.form.errors.4x') }}
                                    </template>

                                    <template v-if="form.getResponse().getCode() >= 500">
                                        {{ $makeless.t('pages.login.form.errors.5x') }}
                                    </template>
                                </b-alert>

                                <b-form-group :label="$makeless.t('pages.login.form.fields.email.label')" label-for="email">
                                    <b-form-input id="email" v-model="login.email" type="email" required :placeholder="$makeless.t('pages.login.form.fields.email.placeholder')"></b-form-input>
                                    <b-form-invalid-feedback :state="validateEmail()">
                                        {{ $makeless.t('pages.login.form.validations.email') }}
                                    </b-form-invalid-feedback>
                                </b-form-group>

                                <b-form-group>
                                    <b-row>
                                        <b-col cols="6">
                                            <label for="password">{{ $makeless.t('pages.login.form.fields.password.label') }}</label>
                                        </b-col>
                                        <b-col cols="6" class="d-none d-lg-inline-block text-right">
                                            <b-link :to="{name: 'password-request'}">{{ $makeless.t('pages.login.passwordRequest') }}</b-link>
                                        </b-col>
                                    </b-row>
                                    <b-form-input id="password" v-model="login.password" type="password" required :placeholder="$makeless.t('pages.login.form.fields.password.placeholder')" autocomplete="false"></b-form-input>
                                    <b-form-invalid-feedback :state="validatePassword()">
                                        {{ $makeless.t('pages.login.form.validations.password') }}
                                    </b-form-invalid-feedback>
                                </b-form-group>

                                <b-button type="submit" variant="primary" :disabled="form.isDisabled() || !validator.isValid()">
                                    <b-spinner small v-if="form.isDisabled()" class="mr-1"></b-spinner>
                                    {{ $makeless.t('pages.login.form.button') }}
                                </b-button>

                                <b-button variant="link" :to="{name: 'password-request'}" class="ml-1 d-lg-none">
                                    {{ $makeless.t('pages.login.passwordRequest') }}
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
import LoginModel from '../../structs/login';
import Form from '../../packages/form/basic/form';
import Validator from '../../packages/validator/basic/validator';
import DomUtil from '../../utils/dom';

@Component({
  name: 'Login',
})
export default class Login extends Vue {
  private login: LoginModel = new LoginModel();
  private form: Form = new Form();
  private validator: Validator = new Validator([
    this.validateEmail,
    this.validatePassword,
  ]);

  public validateEmail(): boolean | null {
    if (this.login.email === null) {
      return null;
    }

    return this.login.email.length > 0;
  }

  public validatePassword(): boolean | null {
    if (this.login.password === null) {
      return null;
    }

    return this.login.password.length >= 6;
  }

  onSubmit($event: Event): void {
    $event.preventDefault();
    DomUtil.removeFocus();

    this.form.setError(false);
    this.form.setDisabled(true);
    this.form.setResponse(null);

    this.$makeless.getHttp().post('/api/login', this.login).then((data) => {
      this.form.setResponse(this.$makeless.getHttp().response(data));
      this.form.setDisabled(false);
      this.login = new LoginModel();

      this.$makeless.getSecurity().login(this.form.getResponse()!);
    }).catch((data) => {
      this.form.setResponse(this.$makeless.getHttp().response(data.response));
      this.form.setError(true);
      this.form.setDisabled(false);
      this.login.password = null;

      this.$makeless.getSecurity().logout(false);
    });
  }
}
</script>
