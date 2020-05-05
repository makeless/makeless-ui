<template>
    <div>
        <b-card no-body header="Settings">
            <b-list-group flush>
                <template v-if="!$saas.getSecurity().getTeam()">
                    <b-list-group-item :to="{name: 'profile'}" :active="isActive('profile')">Profile</b-list-group-item>
                    <b-list-group-item :to="{name: 'password'}" :active="isActive('password')">Password</b-list-group-item>
                    <b-list-group-item :to="{name: 'team'}" :active="isActive('team')">Teams</b-list-group-item>
                    <b-list-group-item :to="{name: 'token'}" :active="isActive('token')">Tokens</b-list-group-item>
                </template>
                <template v-else>
                    <b-list-group-item :to="{name: 'profile-team'}" :active="isActive('profile-team')">Profile</b-list-group-item>
                    <b-list-group-item :to="{name: 'member'}" :active="isActive('member')">Members</b-list-group-item>
                    <b-list-group-item href="#">Tokens</b-list-group-item>
                </template>
            </b-list-group>
        </b-card>
    </div>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';

@Component
export default class SettingsNavigation extends Vue {
  public isActive(name: string): boolean {
    return this.$saas.getRouter().getRouter().currentRoute.name === name;
  }
}
</script>
