<template>
    <b-nav-item-dropdown right>
        <template slot="button-content">{{ $makeless.getSecurity().getDisplayName() }}</template>
        <b-dropdown-item @click="$makeless.getSecurity().switchToUser()" :active="$makeless.getSecurity().getTeam() === null">
            {{ $makeless.getSecurity().getUser().getName() }}
        </b-dropdown-item>
        <template v-if="$makeless.getSecurity().getUser().hasTeams() && $makeless.getConfig().getConfiguration().getTeams()">
            <b-dropdown-group :header="$makeless.t('components.navigations.userDropdown.teams')">
                <b-dropdown-item @click="$makeless.getSecurity().switchToTeam(teamUser.teamId)" v-for="teamUser in $makeless.getSecurity().getUser().teamUsers" :key="teamUser.id" :active="$makeless.getSecurity().getTeam() !== null && $makeless.getSecurity().getTeam().id === teamUser.teamId">
                    {{ teamUser.team.name }}
                </b-dropdown-item>
            </b-dropdown-group>
        </template>
        <b-dropdown-divider></b-dropdown-divider>
        <b-dropdown-item v-if="isTeamOwner()" :to="{name: toAccount}">
            {{ $makeless.t('components.navigations.userDropdown.settings') }}
        </b-dropdown-item>
        <b-dropdown-item v-if="!$makeless.getSecurity().getTeam()" :to="{name: toAccount}">
            {{ $makeless.t('components.navigations.userDropdown.account') }}
        </b-dropdown-item>
        <b-dropdown-item @click="logout">{{ $makeless.t('components.navigations.userDropdown.logout') }}</b-dropdown-item>
    </b-nav-item-dropdown>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import {TeamRole} from '../../enums/team-role';

@Component({
  name: 'UserDropdown',
})
export default class UserDropdown extends Vue {
  isTeamOwner(): boolean {
    return this.$makeless.getSecurity().isTeamRole(TeamRole.Owner);
  }

  public get toAccount(): string {
    if (this.$makeless.getSecurity().getTeam()) {
      return 'profile-team';
    }

    return 'profile';
  }

  public logout() {
    this.$makeless.getHttp().get('/api/auth/logout').then(() => {
      this.$makeless.getSecurity().logout(true);
    }).catch(() => {
      this.$makeless.getSecurity().logout(true);
    });
  }
}
</script>
