<template>
    <master>
        <template slot="page">
            <b-container>
                <b-row>
                    <b-col lg="3">
                        <setting-navigation></setting-navigation>
                    </b-col>

                    <b-col lg="9">
                        <h1>{{ $makeless.t('pages.team-invitation.title') }}</h1>
                        <hr>

                        <div v-if="response && teamInvitations">
                            <b-list-group v-if="teamInvitations.length">
                                <b-list-group-item class="d-flex justify-content-between align-items-center" v-for="teamInvitation in teamInvitations" :key="teamInvitation.id">
                                    <div>
                                        <div>{{ teamInvitation.team.name }}</div>
                                        <div><small>{{ teamInvitation.user.name }}</small></div>
                                        <div class="mt-2"><small>{{ `${$makeless.t('pages.team-invitation.expires')} ${teamInvitation.expire.toLocaleString()}` }}</small></div>
                                    </div>
                                    <div>
                                        <div class="d-flex flex-column flex-sm-row align-items-sm-center flex-wrap text-right">
                                            <div class="pt-1 pb-1" v-if="teamInvitation.state.responseAccept || teamInvitation.state.responseDelete">
                                                <template v-if="teamInvitation.state.responseAccept">
                                                    <template v-if="teamInvitation.state.responseAccept.getCode() >= 400 && teamInvitation.state.responseAccept.getCode() < 500">
                                                        <span class="text-danger">{{ $makeless.t('pages.team-invitation.errors.accept.4x') }}</span>
                                                    </template>

                                                    <template v-if="teamInvitation.state.responseAccept.getCode() >= 500">
                                                        <span class="text-danger">{{ $makeless.t('pages.team-invitation.errors.accept.5x') }}</span>
                                                    </template>
                                                </template>

                                                <template v-if="teamInvitation.state.responseDelete">
                                                    <template v-if="teamInvitation.state.responseDelete.getCode() >= 400 && teamInvitation.state.responseDelete.getCode() < 500">
                                                        <span class="text-danger">{{ $makeless.t('pages.team-invitation.errors.delete.4x') }}</span>
                                                    </template>

                                                    <template v-if="teamInvitation.state.responseDelete.getCode() >= 500">
                                                        <span class="text-danger">{{ $makeless.t('pages.team-invitation.errors.delete.5x') }}</span>
                                                    </template>
                                                </template>
                                            </div>
                                            <div class="ml-2 pt-1 pb-1">
                                                <b-button size="sm" variant="primary" @click="acceptTeamInvitation(teamInvitation)">
                                                    <b-spinner small v-if="teamInvitation.state.loadingAccept" class="mr-1"></b-spinner>
                                                    <span>{{ $makeless.t('pages.team-invitation.actions.accept') }}</span>
                                                </b-button>
                                            </div>
                                            <div class="ml-2 pt-1 pb-1">
                                                <b-button size="sm" @click="deleteTeamInvitation(teamInvitation)">
                                                    <b-spinner small v-if="teamInvitation.state.loadingDelete" class="mr-1"></b-spinner>
                                                    <span>{{ $makeless.t('pages.team-invitation.actions.delete') }}</span>
                                                </b-button>
                                            </div>
                                        </div>
                                    </div>
                                </b-list-group-item>
                            </b-list-group>

                            <div v-else class="text-center">
                                <div class="mt-2 mt-sm-5">
                                    <b-icon :icon="icon" variant="primary" :font-scale="3"/>
                                </div>
                                <div class="mt-3 mt-sm-3">
                                    <h2>{{ $makeless.t('pages.team-invitation.noInvitations') }}</h2>
                                </div>
                            </div>
                        </div>
                        <div v-else class="text-center">
                            <b-spinner :label="$makeless.t('pages.team-invitation.loading')"></b-spinner>
                        </div>
                    </b-col>
                </b-row>
            </b-container>
        </template>
    </master>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import TeamInvitationModel from '../../../../models/team-invitation';
import ResponseInterface from '../../../../packages/http/response';
import TeamInvitationDelete from '../../../../structs/team-invitation-delete';
import TeamInvitationAccept from '../../../../structs/team-invitation-accept';
import Team from '../../../../models/team';

@Component({
  components: {},
})
export default class TeamInvitation extends Vue {
  public icon: string = 'box-seam';
  private response: ResponseInterface | null = null;
  private teamInvitations: TeamInvitationModel[] | null = [];

  created() {
    this.loadTeamInvitations();
  }

  loadTeamInvitations(): void {
    this.$makeless.getHttp().get('/api/auth/team-invitation').then((data) => {
      this.teamInvitations = [];
      this.response = this.$makeless.getHttp().response(data);
      this.response.getData().data.forEach((teamInvitation: TeamInvitationModel) => {
        this.teamInvitations!.push(Object.assign(new TeamInvitationModel(), teamInvitation, {
          expire: new Date(teamInvitation.expire!),
          state: {
            responseAccept: null,
            responseDelete: null,
            loadingDelete: false,
            loadingAccept: false
          }
        }));
      });
    });
  }

  acceptTeamInvitation(teamInvitation: TeamInvitationModel): void {
    teamInvitation.state.responseAccept = null;
    teamInvitation.state.responseDelete = null;
    teamInvitation.state.loadingDelete = false;
    teamInvitation.state.loadingAccept = true;

    const teamInvitationAccept: TeamInvitationAccept = Object.assign(new TeamInvitationAccept(), {
      id: teamInvitation.id,
    });

    this.$makeless.getHttp().patch('/api/auth/team-invitation/accept', teamInvitationAccept).then((data) => {
      teamInvitation.state.responseAccept = this.$makeless.getHttp().response(data);
      const team: Team = teamInvitation.state.responseAccept.getData().data;
      teamInvitation.state.loadingAccept = false;
      this.$makeless.getSecurity().addTeam(team);
      this.$makeless.getSecurity().switchToTeam(team.id!);
    }).catch((data) => {
      teamInvitation.state.responseAccept = this.$makeless.getHttp().response(data.response);
      teamInvitation.state.loadingAccept = false;
    });
  }

  deleteTeamInvitation(teamInvitation: TeamInvitationModel): void {
    teamInvitation.state.responseDelete = null;
    teamInvitation.state.responseAccept = null;
    teamInvitation.state.loadingAccept = false;
    teamInvitation.state.loadingDelete = true;

    const teamInvitationDelete: TeamInvitationDelete = Object.assign(new TeamInvitationDelete(), {
      id: teamInvitation.id,
    });

    this.$makeless.getHttp().delete('/api/auth/team-invitation', {
      data: teamInvitationDelete,
    }).then((data) => {
      teamInvitation.state.responseDelete = this.$makeless.getHttp().response(data);
      this.removeTeamInvitation(teamInvitation);
      teamInvitation.state.loadingDelete = false;
    }).catch((data) => {
      teamInvitation.state.responseDelete = this.$makeless.getHttp().response(data.response);
      teamInvitation.state.loadingDelete = false;
    });
  }

  public removeTeamInvitation(teamInvitation: TeamInvitationModel): void {
    for (let i = 0; i < this.teamInvitations!.length; i++) {
      if (this.teamInvitations![i].id !== teamInvitation.id) {
        continue;
      }

      this.teamInvitations!.splice(i, 1);
      return;
    }
  }
}
</script>
