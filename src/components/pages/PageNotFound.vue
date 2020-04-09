<template>
    <master>
        <template slot="page">
            <b-container>
                <b-row>
                    <b-col>
                        <div>
                            <h1>Page not found</h1>
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
export default class PageNotFound extends Vue {
}
</script>
