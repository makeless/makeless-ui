<template>
    <div class="mb-5">
        <navigation></navigation>
        <slot name="page"></slot>
        <slot name="outside"></slot>
    </div>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import Navigation from './../../components/navigations/Navigation.vue';

@Component({
  components: {Navigation},
})
export default class Master extends Vue {
}
</script>
