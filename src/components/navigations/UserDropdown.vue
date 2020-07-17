<template>
    <b-nav-item-dropdown v-if="$saas.getSecurity().isAuth() && this.userLoaded" right>
        <template slot="button-content">{{ $saas.getSecurity().getDisplayName() }}</template>
        <b-dropdown-item @click="$saas.getSecurity().switchToUser()" :active="$saas.getSecurity().getTeam() === null">
            {{ $saas.getSecurity().getUser().getName() }}
        </b-dropdown-item>
        <template v-if="$saas.getSecurity().getUser().hasTeams() && $saas.getConfig().getConfiguration().getTeams()">
            <b-dropdown-group :header="$saas.t('components.navigations.userDropdown.teams')">
                <b-dropdown-item @click="$saas.getSecurity().switchToTeam(teamUser.teamId)" v-for="teamUser in $saas.getSecurity().getUser().teamUsers" :key="teamUser.id" :active="$saas.getSecurity().getTeam() !== null && $saas.getSecurity().getTeam().id === teamUser.teamId">
                    {{ teamUser.team.name }}
                </b-dropdown-item>
            </b-dropdown-group>
        </template>
        <b-dropdown-divider></b-dropdown-divider>
        <b-dropdown-item v-if="showAccount" :to="{name: toAccount}">
            {{ $saas.t('components.navigations.userDropdown.account') }}
        </b-dropdown-item>
        <b-dropdown-item @click="logout">{{ $saas.t('components.navigations.userDropdown.logout') }}</b-dropdown-item>
    </b-nav-item-dropdown>
</template>

<script lang="ts">
import {Component, Mixins} from 'vue-property-decorator';
import UserMixin from './../../mixins/User.vue';

@Component
export default class UserDropdown extends Mixins(UserMixin) {
  public get showAccount(): boolean {
    return !this.$saas.getSecurity().getTeam() || this.$saas.getSecurity().isTeamOwner();
  }

  public get toAccount(): string {
    if (this.$saas.getSecurity().getTeam()) {
      return 'profile-team';
    }

    return 'profile';
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
