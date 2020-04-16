<template>
    <master>
        <template slot="page">
            <b-container>
                <b-row>
                    <b-col lg="3">
                        <settings-navigation></settings-navigation>
                    </b-col>

                    <b-col lg="9">
                        right
                    </b-col>
                </b-row>
            </b-container>
        </template>
    </master>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import SettingsNavigation from '@/components/navigation/SettingsNavigation.vue';

@Component({
  components: {
    SettingsNavigation,
  },
})
export default class PaymentMethod extends Vue {
}
</script>
