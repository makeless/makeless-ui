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
                            {{ $makeless.t('pages.team-user-team.title') }}
                            <b-button size="sm" variant="primary" v-b-modal.team-invitation-team-create>{{ $makeless.t('pages.team-user-team.actions.create') }}</b-button>
                        </h1>
                        <hr>
                        <b-list-group v-if="response && teamUsers">
                            <b-list-group-item class="d-flex justify-content-between align-items-center" v-for="teamUser in teamUsers" :key="teamUser.userId">
                                <div>
                                    {{ teamUser.user.name }}
                                </div>
                                <div class="d-flex flex-column flex-sm-row align-items-sm-center flex-wrap text-right">
                                    <div class="pt-1 pb-1" v-if="teamUser.state.responseUpdateRole">
                                        <template v-if="teamUser.state.responseUpdateRole.getCode() >= 400 && teamUser.state.responseUpdateRole.getCode() < 500">
                                            <span class="text-danger">{{ $makeless.t('pages.team-user-team.errors.update.4x') }}</span>
                                        </template>

                                        <template v-if="teamUser.state.responseUpdateRole.getCode() >= 500">
                                            <span class="text-danger">{{ $makeless.t('pages.team-user-team.errors.update.5x') }}</span>
                                        </template>
                                    </div>
                                    <div class="ml-2 pt-1 pb-1">
                                        <role :obj="teamUser"></role>
                                    </div>
                                    <div class="ml-2 pt-1 pb-1">
                                        <b-button v-if="$makeless.getSecurity().getTeam().userId !== teamUser.userId" size="sm" variant="danger" v-b-modal.team-user-team-delete @click="selectTeamUser(teamUser)">{{ $makeless.t('pages.team-user-team.actions.delete') }}</b-button>
                                        <div v-else>
                                            <b-icon-lock></b-icon-lock>
                                            {{ $makeless.t('pages.team-user-team.owner') }}
                                        </div>
                                    </div>
                                </div>
                            </b-list-group-item>
                        </b-list-group>
                        <div v-else class="text-center">
                            <b-spinner :label="$makeless.t('pages.team-user-team.loading')"></b-spinner>
                        </div>
                    </b-col>
                </b-row>
            </b-container>
        </template>

        <template slot="outside">
            <delete-modal :team-user="selectedTeamUser" :team-users="teamUsers"></delete-modal>
            <create-modal :team-users="teamUsers"></create-modal>
        </template>
    </master>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import ResponseInterface from '../../../../packages/http/response';
import TeamUser from '../../../../models/team-user';
import DeleteModal from '../../../modals/settings/team-user/team/Delete.vue';
import CreateModal from '../../../modals/settings/team-invitation/team/Create.vue';
import Role from '../../../selects/team/Role.vue';

@Component({
  components: {
    DeleteModal,
    CreateModal,
    Role,
  },
})
export default class TeamUserTeam extends Vue {
  private selectedTeamUser: TeamUser | null = null;
  private response: ResponseInterface | null = null;
  private teamUsers: TeamUser[] | null = null;

  public selectTeamUser(teamUser: TeamUser) {
    this.selectedTeamUser = teamUser;
  }

  created() {
    this.loadTeamUsers();
  }

  loadTeamUsers(): void {
    this.$makeless.getHttp().get('/api/auth/team/team-user', {
      headers: {
        'Team': this.$makeless.getSecurity().getTeam()!.id,
      },
    }).then((data) => {
      this.teamUsers = [];
      this.response = this.$makeless.getHttp().response(data);
      this.response.getData().data.forEach((teamUser: TeamUser) => {
        this.teamUsers!.push(Object.assign(new TeamUser(), teamUser, {
          state: {
            responseUpdateRole: null,
            loadingUpdateRole: false,
          },
        }));
      });
    });
  }
}
</script>
