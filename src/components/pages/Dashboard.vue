<template>
    <master>
        <template slot="page">
            <b-container>
                <b-row>
                    <b-col>
                        <div>
                            <h1>Dashboard</h1>
                            <h2 v-if="userLoaded">{{ $saas.getSecurity().getAccount().name }}</h2>
                        </div>
                    </b-col>
                </b-row>
            </b-container>
        </template>
    </master>
</template>

<script lang="ts">
import {Component, Mixins} from 'vue-property-decorator';
import UserMixin from '@/mixins/User.vue';

@Component({})
export default class Dashboard extends Mixins(UserMixin) {
}
</script>
