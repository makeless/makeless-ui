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
                                            <b-button size="sm" variant="primary" @click="acceptTeamInvitation(teamInvitation)" class="mr-0 mr-sm-2 mb-2 mb-sm-0">{{ $saas.t('pages.team-invitation.actions.accept') }}</b-button>
                                            <b-button size="sm" @click="declineTeamInvitation(teamInvitation)">{{ $saas.t('pages.team-invitation.actions.decline') }}</b-button>
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
      this.response.getData().data.forEach((teamInvitation: TeamInvitationModel) => {
        teamInvitation.expire = new Date(teamInvitation.expire!);
        this.teamInvitations!.push(teamInvitation);
      });
    });
  }

  acceptTeamInvitation(teamInvitation: TeamInvitationModel): void {
    const teamInvitationAccept: TeamInvitationAccept = Object.assign(new TeamInvitationAccept(), {
      id: teamInvitation.id,
      token: teamInvitation.token,
      teamId: teamInvitation.teamId,
    });

    this.$saas.getHttp().patch('/api/auth/team-invitation/accept', {
      data: teamInvitationAccept,
    }).then((data) => {
      this.response = this.$saas.getHttp().response(data);
      /*this.$saas.getSecurity().addTeam(teamInvitation!.team);*/
    }).catch((data) => {
      this.response = this.$saas.getHttp().response(data.response);
    });
  }

  declineTeamInvitation(teamInvitation: TeamInvitationModel): void {
    const teamInvitationDelete: TeamInvitationDelete = Object.assign(new TeamInvitationDelete(), {
      id: teamInvitation.id,
    });

    this.$saas.getHttp().delete('/api/auth/team-invitation', {
      data: teamInvitationDelete,
    }).then((data) => {
      this.response = this.$saas.getHttp().response(data);
      this.removeTeamInvitation(teamInvitation);
    }).catch((data) => {
      this.response = this.$saas.getHttp().response(data.response);
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
