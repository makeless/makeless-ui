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
                <!--<b-nav-item :to="{name: 'register'}" v-show="!$saas.getSecurity().isAuth()">Register</b-nav-item>-->
                <user-dropdown></user-dropdown>
            </b-navbar-nav>
        </b-collapse>
    </b-navbar>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import UserDropdown from '@/components/navigation/UserDropdown.vue';

@Component({
  components: {UserDropdown},
})
export default class Navigation extends Vue {
}
</script>
