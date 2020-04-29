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
                            <b-alert v-if="form.error && form.response" variant="danger" dismissible :show="true">
                                <template v-if="form.response.getCode() >= 400 && form.response.getCode() < 500">
                                    Update failed.
                                </template>

                                <template v-if="form.response.getCode() >= 500">
                                    System error.
                                </template>
                            </b-alert>

                            <b-alert v-if="form.response && form.response.getCode() === 200" variant="success" dismissible :show="true">
                                Update successfully.
                            </b-alert>

                            <b-form-group label="Name" label-for="name">
                                <b-form-input id="name" v-model="user.name" type="text" required placeholder="Name"></b-form-input>
                            </b-form-group>

                            <b-button type="submit" variant="primary" :disabled="form.disabled">Update profile</b-button>
                        </b-form>
                    </b-col>
                </b-row>
            </b-container>
        </template>
    </master>
</template>

<script lang="ts">
import {Component, Mixins} from 'vue-property-decorator';
import SettingsNavigation from './../../../../components/navigations/SettingsNavigation.vue';
import UserMixin from './../../../../mixins/User.vue';
import User from './../../../../models/user';
import UtilObject from './../../../../utils/object';
import Form from '../../../../packages/form/basic/form';
import Validator from '../../../../packages/validator/basic/validator';

@Component({
  components: {
    SettingsNavigation,
  },
})
export default class Profile extends Mixins(UserMixin) {
  private user: User | null = UtilObject.clone(this.$saas.getSecurity().getUser());
  private form: Form = new Form(new Validator());

  public onUserLoaded(): void {
    this.user = UtilObject.clone(this.$saas.getSecurity().getUser());
  }

  public onSubmit($event: Event) {
    $event.preventDefault();
    this.form.error = false;
    this.form.response = null;
    this.form.disabled = true;

    this.$saas.getHttp().patch('/api/auth/profile', this.user).then((data) => {
      this.form.response = this.$saas.getHttp().response(data);
      this.form.disabled = false;
      Object.assign(this.$saas.getSecurity().getUser(), {
        name: this.form.response.getData().data.name,
        updatedAt: this.form.response.getData().data.updatedAt,
      });
    }).catch((data) => {
      this.form.response = this.$saas.getHttp().response(data.response);
      this.form.error = true;
      this.form.disabled = false;
    });
  }
}
</script>
