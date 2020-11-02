<template>
    <master>
        <template slot="page">
            <b-container>
                <b-row>
                    <b-col>
                        <div class="text-center">
                            <h1>{{ $makeless.getConfig().getConfiguration().getName() }}</h1>
                            <h2>SaaS Framework</h2>
                            <a href="https://github.com/makeless/makeless" target="_blank">
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
