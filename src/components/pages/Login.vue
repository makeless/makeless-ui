<template>
    <master>
        <template slot="page">
            <b-container>
                <b-row class="justify-content-md-center">
                    <b-col lg="6">
                        <b-card title="Login">
                            <b-form @submit="onSubmit">
                                <b-alert v-if="form.hasError() && form.getResponse()" v-model="form.hasError" variant="danger" dismissible>
                                    <template v-if="form.getResponse().getCode() >= 400 && form.getResponse().getCode() < 500">
                                        Login failed.
                                    </template>

                                    <template v-if="form.getResponse().getCode() >= 500">
                                        System error.
                                    </template>
                                </b-alert>

                                <b-form-group label="Email" label-for="email">
                                    <b-form-input id="email" v-model="user.email" type="email" required placeholder="Email"></b-form-input>
                                    <b-form-invalid-feedback :state="validateEmail()">
                                        Email must be present.
                                    </b-form-invalid-feedback>
                                </b-form-group>

                                <b-form-group label="Password" label-for="password">
                                    <b-form-input v-model="user.password" type="password" required placeholder="Password" autocomplete="false"></b-form-input>
                                    <b-form-invalid-feedback :state="validatePassword()">
                                        Password must be minimum 6 characters long.
                                    </b-form-invalid-feedback>
                                </b-form-group>

                                <b-button type="submit" variant="primary" :disabled="form.isDisabled() || !validator.isValid">Login</b-button>
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

@Component({})
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
