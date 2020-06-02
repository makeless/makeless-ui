<template>
    <b-navbar-nav v-if="leg">
        <div v-for="(item, index) in leg[this.$saas.getI18n().getLocale()]" :key="index">
            <b-nav-item v-if="!item.hasChildren() && show(item)" @click="to(item)">{{ item.getLabel() }}</b-nav-item>
            <b-nav-item-dropdown v-if="item.hasChildren() && showDropdown(item)">
                <template slot="button-content">{{ item.getLabel() }}</template>
                <div v-for="(children, index) in item.getChildren()" :key="index">
                    <b-dropdown-item v-if="show(children)" @click="to(children)">
                        {{ children.getLabel() }}
                    </b-dropdown-item>
                </div>
            </b-nav-item-dropdown>
        </div>
    </b-navbar-nav>
</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator';
import NavigationItemInterface from "../../packages/config/navigation-item";
import NavigationLegInterface from "../../packages/config/navigation-leg";

@Component
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

    return this.$saas.getSecurity().isPageAccessible(this.$saas.getPage(item.getTo()));
  }

  public showDropdown(item: NavigationItemInterface): boolean {
    if (!item.hasChildren()) {
      return false;
    }

    const children = item.getChildren();
    for (let i = 0; i < children!.length; i++) {
      if (this.show(children![i])) {
        return true;
      }
    }

    return false;
  }
}
</script>
