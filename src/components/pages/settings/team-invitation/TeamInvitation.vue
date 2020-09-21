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
                            <div v-if="!teamInvitations.length" class="text-center">
                                <b-col class="mt-2 mt-sm-5">
                                    <b-icon :icon="icon" variant="primary" :font-scale="3"/>
                                </b-col>
                                <b-col class="mt-3 mt-sm-3">
                                    <h2>{{ $saas.t('pages.team-invitation.noInvitations') }}</h2>
                                </b-col>
                            </div>

                            <b-list-group v-if="teamInvitations.length">
                                <b-list-group-item v-for="teamInvitation in teamInvitations" :key="teamInvitation.id">
                                    <b-row class="d-flex align-items-center">
                                        <b-col cols="7">
                                            <b-row>
                                                <b-col cols="12">{{ teamInvitation.team.name }}</b-col>
                                                <b-col cols="12"><small>{{ teamInvitation.user.name }}</small></b-col>
                                                <b-col cols="12" class="mt-2"><small>{{ `${$saas.t('pages.team-invitation.expire')} ${teamInvitation.expire.toLocaleString()}` }}</small></b-col>
                                            </b-row>
                                        </b-col>
                                        <b-col cols="5">
                                            <b-row class="text-right">
                                                <b-col>
                                                    <b-button size="sm" variant="primary" class="mr-0 mr-sm-2 mb-2 mb-sm-0">{{ $saas.t('pages.team-invitation.actions.accept') }}</b-button>
                                                    <b-button size="sm">{{ $saas.t('pages.team-invitation.actions.decline') }}</b-button>
                                                </b-col>
                                            </b-row>
                                        </b-col>
                                    </b-row>
                                </b-list-group-item>
                            </b-list-group>
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
        teamInvitation.expire = new Date(teamInvitation.expire);
        this.teamInvitations!.push(teamInvitation);
      });
    });
  }
}
</script>
