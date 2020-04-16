<template>
    <master>
        <template slot="page">
            <b-container>
                <b-row>
                    <b-col lg="3">
                        <settings-navigation></settings-navigation>
                    </b-col>

                    <b-col lg="9">
                        <h1>Profile</h1>
                        <hr>
                        <b-form v-if="$saas.getSecurity().isAuth() && this.userLoaded" @submit="onSubmit">
                            <b-form-group label="Name" label-for="name">
                                <b-form-input v-if="!$saas.getSecurity().getTeam()" id="name" v-model="$saas.getSecurity().getUser().name" type="text" required placeholder="Name"></b-form-input>
                                <b-form-input v-else id="name" v-model="$saas.getSecurity().getTeam().name" type="text" required placeholder="Name"></b-form-input>
                            </b-form-group>

                            <b-button type="submit" variant="primary">Update profile</b-button>
                        </b-form>
                    </b-col>
                </b-row>
            </b-container>
        </template>
    </master>
</template>

<script lang="ts">
import {Component, Mixins} from 'vue-property-decorator';
import SettingsNavigation from '@/components/navigation/SettingsNavigation.vue';
import UserMixin from '@/mixins/User.vue';

@Component({
  components: {
    SettingsNavigation,
  },
})
export default class Profile extends Mixins(UserMixin) {
  onSubmit($event: Event) {
    $event.preventDefault();
  }
}
</script>
