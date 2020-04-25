<template>
    <master>
        <template slot="page">
            <b-container>
                <b-row class="justify-content-md-center">
                    <b-col lg="6">
                        <b-card title="Login">
                            <b-form @submit="onSubmit">
                                <b-alert v-if="hasError && response" v-model="hasError" variant="danger" dismissible>
                                    <template v-if="response.getCode() >= 400 && response.getCode() < 500">
                                        Login failed.
                                    </template>

                                    <template v-if="response.getCode() >= 500">
                                        System error.
                                    </template>
                                </b-alert>

                                <b-form-group label="Email" label-for="email">
                                    <b-form-input id="email" v-model="user.email" type="email" required placeholder="Email"></b-form-input>
                                </b-form-group>

                                <b-form-group label="Password" label-for="password">
                                    <b-form-input v-model="user.password" type="password" required placeholder="Password"></b-form-input>
                                </b-form-group>

                                <b-button type="submit" variant="primary" :disabled="disabled">Login</b-button>
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
import ResponseInterface from './../../packages/http/response';

@Component({})
export default class Login extends Vue {
  private hasError: boolean = false;
  private disabled: boolean = false;
  private response: ResponseInterface | null = null;

  public get user(): User {
    return new User();
  }

  onSubmit($event: Event): void {
    $event.preventDefault();

    this.hasError = false;
    this.disabled = true;
    this.response = null;

    this.$saas.getHttp().post('/api/login', this.user).then((data) => {
      this.response = this.$saas.getHttp().response(data);
      this.disabled = false;
      Object.assign(this.user, new User());

      this.$saas.getSecurity().login(this.response);
    }).catch((data) => {
      this.response = this.$saas.getHttp().response(data.response);
      this.hasError = true;
      this.disabled = false;
      Object.assign(this.user, new User());

      this.$saas.getSecurity().logout(false);
    });
  }
}
</script>
