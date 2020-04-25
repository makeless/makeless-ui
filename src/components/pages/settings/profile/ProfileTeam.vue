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
                        <b-form v-if="$saas.getSecurity().isAuth() && this.userLoaded && team" @submit="onSubmit">
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
                                <b-form-input id="name" v-model="team.name" type="text" required placeholder="Name"></b-form-input>
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
import SettingsNavigation from './../../../../components/navigations/SettingsNavigation.vue';
import UserMixin from './../../../../mixins/User.vue';
import CloneService from './../../../../services/clone';
import ResponseInterface from './../../../../packages/http/response';
import Team from './../../../../models/team';

@Component({
  components: {
    SettingsNavigation,
  },
})
export default class ProfileTeam extends Mixins(UserMixin) {
  public hasError: boolean = false;
  public disabled: boolean = false;
  public response: ResponseInterface | null = null;

  public get team(): Team | null {
    return CloneService.clone(this.$saas.getSecurity().getTeam());
  }

  public onSubmit($event: Event) {
    $event.preventDefault();
    this.hasError = false;
    this.response = null;
    this.disabled = true;

    if (this.team === null || this.team.id === null) {
      return;
    }

    this.$saas.getHttp().patch('/api/auth/team/profile', this.team, {
      headers: {
        'Team': this.team.id,
      },
    }).then((data) => {
      this.response = this.$saas.getHttp().response(data);
      this.disabled = false;
      Object.assign(this.$saas.getSecurity().getTeam(), {
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
