<template>
    <b-navbar toggleable="lg" type="light" variant="light" class="mb-4">
        <b-navbar-brand to="/">{{ $saas.getName() }}</b-navbar-brand>
        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <b-collapse id="nav-collapse" is-nav>
            <b-navbar-nav class="ml-auto">
                <b-nav-item to="/login">Login</b-nav-item>
                <b-nav-item to="register">Register</b-nav-item>
            </b-navbar-nav>
        </b-collapse>
    </b-navbar>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';

@Component
export default class Navigation extends Vue {
}
</script>
