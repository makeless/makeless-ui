<template>
    <master>
        <template slot="page">
            <b-container>
                <b-row>
                    <b-col>
                        <div class="text-center">
                            <h1>{{ $saas.getName() }}</h1>
                            <h2>Extendable SaaS Packages</h2>
                            <a href="https://github.com/loeffel-io/go-saas" target="_blank">
                                <b-icon-link45deg></b-icon-link45deg>
                                GitHub
                            </a>
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

    h2 {
        font-weight: normal;
        font-size: 20px;
    }
</style>
