<template>
    <div>
        <b-card no-body header="Settings">
            <b-list-group flush>
                <b-list-group-item href="#">Profile</b-list-group-item>
                <b-list-group-item href="#">Password</b-list-group-item>
                <b-list-group-item href="#">Tokens</b-list-group-item>
            </b-list-group>
        </b-card>

        <b-card no-body header="Payment" class="mt-4">
            <b-list-group flush>
                <b-list-group-item :to="{name: 'payment-method'}">Payment Method</b-list-group-item>
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
