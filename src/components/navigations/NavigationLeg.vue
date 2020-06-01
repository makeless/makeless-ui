<template>
    <b-navbar-nav v-if="leg">
        <div v-for="(item, index) in leg[this.$saas.getI18n().getLocale()]" :key="index">
            <b-nav-item v-if="!item.hasChildren()" @click="to(item)" :show="show(item)">{{ item.getLabel() }}</b-nav-item>
            <b-nav-item-dropdown v-else>
                <template slot="button-content">{{ item.getLabel() }}</template>
                <b-dropdown-item v-for="(children, index) in item.getChildren()" :key="index" @click="to(children)" :show="show(children)">
                    {{ children.getLabel() }}
                </b-dropdown-item>
            </b-nav-item-dropdown>
        </div>
    </b-navbar-nav>
</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator';
import UserDropdown from './../../components/navigations/UserDropdown.vue';
import NavigationItemInterface from "../../packages/config/navigation-item";
import NavigationLegInterface from "../../packages/config/navigation-leg";

@Component({
  components: {UserDropdown},
})
export default class NavigationLeg extends Vue {
  @Prop(Object) leg!: NavigationLegInterface;

  public to(item: NavigationItemInterface): void {
    if (item.isExternal()) {
      window.open(item.getTo(), '_blank');
      return;
    }

    this.$saas.getRouter().redirect(item.getTo());
  }

  public show(item: NavigationItemInterface): boolean {
    if (item.isExternal()) {
      return true;
    }

    const page = this.$saas.getPage(item.to);

    if (page.meta === null) {
      return true;
    }

    if (page.meta.requiresAuth !== undefined && page.meta.requiresAuth && !this.$saas.getSecurity().isAuth()) {
      return false;
    }

    return !(page.meta.guest !== undefined && page.meta.guest && this.$saas.getSecurity().isAuth());
  }
}
</script>
