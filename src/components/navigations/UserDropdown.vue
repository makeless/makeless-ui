<template>
    <b-nav-item-dropdown v-if="$saas.getSecurity().isAuth() && this.userLoaded" right>
        <template slot="button-content">{{ $saas.getSecurity().getDisplayName() }}</template>
        <b-dropdown-item @click="$saas.getSecurity().switchToUser()">
            {{ $saas.getSecurity().getUser().getName() }}
        </b-dropdown-item>
        <template v-if="$saas.getSecurity().getUser().hasTeams()">
            <b-dropdown-group :header="$saas.t('components.user-dropdown.teams')">
                <b-dropdown-item @click="$saas.getSecurity().switchToTeam(team.id)" v-for="team in $saas.getSecurity().getUser().teams" :key="team.name">
                    {{ team.name }}
                </b-dropdown-item>
            </b-dropdown-group>
        </template>
        <b-dropdown-divider></b-dropdown-divider>
        <b-dropdown-item :to="{name: toAccount}">{{ $saas.t('components.user-dropdown.account') }}</b-dropdown-item>
        <b-dropdown-item @click="logout">{{ $saas.t('components.user-dropdown.logout') }}</b-dropdown-item>
    </b-nav-item-dropdown>
</template>

<script lang="ts">
import {Component, Mixins} from 'vue-property-decorator';
import UserMixin from './../../mixins/User.vue';

@Component
export default class UserDropdown extends Mixins(UserMixin) {
  get toAccount(): string {
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
