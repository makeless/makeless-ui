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
                        <div v-if="$saas.getSecurity().isAuth() && userLoaded">
                            <b-list-group v-if="$saas.getSecurity().isAuth() && userLoaded">
                                <b-list-group-item class="d-flex justify-content-between align-items-center" v-for="team in $saas.getSecurity().getUser().teams" :key="team.id">
                                    {{ team.name }}
                                    <b-button v-if="$saas.getSecurity().getUser().id === team.userId" size="sm" variant="danger" v-b-modal.team-delete @click="selectTeam(team)">{{ $saas.t('pages.team.actions.delete') }}</b-button>
                                    <b-button v-else size="sm" v-b-modal.team-leave @click="selectTeam(team)">{{ $saas.t('pages.team.actions.leave') }}</b-button>
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
import {Component, Mixins} from 'vue-property-decorator';
import SettingsNavigation from './../../../../components/navigations/SettingsNavigation.vue';
import CreateModal from './../../../../components/modals/settings/team/Create.vue';
import DeleteModal from './../../../../components/modals/settings/team/Delete.vue';
import LeaveModal from './../../../../components/modals/settings/team/Leave.vue';
import UserMixin from './../../../../mixins/User.vue';

@Component({
  components: {
    SettingsNavigation,
    CreateModal,
    DeleteModal,
    LeaveModal,
  },
})
export default class Team extends Mixins(UserMixin) {
  private selectedTeam: Team | null = null;

  public selectTeam(team: Team) {
    this.selectedTeam = team;
  }
}
</script>
