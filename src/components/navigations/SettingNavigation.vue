<template>
    <div>
        <b-card no-body :header="$makeless.t('components.navigations.settingNavigation.settings')" class="mb-3 mb-lg-0">
            <b-list-group flush>
                <template v-if="!$makeless.getSecurity().getTeam()">
                    <b-list-group-item v-if="isAccessible('profile')" :to="{name: 'profile'}" :active="isActive('profile')">{{ $makeless.t('components.navigations.settingNavigation.profile') }}</b-list-group-item>
                    <b-list-group-item v-if="isAccessible('password')" :to="{name: 'password'}" :active="isActive('password')">{{ $makeless.t('components.navigations.settingNavigation.password') }}</b-list-group-item>
                    <b-list-group-item v-if="isAccessible('team')" :to="{name: 'team'}" :active="isActive('team')">{{ $makeless.t('components.navigations.settingNavigation.teams') }}</b-list-group-item>
                    <b-list-group-item v-if="isAccessible('team-invitation')" :to="{name: 'team-invitation'}" :active="isActive('team-invitation')">{{ $makeless.t('components.navigations.settingNavigation.teamInvitations') }}</b-list-group-item>
                    <b-list-group-item v-if="isAccessible('token')" :to="{name: 'token'}" :active="isActive('token')">{{ $makeless.t('components.navigations.settingNavigation.tokens') }}</b-list-group-item>
                </template>
                <template v-else>
                    <b-list-group-item v-if="isAccessible('profile-team')" :to="{name: 'profile-team'}" :active="isActive('profile-team')">{{ $makeless.t('components.navigations.settingNavigation.profile') }}</b-list-group-item>
                    <b-list-group-item v-if="isAccessible('team-user-team')" :to="{name: 'team-user-team'}" :active="isActive('team-user-team')">{{ $makeless.t('components.navigations.settingNavigation.teamUsers') }}</b-list-group-item>
                    <b-list-group-item v-if="isAccessible('token-team')" :to="{name: 'token-team'}" :active="isActive('token-team')">{{ $makeless.t('components.navigations.settingNavigation.tokens') }}</b-list-group-item>
                    <b-list-group-item v-if="isAccessible('team-invitation-team')" :to="{name: 'team-invitation-team'}" :active="isActive('team-invitation-team')">{{ $makeless.t('components.navigations.settingNavigation.teamInvitationsTeam') }}</b-list-group-item>
                </template>
            </b-list-group>
        </b-card>
    </div>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';

@Component
export default class SettingNavigation extends Vue {
  isAccessible(name: string): boolean {
    return this.$makeless.getSecurity().isPageAccessible(this.$makeless.getPage(name))
  }

  public isActive(name: string): boolean {
    return this.$makeless.getRouter().getVueRouter().currentRoute.name === name;
  }
}
</script>
