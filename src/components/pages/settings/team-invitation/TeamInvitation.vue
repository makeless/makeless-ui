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

                        <div v-if="!$saas.getSecurity().getUser().teamUsers.length" class="text-center">
                            <b-col class="mt-2 mt-sm-5">
                                <b-icon :icon="icon" variant="primary" :font-scale="3"/>
                            </b-col>
                            <b-col class="mt-3 mt-sm-3">
                                <h2>{{ $saas.t('pages.team-invitation.noInvitations') }}</h2>
                            </b-col>
                        </div>

                        <div v-if="$saas.getSecurity().getUser().teamUsers.length">
                            <b-list-group>
                                <b-list-group-item class="d-flex justify-content-between align-items-center" v-for="teamUser in $saas.getSecurity().getUser().teamUsers" :key="teamUser.id">
                                    <div>
                                        {{ teamUser.team.name }}
                                    </div>
                                    <div>
                                        <b-button size="sm" variant="primary" class="mr-2" v-b-modal.team-leave @click="selectTeam(teamUser.team)">{{ $saas.t('pages.team-invitation.actions.accept') }}</b-button>
                                        <b-button size="sm" v-b-modal.team-delete @click="selectTeam(teamUser.team)">{{ $saas.t('pages.team-invitation.actions.decline') }}</b-button>
                                    </div>
                                </b-list-group-item>
                            </b-list-group>
                        </div>
                    </b-col>
                </b-row>
            </b-container>
        </template>

        <template slot="outside">
            <create-modal></create-modal>
            <delete-modal :team="selectedTeam"></delete-modal>
            <leave-modal :team="selectedTeam"></leave-modal>
        </template>
    </master>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import CreateModal from '../../../modals/settings/team/Create.vue';
import DeleteModal from '../../../modals/settings/team/Delete.vue';
import LeaveModal from '../../../modals/settings/team/Leave.vue';
import TeamModel from '../../../../models/team';

@Component({
  components: {
    CreateModal,
    DeleteModal,
    LeaveModal,
  },
})
export default class TeamInvitation extends Vue {
  public icon: string = 'box-seam';
  private selectedTeam: TeamModel | null = null;

  public selectTeam(team: TeamModel) {
    this.selectedTeam = team;
  }
}
</script>
