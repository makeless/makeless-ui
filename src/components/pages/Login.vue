<template>
    <master>
        <template slot="page">
            <b-container>
                <b-row class="justify-content-md-center">
                    <b-col lg="6">
                        <b-card title="Login">
                            <b-form>
                                <b-form-group
                                        label="Email"
                                        label-for="email"
                                >
                                    <b-form-input
                                            id="email"
                                            v-model="test"
                                            type="email"
                                            required
                                            placeholder="Email"
                                    ></b-form-input>
                                </b-form-group>

                                <b-form-group
                                        label="Password"
                                        label-for="password"
                                >
                                    <b-form-input
                                            id="password"
                                            v-model="test"
                                            type="password"
                                            required
                                            placeholder="Password"
                                    ></b-form-input>
                                </b-form-group>

                                <b-button href="#" variant="primary">Login</b-button>
                            </b-form>
                        </b-card>
                    </b-col>
                </b-row>
            </b-container>
        </template>
    </master>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';

@Component({})
export default class Login extends Vue {
  test: string | null = null;

  mounted() {
    console.log(this.$saas);
  }
}
</script>
