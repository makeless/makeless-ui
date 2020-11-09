<template>
    <div>
        <div v-for="(navigation, index) in getSettingsNavigation($makeless.getI18n().getLocale())" :key="index">
            <b-card no-body :header="navigation.getTitle()" class="mb-3 mb-lg-0">
                <b-list-group flush>
                    <b-list-group-item v-for="(item, index) in navigation.getItems()" :key="index" v-if="isAccessible(item.getTo())" :to="{name: item.getTo()}" :active="isActive(item.getTo())">{{ item.getLabel() }}</b-list-group-item>
                </b-list-group>
            </b-card>
        </div>
    </div>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import SettingNavigationInterface from '../../packages/config/setting-navigation';

@Component
export default class SettingNavigation extends Vue {
  isAccessible(name: string): boolean {
    return this.$makeless.getSecurity().isPageAccessible(this.$makeless.getPage(name));
  }

  public isActive(name: string): boolean {
    return this.$makeless.getRouter().getVueRouter().currentRoute.name === name;
  }

  public getSettingsNavigation(locale: string): SettingNavigationInterface[] {
    if (this.$makeless.getSecurity().getTeam()) {
      return this.$makeless.getConfig().getConfiguration().getTeams()!.getSettingsNavigation()[locale];
    }

    return this.$makeless.getConfig().getConfiguration().getSettingsNavigation()[locale];
  }
}
</script>
