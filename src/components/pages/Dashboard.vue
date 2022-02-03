<template>
    <master>
        <template slot="page">
            <b-container>
                <b-row>
                    <b-col>
                        <div>
                            <h1>{{ $makeless.t('pages.dashboard.title') }}</h1>
                            <h2 v-if="$makeless.getSecurity().isAuth()">{{ $makeless.getSecurity().getDisplayName() }}</h2>
                        </div>
                    </b-col>
                </b-row>
            </b-container>
        </template>
    </master>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';

@Component({
  name: 'Dashboard',
})
export default class Dashboard extends Vue {
}
</script>
