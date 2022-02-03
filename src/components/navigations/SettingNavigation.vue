<template>
    <div>
        <b-card no-body v-for="(navigation, index) in getSettingsNavigation($makeless.getI18n().getLocale())" :key="index" :header="navigation.getTitle()" class="mb-3">
            <b-list-group flush>
                <template v-for="(item, index) in navigation.getItems()">
                    <b-list-group-item v-if="isAccessible(item.getTo())" :key="index" :to="{name: item.getTo()}" :active="isActive(item.getTo())">{{ item.getLabel() }}</b-list-group-item>
                </template>
            </b-list-group>
        </b-card>
    </div>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import SettingNavigationInterface from '../../packages/config/setting-navigation';

@Component({
  name: 'SettingNavigation',
})
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
