<template>
    <master>
        <template slot="page">
            <b-container>
                <b-row>
                    <b-col lg="3">
                        <settings-navigation></settings-navigation>
                    </b-col>

                    <b-col lg="9">
                        <h1>{{ $saas.t('pages.team-invitation-team.title') }}</h1>
                        <hr>

                        <div v-if="response && teamInvitations">
                            <b-list-group v-if="teamInvitations.length">
                                <b-list-group-item class="d-flex justify-content-between align-items-center" v-for="teamInvitation in teamInvitations" :key="teamInvitation.id">
                                    <div>
                                        <div>{{ teamInvitation.email }}</div>
                                        <div><small>{{ `${$saas.t('pages.team-invitation-team.invitedBy')} ${teamInvitation.user.name}` }}</small></div>
                                        <div class="mt-2"><small>{{ teamInvitation.createdAt.toLocaleString() }}</small></div>
                                    </div>
                                    <div>
                                        <div class="d-flex flex-column flex-sm-row align-items-sm-center flex-wrap text-right">
                                            <div class="pt-1 pb-1" v-if="responseResendTeamInvitation || responseDeleteTeamInvitation">
                                                <template v-if="responseResendTeamInvitation">
                                                    <template v-if="responseResendTeamInvitation.getCode() === 200">
                                                        <span class="text-success">{{ $saas.t('pages.team-invitation-team.errors.resend.2x') }}</span>
                                                    </template>

                                                    <template v-if="responseResendTeamInvitation.getCode() >= 400 && responseResendTeamInvitation.getCode() < 500">
                                                        <span class="text-danger">{{ $saas.t('pages.team-invitation-team.errors.resend.4x') }}</span>
                                                    </template>

                                                    <template v-if="responseResendTeamInvitation.getCode() >= 500">
                                                        <span class="text-danger">{{ $saas.t('pages.team-invitation-team.errors.resend.5x') }}</span>
                                                    </template>
                                                </template>

                                                <template v-if="responseDeleteTeamInvitation">
                                                    <template v-if="responseDeleteTeamInvitation.getCode() >= 400 && responseDeleteTeamInvitation.getCode() < 500">
                                                        <span class="text-danger">{{ $saas.t('pages.team-invitation-team.errors.delete.4x') }}</span>
                                                    </template>

                                                    <template v-if="responseDeleteTeamInvitation.getCode() >= 500">
                                                        <span class="text-danger">{{ $saas.t('pages.team-invitation-team.errors.delete.5x') }}</span>
                                                    </template>
                                                </template>
                                            </div>
                                            <div class="ml-2 pt-1 pb-1">
                                                <b-button size="sm" @click="resendTeamInvitation(teamInvitation)" variant="primary">
                                                    <b-spinner small v-if="teamInvitation.isLoadingResend" class="mr-1"></b-spinner>
                                                    <span>{{ $saas.t('pages.team-invitation-team.actions.resend') }}</span>
                                                </b-button>
                                            </div>
                                            <div class="ml-2 pt-1 pb-1">
                                                <b-button size="sm" @click="deleteTeamInvitation(teamInvitation)">
                                                    <b-spinner small v-if="teamInvitation.isLoadingDelete" class="mr-1"></b-spinner>
                                                    <span>{{ $saas.t('pages.team-invitation-team.actions.delete') }}</span>
                                                </b-button>
                                            </div>
                                        </div>
                                    </div>
                                </b-list-group-item>
                            </b-list-group>

                            <div v-else class="text-center">
                                <b-col class="mt-2 mt-sm-5">
                                    <b-icon :icon="icon" variant="primary" :font-scale="3"/>
                                </b-col>
                                <b-col class="mt-3 mt-sm-3">
                                    <h2>{{ $saas.t('pages.team-invitation-team.noInvitations') }}</h2>
                                </b-col>
                            </div>
                        </div>
                        <div v-else class="text-center">
                            <b-spinner :label="$saas.t('pages.team-invitation-team.loading')"></b-spinner>
                        </div>
                    </b-col>
                </b-row>
            </b-container>
        </template>
    </master>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import ResponseInterface from '../../../../packages/http/response';
import TeamInvitation from '../../../../models/team-invitation';
import TeamInvitationTeamDelete from '../../../../structs/team-invitation-team-delete';
import TeamInvitationTeamResend from '../../../../structs/team-invitation-team-resend';

@Component({
  components: {},
})
export default class TeamInvitationTeam extends Vue {
  public icon: string = 'people';
  private response: ResponseInterface | null = null;
  private responseResendTeamInvitation: ResponseInterface | null = null;
  private responseDeleteTeamInvitation: ResponseInterface | null = null;
  private teamInvitations: TeamInvitation[] | null = [];

  created() {
    this.loadTeamInvitations();
  }

  loadTeamInvitations(): void {
    this.responseDeleteTeamInvitation = null;
    this.responseResendTeamInvitation = null;

    this.$saas.getHttp().get('/api/auth/team/team-invitation', {
      headers: {
        'Team': this.$saas.getSecurity().getTeam()!.id,
      },
    }).then((data) => {
      this.teamInvitations = [];
      this.response = this.$saas.getHttp().response(data);
      this.response.getData().data.forEach((teamInvitation: TeamInvitation) => {
        this.teamInvitations!.push(Object.assign(new TeamInvitation(), teamInvitation, {
          createdAt: new Date(teamInvitation.createdAt!),
        }));
      });
    });
  }

  resendTeamInvitation(teamInvitation: TeamInvitation): void {
    this.responseResendTeamInvitation = null;
    this.responseDeleteTeamInvitation = null;
    teamInvitation.isLoadingDelete = false;
    teamInvitation.isLoadingResend = true;

    const teamInvitationTeamResend: TeamInvitationTeamResend = Object.assign(new TeamInvitationTeamResend(), {
      id: teamInvitation.id,
    });

    this.$saas.getHttp().post('/api/auth/team/team-invitation/resend', teamInvitationTeamResend, {
      headers: {
        'Team': this.$saas.getSecurity().getTeam()!.id,
      },
    }).then((data) => {
      this.responseResendTeamInvitation = this.$saas.getHttp().response(data);
      teamInvitation.isLoadingResend = false;
    }).catch((data) => {
      this.responseResendTeamInvitation = this.$saas.getHttp().response(data.response);
      teamInvitation.isLoadingResend = false;
    });
  }

  deleteTeamInvitation(teamInvitation: TeamInvitation): void {
    this.responseDeleteTeamInvitation = null;
    this.responseResendTeamInvitation = null;
    teamInvitation.isLoadingResend = false;
    teamInvitation.isLoadingDelete = true;

    const teamInvitationTeamDelete: TeamInvitationTeamDelete = Object.assign(new TeamInvitationTeamDelete(), {
      id: teamInvitation.id,
    });

    this.$saas.getHttp().delete('/api/auth/team/team-invitation', {
      data: teamInvitationTeamDelete,
      headers: {
        'Team': this.$saas.getSecurity().getTeam()!.id,
      },
    }).then((data) => {
      this.responseDeleteTeamInvitation = this.$saas.getHttp().response(data);
      this.removeTeamInvitation(teamInvitation);
      teamInvitation.isLoadingDelete = false;
    }).catch((data) => {
      this.responseDeleteTeamInvitation = this.$saas.getHttp().response(data.response);
      teamInvitation.isLoadingDelete = false;
    });
  }

  public removeTeamInvitation(teamInvitation: TeamInvitation): void {
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
