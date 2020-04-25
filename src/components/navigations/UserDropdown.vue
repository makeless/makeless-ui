<template>
    <b-nav-item-dropdown :lazy="true" v-if="$saas.getSecurity().isAuth() && this.userLoaded" :text="$saas.getSecurity().getDisplayName()" right>
        <template v-if="$saas.getSecurity().getUser().teams.length > 0">
            <b-dropdown-item @click="$saas.getSecurity().switchToUser()">
                {{ $saas.getSecurity().getUser().getName() }}
            </b-dropdown-item>
            <b-dropdown-group header="Teams">
                <template v-if="$saas.getSecurity().getUser().hasTeams()">
                    <b-dropdown-item @click="$saas.getSecurity().switchToTeam(team.id)" v-for="team in $saas.getSecurity().getUser().teams" :key="team.name">
                        {{ team.name }}
                    </b-dropdown-item>
                </template>
            </b-dropdown-group>
            <b-dropdown-divider></b-dropdown-divider>
        </template>
        <b-dropdown-item :to="{name: toAccount}">Account</b-dropdown-item>
        <b-dropdown-item @click="logout">Logout</b-dropdown-item>
    </b-nav-item-dropdown>
</template>

<script lang="ts">
import {Component, Mixins} from 'vue-property-decorator';
import UserMixin from './../../mixins/User.vue';

@Component
export default class Navigation extends Mixins(UserMixin) {
  get toAccount(): string {
    if (this.$saas.getSecurity().getTeam()) {
      return 'profile-team';
    }

    return 'profile'
  }

  public logout() {
    this.$saas.getHttp().get('/api/auth/logout').then(() => {
      this.$saas.getSecurity().logout(true);
    }).catch(() => {
      this.$saas.getSecurity().logout(true);
    });
  }
}
</script>
