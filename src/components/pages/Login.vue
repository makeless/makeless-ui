<template>
    <master>
        <template slot="page">
            <b-container>
                <b-row class="justify-content-md-center">
                    <b-col lg="6">
                        <b-card title="Login">
                            <b-form @submit="onSubmit">
                                <b-alert v-if="form.error && form.response" v-model="form.error" variant="danger" dismissible>
                                    <template v-if="form.response.getCode() >= 400 && form.response.getCode() < 500">
                                        Login failed.
                                    </template>

                                    <template v-if="form.response.getCode() >= 500">
                                        System error.
                                    </template>
                                </b-alert>

                                <b-form-group label="Email" label-for="email">
                                    <b-form-input id="email" v-model="user.email" type="email" required placeholder="Email"></b-form-input>
                                </b-form-group>

                                <b-form-group label="Password" label-for="password">
                                    <b-form-input v-model="user.password" :state="validatePassword" type="password" required placeholder="Password" autocomplete="false"></b-form-input>
                                    <b-form-invalid-feedback :state="validatePassword">
                                        Your user password must be minimum 6 characters long.
                                    </b-form-invalid-feedback>
                                </b-form-group>

                                <b-button type="submit" variant="primary" :disabled="form.disabled">Login</b-button>
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
  private form: Form = new Form(new Validator());

  public get validatePassword(): boolean | null {
    if (this.user.password === null) {
      return null;
    }

    return this.user.password.length >= 3;
  }

  onSubmit($event: Event): void {
    $event.preventDefault();

    this.form.error = false;
    this.form.disabled = true;
    this.form.response = null;

    this.$saas.getHttp().post('/api/login', this.user).then((data) => {
      this.form.response = this.$saas.getHttp().response(data);
      this.form.disabled = false;
      Object.assign(this.user, new User());

      this.$saas.getSecurity().login(this.form.response);
    }).catch((data) => {
      this.form.response = this.$saas.getHttp().response(data.response);
      this.form.error = true;
      this.form.disabled = false;
      Object.assign(this.user, new User());

      this.$saas.getSecurity().logout(false);
    });
  }
}
</script>
