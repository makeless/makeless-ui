<template>
    <master>
        <template slot="page">
            <b-container>
                <b-row>
                    <b-col lg="3">
                        <settings-navigation></settings-navigation>
                    </b-col>

                    <b-col lg="9">
                        <h1>{{ $makeless.t('pages.team-invitation-team.title') }}</h1>
                        <hr>

                        <div v-if="response && teamInvitations">
                            <b-list-group v-if="teamInvitations.length">
                                <b-list-group-item class="d-flex justify-content-between align-items-center" v-for="teamInvitation in teamInvitations" :key="teamInvitation.id">
                                    <div>
                                        <div>{{ teamInvitation.email }}</div>
                                        <div><small>{{ `${$makeless.t('pages.team-invitation-team.invitedBy')} ${teamInvitation.user.name}` }}</small></div>
                                        <div class="mt-2"><small>{{ teamInvitation.createdAt.toLocaleString() }}</small></div>
                                    </div>
                                    <div>
                                        <div class="d-flex flex-column flex-sm-row align-items-sm-center flex-wrap text-right">
                                            <div class="pt-1 pb-1" v-if="teamInvitation.state.responseResend || teamInvitation.state.responseDelete">
                                                <template v-if="teamInvitation.state.responseResend">
                                                    <template v-if="teamInvitation.state.responseResend.getCode() === 200">
                                                        <span class="text-success">{{ $makeless.t('pages.team-invitation-team.errors.resend.2x') }}</span>
                                                    </template>

                                                    <template v-if="teamInvitation.state.responseResend.getCode() >= 400 && teamInvitation.state.responseResend.getCode() < 500">
                                                        <span class="text-danger">{{ $makeless.t('pages.team-invitation-team.errors.resend.4x') }}</span>
                                                    </template>

                                                    <template v-if="teamInvitation.state.responseResend.getCode() >= 500">
                                                        <span class="text-danger">{{ $makeless.t('pages.team-invitation-team.errors.resend.5x') }}</span>
                                                    </template>
                                                </template>

                                                <template v-if="teamInvitation.state.responseDelete">
                                                    <template v-if="teamInvitation.state.responseDelete.getCode() >= 400 && teamInvitation.state.responseDelete.getCode() < 500">
                                                        <span class="text-danger">{{ $makeless.t('pages.team-invitation-team.errors.delete.4x') }}</span>
                                                    </template>

                                                    <template v-if="teamInvitation.state.responseDelete.getCode() >= 500">
                                                        <span class="text-danger">{{ $makeless.t('pages.team-invitation-team.errors.delete.5x') }}</span>
                                                    </template>
                                                </template>
                                            </div>
                                            <div class="ml-2 pt-1 pb-1">
                                                <b-button size="sm" @click="resendTeamInvitation(teamInvitation)" variant="primary">
                                                    <b-spinner small v-if="teamInvitation.state.isLoadingResend" class="mr-1"></b-spinner>
                                                    <span>{{ $makeless.t('pages.team-invitation-team.actions.resend') }}</span>
                                                </b-button>
                                            </div>
                                            <div class="ml-2 pt-1 pb-1">
                                                <b-button size="sm" @click="deleteTeamInvitation(teamInvitation)">
                                                    <b-spinner small v-if="teamInvitation.state.isLoadingDelete" class="mr-1"></b-spinner>
                                                    <span>{{ $makeless.t('pages.team-invitation-team.actions.delete') }}</span>
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
                                    <h2>{{ $makeless.t('pages.team-invitation-team.noInvitations') }}</h2>
                                </div>
                            </div>
                        </div>
                        <div v-else class="text-center">
                            <b-spinner :label="$makeless.t('pages.team-invitation-team.loading')"></b-spinner>
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
  private teamInvitations: TeamInvitation[] | null = [];

  created() {
    this.loadTeamInvitations();
  }

  loadTeamInvitations(): void {
    this.$makeless.getHttp().get('/api/auth/team/team-invitation', {
      headers: {
        'Team': this.$makeless.getSecurity().getTeam()!.id,
      },
    }).then((data) => {
      this.teamInvitations = [];
      this.response = this.$makeless.getHttp().response(data);
      this.response.getData().data.forEach((teamInvitation: TeamInvitation) => {
        this.teamInvitations!.push(Object.assign(new TeamInvitation(), teamInvitation, {
          createdAt: new Date(teamInvitation.createdAt!),
          state: {
            responseResend: null,
            responseDelete: null,
            isLoadingDelete: false,
            isLoadingResend: false
          }
        }));
      });
    });
  }

  resendTeamInvitation(teamInvitation: TeamInvitation): void {
    teamInvitation.state.responseResend = null;
    teamInvitation.state.responseDelete = null;
    teamInvitation.state.isLoadingDelete = false;
    teamInvitation.state.isLoadingResend = true;

    const teamInvitationTeamResend: TeamInvitationTeamResend = Object.assign(new TeamInvitationTeamResend(), {
      id: teamInvitation.id,
    });

    this.$makeless.getHttp().post('/api/auth/team/team-invitation/resend', teamInvitationTeamResend, {
      headers: {
        'Team': this.$makeless.getSecurity().getTeam()!.id,
      },
    }).then((data) => {
      teamInvitation.state.responseResend = this.$makeless.getHttp().response(data);
      teamInvitation.state.isLoadingResend = false;
    }).catch((data) => {
      teamInvitation.state.responseResend = this.$makeless.getHttp().response(data.response);
      teamInvitation.state.isLoadingResend = false;
    });
  }

  deleteTeamInvitation(teamInvitation: TeamInvitation): void {
    teamInvitation.state.responseDelete = null;
    teamInvitation.state.responseResend = null;
    teamInvitation.state.isLoadingResend = false;
    teamInvitation.state.isLoadingDelete = true;

    const teamInvitationTeamDelete: TeamInvitationTeamDelete = Object.assign(new TeamInvitationTeamDelete(), {
      id: teamInvitation.id,
    });

    this.$makeless.getHttp().delete('/api/auth/team/team-invitation', {
      data: teamInvitationTeamDelete,
      headers: {
        'Team': this.$makeless.getSecurity().getTeam()!.id,
      },
    }).then((data) => {
      teamInvitation.state.responseDelete = this.$makeless.getHttp().response(data);
      this.removeTeamInvitation(teamInvitation);
      teamInvitation.state.isLoadingDelete = false;
    }).catch((data) => {
      teamInvitation.state.responseDelete = this.$makeless.getHttp().response(data.response);
      teamInvitation.state.isLoadingDelete = false;
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
