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
                            Teams
                            <b-button size="sm">Create</b-button>
                        </h1>
                        <hr>
                        <div v-if="$saas.getSecurity().isAuth() && userLoaded">
                            <b-list-group v-if="$saas.getSecurity().isAuth() && userLoaded">
                                <b-list-group-item class="d-flex justify-content-between align-items-center" v-for="team in $saas.getSecurity().getUser().teams" :key="team.name">
                                    {{ team.name }}
                                    <b-button v-if="$saas.getSecurity().getUser().id === team.userId" size="sm" variant="danger">Delete</b-button>
                                    <b-button v-else size="sm">Leave</b-button>
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
import {Component, Mixins} from 'vue-property-decorator';
import SettingsNavigation from '@/components/navigation/SettingsNavigation.vue';
import UserMixin from '@/mixins/User.vue';

@Component({
  components: {
    SettingsNavigation,
  },
})
export default class Profile extends Mixins(UserMixin) {
}
</script>
