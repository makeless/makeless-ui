<template>
    <div>
        <b-card no-body :header="$saas.t('components.navigations.settingsNavigation.settings')" class="mb-3 mb-lg-0">
            <b-list-group flush>
                <template v-if="!$saas.getSecurity().getTeam()">
                    <b-list-group-item v-if="isAccessible('profile')" :to="{name: 'profile'}" :active="isActive('profile')">{{ $saas.t('components.navigations.settingsNavigation.profile') }}</b-list-group-item>
                    <b-list-group-item v-if="isAccessible('password')" :to="{name: 'password'}" :active="isActive('password')">{{ $saas.t('components.navigations.settingsNavigation.password') }}</b-list-group-item>
                    <b-list-group-item v-if="isAccessible('team')" :to="{name: 'team'}" :active="isActive('team')">{{ $saas.t('components.navigations.settingsNavigation.teams') }}</b-list-group-item>
                    <b-list-group-item v-if="isAccessible('invitation')" :to="{name: 'invitation'}" :active="isActive('invitation')">{{ $saas.t('components.navigations.settingsNavigation.invitations') }}</b-list-group-item>
                    <b-list-group-item v-if="isAccessible('token')" :to="{name: 'token'}" :active="isActive('token')">{{ $saas.t('components.navigations.settingsNavigation.tokens') }}</b-list-group-item>
                </template>
                <template v-else>
                    <b-list-group-item v-if="isAccessible('profile-team')" :to="{name: 'profile-team'}" :active="isActive('profile-team')">{{ $saas.t('components.navigations.settingsNavigation.profile') }}</b-list-group-item>
                    <b-list-group-item v-if="isAccessible('member-team')" :to="{name: 'member-team'}" :active="isActive('member-team')">{{ $saas.t('components.navigations.settingsNavigation.members') }}</b-list-group-item>
                    <b-list-group-item v-if="isAccessible('token-team')" :to="{name: 'token-team'}" :active="isActive('token-team')">{{ $saas.t('components.navigations.settingsNavigation.tokens') }}</b-list-group-item>
                </template>
            </b-list-group>
        </b-card>
    </div>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';

@Component
export default class SettingsNavigation extends Vue {
  isAccessible(name: string): boolean {
    return this.$saas.getSecurity().isPageAccessible(this.$saas.getPage(name))
  }

  public isActive(name: string): boolean {
    return this.$saas.getRouter().getVueRouter().currentRoute.name === name;
  }
}
</script>
