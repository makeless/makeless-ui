<template>
    <b-navbar-brand :to="to">
        <template v-if="$saas.getConfig().getConfiguration().getLogo()">
            <img :src="$saas.getConfig().getConfiguration().getLogo()" alt="logo">
        </template>
        <template v-else>{{ $saas.getConfig().getConfiguration().getName() }}</template>
    </b-navbar-brand>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import {Location} from 'vue-router';

@Component
export default class NavigationBrand extends Vue {
  protected get to(): Location {
    if (this.$saas.getSecurity().isAuth()) {
      return {name: 'dashboard'};
    }

    return {name: 'home'};
  }
}
</script>
