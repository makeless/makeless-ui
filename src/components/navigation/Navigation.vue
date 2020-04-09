<template>
    <b-navbar toggleable="lg" type="light" variant="light" class="mb-4">
        <b-navbar-brand :to="{name: 'home'}">{{ $saas.getName() }}</b-navbar-brand>
        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <b-collapse id="nav-collapse" is-nav>
            <b-navbar-nav>
                <b-nav-item :to="{name: 'dashboard'}" v-show="$saas.getSecurity().isAuth()">Dashboard</b-nav-item>
            </b-navbar-nav>

            <b-navbar-nav class="ml-auto">
                <b-nav-item :to="{name: 'login'}" v-show="!$saas.getSecurity().isAuth()">Login</b-nav-item>
                <b-nav-item :to="{name: 'register'}" v-show="!$saas.getSecurity().isAuth()">Register</b-nav-item>
                <b-nav-item-dropdown text="Lucas Löffel" right v-show="$saas.getSecurity().isAuth()">
                    <b-dropdown-item :to="{name: 'payment-method'}">Settings</b-dropdown-item>
                    <b-dropdown-item @click="logout">Logout</b-dropdown-item>
                </b-nav-item-dropdown>
            </b-navbar-nav>
        </b-collapse>
    </b-navbar>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';

@Component
export default class Navigation extends Vue {
  logout() {
    this.$saas.getHttp().get('/api/auth/logout').then(() => {
      this.$saas.getSecurity().logout();
    }).catch(() => {
      this.$saas.getSecurity().logout();
    });
  }
}
</script>
