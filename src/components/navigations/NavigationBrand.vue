<template>
    <b-navbar-brand :to="{name: 'home'}">
        <template v-if="$saas.getConfig().getConfiguration().getLogo()">
            <img :src="$saas.getConfig().getConfiguration().getLogo()" alt="logo">
        </template>
        <template v-else>{{ $saas.getConfig().getConfiguration().getName() }}</template>
    </b-navbar-brand>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';

@Component
export default class NavigationBrand extends Vue {
}
</script>
