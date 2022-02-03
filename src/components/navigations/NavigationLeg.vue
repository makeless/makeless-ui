<template>
    <b-navbar-nav v-if="leg">
        <slot name="before"></slot>
        <template v-for="(item, index) in leg[this.$makeless.getI18n().getLocale()]">
            <b-nav-item v-if="!item.hasChildren() && show(item)" @click="to(item)" :active="active(item)" :key="`nav-item-${index}`">{{ item.getLabel() }}</b-nav-item>
            <b-nav-item-dropdown v-if="item.hasChildren() && showDropdown(item)" :key="`nav-item-dropdown-${index}`">
                <template slot="button-content">{{ item.getLabel() }}</template>
                <template v-for="(children, index) in item.getChildren()">
                    <b-dropdown-item v-if="show(children)" @click="to(children)" :key="`nav-item-dropdown-item-${index}`">
                        {{ children.getLabel() }}
                    </b-dropdown-item>
                </template>
            </b-nav-item-dropdown>
        </template>
        <slot name="after"></slot>
    </b-navbar-nav>
</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator';
import NavigationItemInterface from '../../packages/config/navigation-item';
import NavigationLegInterface from '../../packages/config/navigation-leg';

@Component({
  name: 'NavigationLeg',
})
export default class NavigationLeg extends Vue {
  @Prop(Object) leg!: NavigationLegInterface;

  private active(item: NavigationItemInterface): boolean {
    if (item.isExternal()) {
      return false;
    }

    return this.$route.name === item.to;
  }

  public to(item: NavigationItemInterface): void {
    if (item.isExternal()) {
      window.open(item.getTo(), '_blank');
      return;
    }

    this.$makeless.getRouter().redirectToName(item.getTo());
  }

  public show(item: NavigationItemInterface): boolean {
    if (item.isExternal()) {
      return true;
    }

    return this.$makeless.getSecurity().isPageAccessible(this.$makeless.getPage(item.getTo()));
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
