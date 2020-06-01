<template>
    <b-navbar toggleable="lg" type="light" variant="light" class="mb-4">
        <navigation-brand></navigation-brand>
        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <b-collapse id="nav-collapse" is-nav>
            <navigation-leg :leg="$saas.getConfig().getConfiguration().getNavigation().getLeft()"></navigation-leg>

            <b-navbar-nav class="ml-auto">
                <navigation-leg :leg="$saas.getConfig().getConfiguration().getNavigation().getRight()"></navigation-leg>
                <user-dropdown></user-dropdown>
            </b-navbar-nav>
        </b-collapse>
    </b-navbar>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import UserDropdown from './../../components/navigations/UserDropdown.vue';
import NavigationLeg from "./NavigationLeg.vue";
import NavigationBrand from "./NavigationBrand.vue";

@Component({
  components: {NavigationBrand, NavigationLeg, UserDropdown},
})
export default class Navigation extends Vue {
}
</script>
