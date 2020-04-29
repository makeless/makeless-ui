<template>
    <master>
        <template slot="page">
            <b-container>
                <b-row class="justify-content-md-center">
                    <b-col lg="6">
                        <b-card :title="$saas.t('pages.login.title')">
                            <b-form @submit="onSubmit">
                                <b-alert v-if="form.hasError() && form.getResponse()" v-model="form.hasError" variant="danger" dismissible>
                                    <template v-if="form.getResponse().getCode() >= 400 && form.getResponse().getCode() < 500">
                                        {{ $saas.t('pages.login.form.errors.4x') }}
                                    </template>

                                    <template v-if="form.getResponse().getCode() >= 500">
                                        {{ $saas.t('pages.login.form.errors.5x') }}
                                    </template>
                                </b-alert>

                                <b-form-group :label="$saas.t('pages.login.form.fields.email.label')" label-for="email">
                                    <b-form-input id="email" v-model="user.email" type="email" required :placeholder="$saas.t('pages.login.form.fields.email.placeholder')"></b-form-input>
                                    <b-form-invalid-feedback :state="validateEmail()">
                                        {{ $saas.t('pages.login.form.validations.email') }}
                                    </b-form-invalid-feedback>
                                </b-form-group>

                                <b-form-group :label="$saas.t('pages.login.form.fields.password.label')" label-for="password">
                                    <b-form-input v-model="user.password" type="password" required :placeholder="$saas.t('pages.login.form.fields.password.placeholder')" autocomplete="false"></b-form-input>
                                    <b-form-invalid-feedback :state="validatePassword()">
                                        {{ $saas.t('pages.login.form.validations.password') }}
                                    </b-form-invalid-feedback>
                                </b-form-group>

                                <b-button type="submit" variant="primary" :disabled="form.isDisabled() || !validator.isValid">
                                    {{ $saas.t('pages.login.form.button') }}
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
import User from './../../models/user';
import Form from '../../packages/form/basic/form';
import Validator from '../../packages/validator/basic/validator';

@Component
export default class Login extends Vue {
  private user: User = new User();
  private form: Form = new Form();
  private validator: Validator = new Validator([
    this.validateEmail,
    this.validatePassword,
  ]);

  public validateEmail(): boolean | null {
    if (this.user.email === null) {
      return null;
    }

    return this.user.email.length > 0;
  }

  public validatePassword(): boolean | null {
    if (this.user.password === null) {
      return null;
    }

    return this.user.password.length >= 3;
  }

  onSubmit($event: Event): void {
    $event.preventDefault();

    this.form.setError(false);
    this.form.setDisabled(true);
    this.form.setResponse(null);

    this.$saas.getHttp().post('/api/login', this.user).then((data) => {
      this.form.setResponse(this.$saas.getHttp().response(data));
      this.form.setDisabled(false);
      Object.assign(this.user, new User());

      this.$saas.getSecurity().login(this.form.getResponse());
    }).catch((data) => {
      this.form.setResponse(this.$saas.getHttp().response(data.response));
      this.form.setError(true);
      this.form.setDisabled(false);
      Object.assign(this.user, new User());

      this.$saas.getSecurity().logout(false);
    });
  }
}
</script>
