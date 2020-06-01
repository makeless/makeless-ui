<template>
    <b-navbar toggleable="lg" type="light" variant="light" class="mb-4">
        <b-navbar-brand :to="{name: 'home'}">
            <template v-if="$saas.getConfig().getConfiguration().getLogo()">
                <img :src="$saas.getConfig().getConfiguration().getLogo()" alt="logo">
            </template>
            <template v-else>{{ $saas.getConfig().getConfiguration().getName() }}</template>
        </b-navbar-brand>
        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <b-collapse id="nav-collapse" is-nav>
            <b-navbar-nav v-if="$saas.getConfig().getConfiguration().getNavigation().getLeft()">
                <div v-for="(item, index) in $saas.getConfig().getConfiguration().getNavigation().getLeft()[this.$saas.getI18n().getLocale()]" :key="index">
                    <b-nav-item v-if="!item.hasChildren()" @click="to(item)" :show="show(item)">{{ item.getLabel() }}</b-nav-item>
                    <b-nav-item-dropdown v-else>
                        <template slot="button-content">{{ item.getLabel() }}</template>
                        <b-dropdown-item v-for="(children, index) in item.getChildren()" :key="index" @click="to(children)" :show="show(children)">
                            {{ children.getLabel() }}
                        </b-dropdown-item>
                    </b-nav-item-dropdown>
                </div>
            </b-navbar-nav>

            <b-navbar-nav class="ml-auto">
                <template v-if="$saas.getConfig().getConfiguration().getNavigation().getRight()">
                    <div v-for="(item, index) in $saas.getConfig().getConfiguration().getNavigation().getRight()[this.$saas.getI18n().getLocale()]" :key="index">
                        <b-nav-item v-if="!item.hasChildren()" @click="to(item)" :show="show(item)">{{ item.getLabel() }}</b-nav-item>
                        <b-nav-item-dropdown v-else>
                            <template slot="button-content">{{ item.getLabel() }}</template>
                            <b-dropdown-item v-for="(children, index) in item.getChildren()" :key="index" @click="to(children)" :show="show(children)">
                                {{ children.getLabel() }}
                            </b-dropdown-item>
                        </b-nav-item-dropdown>
                    </div>
                </template>
                <user-dropdown></user-dropdown>
            </b-navbar-nav>
        </b-collapse>
    </b-navbar>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import UserDropdown from './../../components/navigations/UserDropdown.vue';
import NavigationItemInterface from "../../packages/config/navigation-item";

@Component({
  components: {UserDropdown},
})
export default class Navigation extends Vue {
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
