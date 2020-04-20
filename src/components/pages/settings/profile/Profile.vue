<template>
    <master>
        <template slot="page">
            <b-container>
                <b-row>
                    <b-col lg="3">
                        <settings-navigation></settings-navigation>
                    </b-col>

                    <b-col lg="9">
                        <h1>Profile</h1>
                        <hr>
                        <b-form v-if="$saas.getSecurity().isAuth() && this.userLoaded && user" @submit="onSubmit">
                            <b-alert v-if="hasError && response" variant="danger" dismissible :show="true">
                                <template v-if="response.getCode() >= 400 && response.getCode() < 500">
                                    Update failed.
                                </template>

                                <template v-if="response.getCode() >= 500">
                                    System error.
                                </template>
                            </b-alert>

                            <b-alert v-if="response && response.getCode() === 200" variant="success" dismissible :show="true">
                                Update successfully.
                            </b-alert>

                            <b-form-group label="Name" label-for="name">
                                <b-form-input id="name" v-model="user.name" type="text" required placeholder="Name"></b-form-input>
                            </b-form-group>

                            <b-button type="submit" variant="primary" :disabled="disabled">Update profile</b-button>
                        </b-form>
                    </b-col>
                </b-row>
            </b-container>
        </template>
    </master>
</template>

<script lang="ts">
import {Component, Mixins} from 'vue-property-decorator';
import SettingsNavigation from '@/components/navigations/SettingsNavigation.vue';
import UserMixin from '@/mixins/User.vue';
import User from '@/models/user';
import CloneService from '@/services/clone';
import ResponseInterface from '@/packages/http/response';

@Component({
  components: {
    SettingsNavigation,
  },
})
export default class Profile extends Mixins(UserMixin) {
  public hasError: boolean = false;
  public disabled: boolean = false;
  public response: ResponseInterface | null = null;

  public get user(): User | null {
    return CloneService.clone(this.$saas.getSecurity().getUser());
  }

  public onSubmit($event: Event) {
    $event.preventDefault();
    this.hasError = false;
    this.response = null;
    this.disabled = true;

    this.$saas.getHttp().patch('/api/auth/profile', this.user).then((data) => {
      this.response = this.$saas.getHttp().response(data);
      this.disabled = false;
      Object.assign(this.$saas.getSecurity().getUser(), {
        name: this.response.getData().data.name,
        updatedAt: this.response.getData().data.updatedAt,
      });
    }).catch((data) => {
      this.response = this.$saas.getHttp().response(data.response);
      this.hasError = true;
      this.disabled = false;
    });
  }
}
</script>
