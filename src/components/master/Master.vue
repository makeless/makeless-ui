<template>
    <div>
        <div id="navigation">navigation</div>
        <slot name="page"></slot>
        <slot name="outside"></slot>
        <div id="footer">footer</div>
    </div>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';

@Component
export default class Master extends Vue {
}
</script>
