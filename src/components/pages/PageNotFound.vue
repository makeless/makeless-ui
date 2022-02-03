<template>
    <master>
        <template slot="page">
            <b-container>
                <b-row>
                    <b-col>
                        <div>
                            <h1>{{ $makeless.t('pages.page-not-found.title') }}</h1>
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
  name: 'PageNotFound',
})
export default class PageNotFound extends Vue {
}
</script>
