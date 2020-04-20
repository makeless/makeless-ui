<template>
    <div>
        <b-card no-body header="Settings">
            <b-list-group flush>
                <template v-if="!$saas.getSecurity().getTeam()">
                    <b-list-group-item :to="{name: 'profile'}">Profile</b-list-group-item>
                    <b-list-group-item href="#">Password</b-list-group-item>
                    <b-list-group-item :to="{name: 'teams'}">Teams</b-list-group-item>
                    <b-list-group-item href="#">Tokens</b-list-group-item>
                </template>
                <template v-else>
                    <b-list-group-item :to="{name: 'profile-team'}">Profile</b-list-group-item>
                    <b-list-group-item href="#">Team Members</b-list-group-item>
                    <b-list-group-item href="#">Tokens</b-list-group-item>
                </template>
            </b-list-group>
        </b-card>

        <b-card no-body header="Payment" class="mt-4">
            <b-list-group flush>
                <!--<b-list-group-item :to="{name: 'payment-method'}">Payment Method</b-list-group-item>-->
                <b-list-group-item href="#">Invoices</b-list-group-item>
            </b-list-group>
        </b-card>
    </div>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';

@Component
export default class SettingsNavigation extends Vue {
}
</script>
