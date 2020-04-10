<template>
    <b-nav-item-dropdown :lazy="true" v-if="show" :text="$saas.getSecurity().getAccount().name" right>
        <b-dropdown-group id="dropdown-group-1" header="Accounts">
            <b-dropdown-item :to="{name: 'dashboard'}" active>
                {{ $saas.getSecurity().getAccount().name }}
            </b-dropdown-item>
            <template v-if="$saas.getSecurity().getUser().teams !== null">
                <b-dropdown-item :to="{name: 'dashboard'}" v-for="team in $saas.getSecurity().getUser().teams" :key="team.name">
                    {{ team.name }}
                </b-dropdown-item>
            </template>
        </b-dropdown-group>
        <b-dropdown-divider></b-dropdown-divider>
        <b-dropdown-item :to="{name: 'payment-method'}">Account</b-dropdown-item>
        <b-dropdown-item @click="logout">Logout</b-dropdown-item>
    </b-nav-item-dropdown>
</template>

<script lang="ts">
import {Component, Mixins} from 'vue-property-decorator';
import UserMixin from '@/mixins/User.vue';

@Component
export default class Navigation extends Mixins(UserMixin) {
  get show() {
    return this.$saas.getSecurity().isAuth() && this.userLoaded;
  }

  logout() {
    this.$saas.getHttp().get('/api/auth/logout').then(() => {
      this.$saas.getSecurity().logout(true);
    }).catch(() => {
      this.$saas.getSecurity().logout(true);
    });
  }
}
</script>
