<template>
    <master>
        <template slot="page">
            <b-container>
                <b-row>
                    <b-col lg="3">
                        <setting-navigation></setting-navigation>
                    </b-col>

                    <b-col lg="9">
                        <h1 class="d-flex justify-content-between align-items-center">
                            {{ $makeless.t('pages.team.title') }}
                            <b-button size="sm" variant="primary" v-b-modal.team-create>{{ $makeless.t('pages.team.actions.create') }}</b-button>
                        </h1>
                        <hr>

                        <div v-if="!$makeless.getSecurity().getUser().teamUsers.length" class="text-center">
                            <div class="mt-2 mt-sm-5">
                                <b-icon :icon="icon" variant="primary" :font-scale="3"/>
                            </div>
                            <div class="mt-3 mt-sm-3">
                                <h2>{{ $makeless.t('pages.team.noTeam') }}</h2>
                            </div>
                            <div class="mt-4 mt-sm-4">
                                <b-button size="sm" variant="primary" v-b-modal.team-create>{{ $makeless.t('pages.team.actions.createNewTeam') }}</b-button>
                            </div>
                        </div>

                        <div v-if="$makeless.getSecurity().getUser().teamUsers.length">
                            <b-list-group>
                                <b-list-group-item class="d-flex justify-content-between align-items-center" v-for="teamUser in $makeless.getSecurity().getUser().teamUsers" :key="teamUser.id">
                                    {{ teamUser.team.name }}
                                    <b-button v-if="$makeless.getSecurity().getUser().id === teamUser.team.userId" size="sm" variant="danger" v-b-modal.team-delete @click="selectTeam(teamUser.team)">{{ $makeless.t('pages.team.actions.delete') }}</b-button>
                                    <b-button v-else size="sm" v-b-modal.team-leave @click="selectTeam(teamUser.team)">{{ $makeless.t('pages.team.actions.leave') }}</b-button>
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
  name: 'Team',
  components: {
    CreateModal,
    DeleteModal,
    LeaveModal,
  },
})
export default class Team extends Vue {
  public icon: string = 'people';
  private selectedTeam: TeamModel | null = null;

  public selectTeam(team: TeamModel) {
    this.selectedTeam = team;
  }
}
</script>
