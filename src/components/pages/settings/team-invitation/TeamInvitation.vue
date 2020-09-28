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
                                        <b-col cols="7" sm="6">
                                            <b-row>
                                                <b-col cols="12">{{ teamInvitation.team.name }}</b-col>
                                                <b-col cols="12"><small>{{ teamInvitation.user.name }}</small></b-col>
                                                <b-col cols="12" class="mt-2"><small>{{ `${$saas.t('pages.team-invitation.expires')} ${teamInvitation.expire.toLocaleString()}` }}</small></b-col>
                                            </b-row>
                                        </b-col>
                                        <b-col cols="5" sm="6">
                                            <b-row class="d-flex justify-content-end align-items-center">
                                                <b-col md="auto" class="mb-2 mb-md-0 pr-md-0 text-right" v-if="responseAcceptTeamInvitation || responseDeleteTeamInvitation">
                                                    <template v-if="responseAcceptTeamInvitation">
                                                        <template v-if="responseAcceptTeamInvitation.getCode() >= 400 && responseAcceptTeamInvitation.getCode() < 500">
                                                            <span class="text-danger">{{ $saas.t('pages.team-invitation.errors.accept.4x') }}</span>
                                                        </template>

                                                        <template v-if="responseAcceptTeamInvitation.getCode() >= 500">
                                                            <span class="text-danger">{{ $saas.t('pages.team-invitation.errors.accept.5x') }}</span>
                                                        </template>
                                                    </template>

                                                    <template v-if="responseDeleteTeamInvitation">
                                                        <template v-if="responseDeleteTeamInvitation.getCode() >= 400 && responseDeleteTeamInvitation.getCode() < 500">
                                                            <span class="text-danger">{{ $saas.t('pages.team-invitation.errors.delete.4x') }}</span>
                                                        </template>

                                                        <template v-if="responseDeleteTeamInvitation.getCode() >= 500">
                                                            <span class="text-danger">{{ $saas.t('pages.team-invitation.errors.delete.5x') }}</span>
                                                        </template>
                                                    </template>
                                                </b-col>
                                                <b-col sm="auto" class="mb-2 mb-sm-0 pr-sm-0 text-right">
                                                    <b-button size="sm" variant="primary" @click="acceptTeamInvitation(teamInvitation)">
                                                        <b-spinner small v-if="teamInvitation.isLoadingAccept" class="mr-1"></b-spinner>
                                                        <span>{{ $saas.t('pages.team-invitation.actions.accept') }}</span>
                                                    </b-button>
                                                </b-col>
                                                <b-col sm="auto" class="pl-2 text-right">
                                                    <b-button size="sm" @click="deleteTeamInvitation(teamInvitation)">
                                                        <b-spinner small v-if="teamInvitation.isLoadingDelete" class="mr-1"></b-spinner>
                                                        <span>{{ $saas.t('pages.team-invitation.actions.delete') }}</span>
                                                    </b-button>
                                                </b-col>
                                            </b-row>
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
  private responseAcceptTeamInvitation: ResponseInterface | null = null;
  private responseDeleteTeamInvitation: ResponseInterface | null = null;
  private teamInvitations: TeamInvitationModel[] | null = [];

  created() {
    this.loadTeamInvitations();
  }

  loadTeamInvitations(): void {
    this.responseAcceptTeamInvitation = null;
    this.responseDeleteTeamInvitation = null;

    this.$saas.getHttp().get('/api/auth/team-invitation').then((data) => {
      this.teamInvitations = [];
      this.response = this.$saas.getHttp().response(data);
      this.response.getData().data.forEach((teamInvitation: TeamInvitationModel) => {
        this.teamInvitations!.push(Object.assign(new TeamInvitationModel(), teamInvitation, {
          expire: new Date(teamInvitation.expire!),
        }));
      });
    });
  }

  acceptTeamInvitation(teamInvitation: TeamInvitationModel): void {
    this.responseAcceptTeamInvitation = null;
    this.responseDeleteTeamInvitation = null;
    teamInvitation.isLoadingDelete = false;
    teamInvitation.isLoadingAccept = true;

    const teamInvitationAccept: TeamInvitationAccept = Object.assign(new TeamInvitationAccept(), {
      id: teamInvitation.id,
    });

    this.$saas.getHttp().patch('/api/auth/team-invitation/accept', teamInvitationAccept).then((data) => {
      this.responseAcceptTeamInvitation = this.$saas.getHttp().response(data);
      const team: Team = this.responseAcceptTeamInvitation.getData().data;
      teamInvitation.isLoadingAccept = false;
      this.$saas.getSecurity().addTeam(team);
      this.$saas.getSecurity().switchToTeam(team.id!);
    }).catch((data) => {
      this.responseAcceptTeamInvitation = this.$saas.getHttp().response(data.response);
      teamInvitation.isLoadingAccept = false;
    });
  }

  deleteTeamInvitation(teamInvitation: TeamInvitationModel): void {
    this.responseDeleteTeamInvitation = null;
    this.responseAcceptTeamInvitation = null;
    teamInvitation.isLoadingAccept = false;
    teamInvitation.isLoadingDelete = true;

    const teamInvitationDelete: TeamInvitationDelete = Object.assign(new TeamInvitationDelete(), {
      id: teamInvitation.id,
    });

    this.$saas.getHttp().delete('/api/auth/team-invitation', {
      data: teamInvitationDelete,
    }).then((data) => {
      this.responseDeleteTeamInvitation = this.$saas.getHttp().response(data);
      this.removeTeamInvitation(teamInvitation);
      teamInvitation.isLoadingDelete = false;
    }).catch((data) => {
      this.responseDeleteTeamInvitation = this.$saas.getHttp().response(data.response);
      teamInvitation.isLoadingDelete = false;
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
