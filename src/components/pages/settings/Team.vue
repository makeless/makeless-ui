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
                            {{ $saas.t('pages.team.title') }}
                            <b-button size="sm" variant="primary" v-b-modal.team-create>{{ $saas.t('pages.team.actions.create') }}</b-button>
                        </h1>
                        <hr>

                        <div v-if="!$saas.getSecurity().getUser().teamUsers.length">
                            <b-row class="mt-5">
                                <b-col class="d-flex justify-content-center">
                                    <b-icon-people-fill variant="primary" :font-scale="3"/>
                                </b-col>
                            </b-row>
                            <b-row class="mt-3">
                                <b-col class="d-flex justify-content-center">
                                    <h2>{{ $saas.t('pages.team.noTeam') }}</h2>
                                </b-col>
                            </b-row>
                            <b-row class="mt-4">
                                <b-col class="d-flex justify-content-center">
                                    <b-button size="sm" variant="primary" v-b-modal.team-create>{{ $saas.t('pages.team.actions.create') }}</b-button>
                                </b-col>
                            </b-row>
                        </div>

                        <div v-if="$saas.getSecurity().getUser().teamUsers.length">
                            <b-list-group>
                                <b-list-group-item class="d-flex justify-content-between align-items-center" v-for="teamUser in $saas.getSecurity().getUser().teamUsers" :key="teamUser.id">
                                    {{ teamUser.team.name }}
                                    <b-button v-if="$saas.getSecurity().getUser().id === teamUser.team.userId" size="sm" variant="danger" v-b-modal.team-delete @click="selectTeam(teamUser.team)">{{ $saas.t('pages.team.actions.delete') }}</b-button>
                                    <b-button v-else size="sm" v-b-modal.team-leave @click="selectTeam(teamUser.team)">{{ $saas.t('pages.team.actions.leave') }}</b-button>
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
import CreateModal from './../../../components/modals/settings/team/Create.vue';
import DeleteModal from './../../../components/modals/settings/team/Delete.vue';
import LeaveModal from './../../../components/modals/settings/team/Leave.vue';
import TeamModel from '../../../models/team';

@Component({
  components: {
    CreateModal,
    DeleteModal,
    LeaveModal,
  },
})
export default class Team extends Vue {
  private selectedTeam: TeamModel | null = null;

  public selectTeam(team: TeamModel) {
    this.selectedTeam = team;
  }
}
</script>
