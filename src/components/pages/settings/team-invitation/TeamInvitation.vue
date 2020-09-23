<template>
    <master>
        <template slot="page">
            <b-container>
                <b-row>
                    <b-col lg="3">
                        <settings-navigation></settings-navigation>
                    </b-col>

                    <b-col lg="9">
                        <h1>{{ $saas.t('pages.team-invitation.title') }}</h1>
                        <hr>

                        <div v-if="response && teamInvitations">
                            <b-list-group v-if="teamInvitations.length">
                                <b-list-group-item v-for="teamInvitation in teamInvitations" :key="teamInvitation.id">
                                    <b-row class="d-flex align-items-center">
                                        <b-col cols="7">
                                            <b-row>
                                                <b-col cols="12">{{ teamInvitation.team.name }}</b-col>
                                                <b-col cols="12"><small>{{ teamInvitation.user.name }}</small></b-col>
                                                <b-col cols="12" class="mt-2"><small>{{ `${$saas.t('pages.team-invitation.expires')} ${teamInvitation.expire.toLocaleString()}` }}</small></b-col>
                                            </b-row>
                                        </b-col>
                                        <b-col cols="5" class="text-right">
                                            <b-button size="sm" variant="primary" @click="acceptTeamInvitation(teamInvitation)" class="mr-0 mr-sm-2 mb-2 mb-sm-0">
                                                <b-spinner small v-if="teamInvitation.isLoadingTeamInvitationAccept" class="mr-1"></b-spinner>
                                                <span>{{ $saas.t('pages.team-invitation.actions.accept') }}</span>
                                            </b-button>
                                            <b-button size="sm" @click="deleteTeamInvitation(teamInvitation)">
                                                <b-spinner small v-if="teamInvitation.isLoadingTeamInvitationDelete" class="mr-1"></b-spinner>
                                                <span>{{ $saas.t('pages.team-invitation.actions.decline') }}</span>
                                            </b-button>
                                        </b-col>
                                    </b-row>
                                </b-list-group-item>
                            </b-list-group>

                            <div v-else class="text-center">
                                <b-col class="mt-2 mt-sm-5">
                                    <b-icon :icon="icon" variant="primary" :font-scale="3"/>
                                </b-col>
                                <b-col class="mt-3 mt-sm-3">
                                    <h2>{{ $saas.t('pages.team-invitation.noInvitations') }}</h2>
                                </b-col>
                            </div>
                        </div>
                        <div v-else class="text-center">
                            <b-spinner :label="$saas.t('pages.team-invitation.loading')"></b-spinner>
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
    this.$saas.getHttp().get('/api/auth/team-invitation').then((data) => {
      this.teamInvitations = [];
      this.response = this.$saas.getHttp().response(data);
      this.response.getData().data.teamInvitations.forEach((teamInvitation: TeamInvitationModel) => {
        teamInvitation.expire = new Date(teamInvitation.expire!);
        this.teamInvitations!.push(Object.assign(new TeamInvitationModel(), teamInvitation));
      });
    });
  }

  acceptTeamInvitation(teamInvitation: TeamInvitationModel): void {
    teamInvitation.isLoadingTeamInvitationAccept = true;

    console.log(teamInvitation);

    const teamInvitationAccept: TeamInvitationAccept = Object.assign(new TeamInvitationAccept(), {
      id: teamInvitation.id,
    });

    this.$saas.getHttp().patch('/api/auth/team-invitation/accept', teamInvitationAccept).then((data) => {
      this.response = this.$saas.getHttp().response(data);
      const team: Team = this.response.getData().data;
      this.$saas.getSecurity().addTeam(team);
      this.$saas.getSecurity().switchToTeam(team.id!);
      teamInvitation.isLoadingTeamInvitationAccept = false;
    }).catch((data) => {
      this.response = this.$saas.getHttp().response(data.response);
      teamInvitation.isLoadingTeamInvitationAccept = false;
    });
  }

  deleteTeamInvitation(teamInvitation: TeamInvitationModel): void {
    teamInvitation.isLoadingTeamInvitationDelete = true;

    const teamInvitationDelete: TeamInvitationDelete = Object.assign(new TeamInvitationDelete(), {
      id: teamInvitation.id,
    });

    this.$saas.getHttp().delete('/api/auth/team-invitation', {
      data: teamInvitationDelete,
    }).then((data) => {
      this.response = this.$saas.getHttp().response(data);
      this.removeTeamInvitation(teamInvitation);
      teamInvitation.isLoadingTeamInvitationDelete = false;
    }).catch((data) => {
      this.response = this.$saas.getHttp().response(data.response);
      teamInvitation.isLoadingTeamInvitationDelete = false;
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
