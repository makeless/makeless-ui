<template>
    <b-navbar-brand :to="to">
        <template v-if="$makeless.getConfig().getConfiguration().getLogo()">
            <img :src="$makeless.getConfig().getConfiguration().getLogo()" alt="logo">
        </template>
        <template v-else>{{ $makeless.getConfig().getConfiguration().getName() }}</template>
    </b-navbar-brand>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import {Location} from 'vue-router';

@Component
export default class NavigationBrand extends Vue {
  protected get to(): Location {
    if (this.$makeless.getSecurity().isAuth()) {
      return {name: 'dashboard'};
    }

    return {name: 'home'};
  }
}
</script>
