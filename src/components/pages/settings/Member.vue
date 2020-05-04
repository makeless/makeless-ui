<template>
    <master>
        <template slot="page">
            <b-container>
                <b-row>
                    <b-col lg="3">
                        <settings-navigation></settings-navigation>
                    </b-col>

                    <b-col lg="9">
                        <h1 class="d-flex justify-content-between align-items-center">
                            {{ $saas.t('pages.member.title') }}
                            <b-button size="sm" variant="primary" v-b-modal.member-create>{{ $saas.t('pages.member.actions.invite') }}</b-button>
                        </h1>
                        <hr>
                        <b-list-group v-if="$saas.getSecurity().isAuth() && userLoaded && response && users.length > 0">
                            <b-list-group-item class="d-flex justify-content-between align-items-center" v-for="user in users" :key="user.id">
                                {{ user.name }}
                                <b-button v-if="$saas.getSecurity().getUser().id !== user.id" size="sm" variant="danger" v-b-modal.member-delete @click="selectUser(user)">{{ $saas.t('pages.member.actions.delete') }}</b-button>
                                <div v-else><b-icon-lock></b-icon-lock> Owner</div>
                            </b-list-group-item>
                        </b-list-group>
                        <div v-else class="text-center">
                            <b-spinner :label="$saas.t('pages.member.loading')"></b-spinner>
                        </div>
                    </b-col>
                </b-row>
            </b-container>
        </template>

        <template slot="outside">
        </template>
    </master>
</template>

<script lang="ts">
import {Component, Mixins} from 'vue-property-decorator';
import SettingsNavigation from './../../../components/navigations/SettingsNavigation.vue';
import UserMixin from './../../../mixins/User.vue';
import ResponseInterface from '../../../packages/http/response';
import User from '../../../models/user';

@Component({
  components: {
    SettingsNavigation,
  },
})
export default class Member extends Mixins(UserMixin) {
  private response: ResponseInterface | null = null;
  private users: User[] = [];

  onUserLoaded() {
    if (this.response === null) {
      this.loadTeamMembers();
    }
  }

  created() {
    this.loadTeamMembers();
  }

  loadTeamMembers(): void {
    if (this.$saas.getSecurity().getTeam() === null) {
      return;
    }

    this.$saas.getHttp().get('/api/auth/team/member', {
      headers: {
        'Team': this.$saas.getSecurity().getTeam()!.id,
      },
    }).then((data) => {
      this.response = this.$saas.getHttp().response(data);
      this.response.getData().data.forEach((user: User) => {
        this.users.push(user);
      });
    });
  }
}
</script>
