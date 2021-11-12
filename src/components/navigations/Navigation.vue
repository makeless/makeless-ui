<template>
    <b-navbar id="navbar" toggleable="lg" type="light" variant="light" class="mb-4">
        <navigation-brand></navigation-brand>
        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <b-collapse id="nav-collapse" is-nav>
            <navigation-leg :leg="$makeless.getConfig().getConfiguration().getNavigation().getLeft()"></navigation-leg>

            <navigation-leg :leg="$makeless.getConfig().getConfiguration().getNavigation().getRight()">
                <template v-slot:after>
                    <user-dropdown v-if="this.$makeless.getSecurity().isAuth()"></user-dropdown>
                </template>
            </navigation-leg>
        </b-collapse>
    </b-navbar>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import NavigationLeg from './NavigationLeg.vue';
import NavigationBrand from './NavigationBrand.vue';

@Component({
  components: {NavigationBrand, NavigationLeg},
})
export default class Navigation extends Vue {
}
</script>
