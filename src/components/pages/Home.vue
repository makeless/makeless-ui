<template>
    <master-component>
        <template slot="page">
            <h1>Home</h1>
        </template>
    </master-component>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import MasterComponent from '@/components/master/Master.vue';

@Component({
  components: {
    MasterComponent,
  },
})
export default class Home extends Vue {
}
</script>
