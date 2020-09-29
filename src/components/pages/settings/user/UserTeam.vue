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
                            {{ $saas.t('pages.user-team.title') }}
                            <b-button size="sm" variant="primary" v-b-modal.user-team-invite>{{ $saas.t('pages.user-team.actions.invite') }}</b-button>
                        </h1>
                        <hr>
                        <b-list-group v-if="response && users">
                            <b-list-group-item class="d-flex justify-content-between align-items-center" v-for="user in users" :key="user.id">
                                {{ user.name }}
                                <b-button v-if="$saas.getSecurity().getTeam().userId !== user.id" size="sm" variant="danger" v-b-modal.user-team-remove @click="selectUser(user)">{{ $saas.t('pages.user-team.actions.remove') }}</b-button>
                                <div v-else>
                                    <b-icon-lock></b-icon-lock>
                                    {{ $saas.t('pages.user-team.owner') }}
                                </div>
                            </b-list-group-item>
                        </b-list-group>
                        <div v-else class="text-center">
                            <b-spinner :label="$saas.t('pages.user-team.loading')"></b-spinner>
                        </div>
                    </b-col>
                </b-row>
            </b-container>
        </template>

        <template slot="outside">
            <remove-modal :user="selectedUser" :users="users"></remove-modal>
            <invite-modal :users="users"></invite-modal>
        </template>
    </master>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import ResponseInterface from '../../../../packages/http/response';
import User from '../../../../models/user';
import RemoveModal from '../../../modals/settings/user/team/Remove.vue';
import InviteModal from '../../../modals/settings/user/team/Invite.vue';

@Component({
  components: {
    RemoveModal,
    InviteModal
  },
})
export default class UserTeam extends Vue {
  private selectedUser: User | null = null;
  private response: ResponseInterface | null = null;
  private users: User[] | null = null;

  public selectUser(user: User) {
    this.selectedUser = user;
  }

  created() {
    this.loadTeamUsers();
  }

  loadTeamUsers(): void {
    this.$saas.getHttp().get('/api/auth/team/user', {
      headers: {
        'Team': this.$saas.getSecurity().getTeam()!.id,
      },
    }).then((data) => {
      this.users = [];
      this.response = this.$saas.getHttp().response(data);
      this.response.getData().data.forEach((user: User) => {
        this.users!.push(user);
      });
    });
  }
}
</script>
