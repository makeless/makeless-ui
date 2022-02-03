<template>
    <div id="app">
        <router-view></router-view>
    </div>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';

@Component({
  name: 'Makeless',
})
export default class Makeless extends Vue {
}
</script>
