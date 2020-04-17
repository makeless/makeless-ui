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
                        <b-form v-if="$saas.getSecurity().isAuth() && this.userLoaded" @submit="onSubmit">
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
                                <b-form-input v-if="!$saas.getSecurity().getTeam()" id="name" v-model="$saas.getSecurity().getUser().name" type="text" required placeholder="Name"></b-form-input>
                                <b-form-input v-else id="name" v-model="$saas.getSecurity().getTeam().name" type="text" required placeholder="Name"></b-form-input>
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
import SettingsNavigation from '@/components/navigation/SettingsNavigation.vue';
import UserMixin from '@/mixins/User.vue';
import ResponseInterface from '@/packages/http/response';

@Component({
  components: {
    SettingsNavigation,
  },
})
export default class Profile extends Mixins(UserMixin) {
  private hasError: boolean = false;
  private disabled: boolean = false;
  private response: ResponseInterface | null = null;

  private request(): Promise<any> {
    const team = this.$saas.getSecurity().getTeam();

    if (team !== null && team.id !== null) {
      return this.$saas.getHttp().patch('/api/auth/team/profile', team, {
        headers: {'Team': team.id},
      });
    }

    return this.$saas.getHttp().patch('/api/auth/profile', this.$saas.getSecurity().getUser());
  }

  private update(response: ResponseInterface): void {
    const data = response.getData().data;

    if (this.$saas.getSecurity().getTeam()) {
      Object.assign(this.$saas.getSecurity().getTeam(), {
        name: data.name,
        updatedAt: data.updatedAt,
      });
      return;
    }

    Object.assign(this.$saas.getSecurity().getUser(), {
      name: data.name,
      updatedAt: data.updatedAt,
    });
  }

  public onSubmit($event: Event) {
    $event.preventDefault();

    this.hasError = false;
    this.disabled = true;
    this.response = null;

    this.request().then((data) => {
      this.response = this.$saas.getHttp().response(data);
      this.disabled = false;
      this.update(this.response);
    }).catch((data) => {
      this.response = this.$saas.getHttp().response(data.response);
      this.hasError = true;
      this.disabled = false;
    });
  }
}
</script>
