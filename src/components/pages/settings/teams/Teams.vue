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
                            {{ $saas.t('pages.teams.title') }}
                            <b-button size="sm" variant="primary" v-b-modal.create>{{ $saas.t('pages.teams.actions.create') }}</b-button>
                        </h1>
                        <hr>
                        <div v-if="$saas.getSecurity().isAuth() && userLoaded">
                            <b-list-group v-if="$saas.getSecurity().isAuth() && userLoaded">
                                <b-list-group-item class="d-flex justify-content-between align-items-center" v-for="team in $saas.getSecurity().getUser().teams" :key="team.name">
                                    {{ team.name }}
                                    <b-button v-if="$saas.getSecurity().getUser().id === team.userId" size="sm" variant="danger">{{ $saas.t('pages.teams.actions.delete') }}</b-button>
                                    <b-button v-else size="sm">{{ $saas.t('pages.teams.actions.leave') }}</b-button>
                                </b-list-group-item>
                            </b-list-group>
                        </div>
                    </b-col>
                </b-row>
            </b-container>
        </template>

        <template slot="outside">
            <create-modal></create-modal>
        </template>
    </master>
</template>

<script lang="ts">
import {Component, Mixins} from 'vue-property-decorator';
import SettingsNavigation from './../../../../components/navigations/SettingsNavigation.vue';
import CreateModal from './../../../../components/modals/settings/teams/Create.vue';
import UserMixin from './../../../../mixins/User.vue';

@Component({
  components: {
    SettingsNavigation,
    CreateModal,
  },
})
export default class Teams extends Mixins(UserMixin) {
}
</script>
