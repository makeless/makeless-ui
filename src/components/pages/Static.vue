<template>
    <master>
        <template slot="page">
            <b-container>
                <b-row>
                    <b-col>
                        Static page
                    </b-col>
                </b-row>
            </b-container>
        </template>
    </master>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';

@Component({})
export default class Static extends Vue {
  mounted() {
    console.log(this);
  }
}
</script>
