<template>
    <b-navbar toggleable="lg" type="light" variant="light" class="mb-4">
        <b-navbar-brand to="/">{{ $saas.getName() }}</b-navbar-brand>
        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <b-collapse id="nav-collapse" is-nav>
            <b-navbar-nav class="ml-auto">
                <b-nav-item to="login" v-show="!$saas.getSecurity().isAuth()">Login</b-nav-item>
                <b-nav-item to="register" v-show="!$saas.getSecurity().isAuth()">Register</b-nav-item>
                <b-nav-item to="dashboard" v-show="$saas.getSecurity().isAuth()">Dashboard</b-nav-item>
                <b-nav-item to="logout" v-show="$saas.getSecurity().isAuth()" @click="logout">Logout</b-nav-item>
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
