<template>
    <master>
        <template slot="page">
            <b-container>
                <b-row>
                    <b-col lg="3">
                        <settings-navigation></settings-navigation>
                    </b-col>

                    <b-col lg="9">
                        <h1>
                            {{ $saas.t('pages.team-invitation.title') }}
                        </h1>
                        <hr>

                        <div v-if="!teamInvitations.length" class="text-center">
                            <b-col class="mt-2 mt-sm-5">
                                <b-icon :icon="icon" variant="primary" :font-scale="3"/>
                            </b-col>
                            <b-col class="mt-3 mt-sm-3">
                                <h2>{{ $saas.t('pages.team-invitation.noInvitations') }}</h2>
                            </b-col>
                        </div>

                        <div v-if="teamInvitations.length">
                            <b-list-group>
                                <b-list-group-item class="d-flex justify-content-between align-items-center" v-for="teamInvitation in teamInvitations" :key="teamInvitation.id">
                                    <div>
                                        <b-col class="pl-0">{{ teamInvitation.team.name }}</b-col>
                                        <b-col class="pl-0"><small>{{ teamInvitation.user.name }}</small></b-col>
                                        <b-col class="pl-0">
                                            <small>{{ $saas.t('pages.team-invitation.expiresOn') }}</small>
                                            <small>{{ teamInvitation.expire.toLocaleString('en-US', dateFormat) }}</small></b-col>
                                    </div>
                                    <div>
                                        <b-button size="sm" variant="primary" class="mr-2">{{ $saas.t('pages.team-invitation.actions.accept') }}</b-button>
                                        <b-button size="sm">{{ $saas.t('pages.team-invitation.actions.decline') }}</b-button>
                                    </div>
                                </b-list-group-item>
                            </b-list-group>
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
  private dateFormat: DateTimeFormatOptions = {
    weekday: 'long',
    month: 'long',
    day: '2-digit',
    year: 'numeric',
  };

  created() {
    this.loadTeamInvitations();
  }

  loadTeamInvitations(): void {
    this.$saas.getHttp().get('/api/auth/team-invitation').then((data) => {
      this.teamInvitations = [];
      this.response = this.$saas.getHttp().response(data);
      this.response.getData().data.forEach((teamInvitation: TeamInvitationModel) => {
        console.log(teamInvitation.expire = new Date());
        this.teamInvitations!.push(teamInvitation);
      });
    });
  }
}
</script>
