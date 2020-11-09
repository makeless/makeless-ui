<template>
    <div>
        <div v-for="navigation in $makeless.getConfig().getConfiguration().getSettingsNavigation()[$makeless.getI18n().getLocale()]">
            <b-card no-body :header="navigation.getTitle()" class="mb-3 mb-lg-0">
                <b-list-group flush>
                    <template v-for="item in navigation.getItems()">
                        <b-list-group-item v-if="isAccessible(item.getTo())" :to="{name: item.getTo()}" :active="isActive(item.getTo())">{{ item.getLabel() }}</b-list-group-item>
                    </template>
                </b-list-group>
            </b-card>
        </div>
    </div>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';

@Component
export default class SettingNavigation extends Vue {
  isAccessible(name: string): boolean {
    return this.$makeless.getSecurity().isPageAccessible(this.$makeless.getPage(name));
  }

  public isActive(name: string): boolean {
    return this.$makeless.getRouter().getVueRouter().currentRoute.name === name;
  }
}
</script>
