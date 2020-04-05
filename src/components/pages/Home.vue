<template>
    <master>
        <template slot="page">
            <b-container>
                <b-row>
                    <b-col>
                        <div class="text-center">
                            <h1>{{ $saas.getName() }}</h1>
                            <a href="https://github.com/loeffel-io/go-saas" target="_blank">GitHub</a>
                        </div>
                    </b-col>
                </b-row>
            </b-container>
        </template>
    </master>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';

@Component({})
export default class Home extends Vue {
}
</script>

<style lang="scss" scoped>
    h1 {
        font-size: 28px;
    }
</style>
