<template>
    <master>
        <template slot="page">
            <b-container>
                <b-row>
                    <b-col>
                        <div>
                            <h1>Dashboard</h1>
                            <h2 v-if="$saas.getSecurity().isAuth()">{{ $saas.getSecurity().getDisplayName() }}</h2>
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
export default class Dashboard extends Vue {
}
</script>
