<template>
    <master>
        <template slot="page">
            <b-container>
                <b-row class="justify-content-md-center">
                    <b-col lg="6">
                        <b-card class="text-center">
                            <div v-if="response">
                                <template v-if="response && response.getCode() === 200">
                                    <b-col class="mt-2 mt-sm-3">
                                        <b-icon :icon="iconVerifySuccess" variant="primary" :font-scale="3"/>
                                    </b-col>

                                    <b-col class="mt-3">
                                        <h2>{{ $saas.t('pages.email-verification.response.errors.2x') }}</h2>
                                    </b-col>

                                    <b-col class="mt-4">
                                        <b-button variant="primary" :to="{name: 'login'}" size="sm">
                                            {{ $saas.t('pages.email-verification.button.login') }}
                                        </b-button>
                                    </b-col>
                                </template>

                                <template v-if="response && response.getCode() >= 400">
                                    <b-col class="mt-2 mt-sm-3">
                                        <b-icon class="text-danger" :icon="iconVerifyFailed" :font-scale="3"/>
                                    </b-col>

                                    <b-col v-if="response.getCode() >= 400 && response.getCode() < 500" class="mt-3">
                                        <h2>{{ $saas.t('pages.email-verification.response.errors.4x') }}</h2>
                                    </b-col>

                                    <b-col v-if="response.getCode() >= 500" class="mt-3">
                                        <h2>{{ $saas.t('pages.email-verification.response.errors.5x') }}</h2>
                                    </b-col>

                                    <b-col class="mt-4">
                                        <b-button size="sm" @click="verifyEmailVerification()">
                                            <span>{{ $saas.t('pages.email-verification.button.verify') }}</span>
                                        </b-button>
                                    </b-col>
                                </template>
                            </div>
                            <div v-else>
                                <b-spinner :label="$saas.t('pages.email-verification.loading')"></b-spinner>
                            </div>
                        </b-card>
                    </b-col>
                </b-row>
            </b-container>
        </template>
    </master>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import ResponseInterface from '../../packages/http/response';

@Component
export default class Login extends Vue {
  private iconVerifySuccess: string = 'check-circle';
  private iconVerifyFailed: string = 'exclamation-circle';
  private response: ResponseInterface | null = null;

  created() {
    this.verifyEmailVerification();
  }

  verifyEmailVerification(): void {
    this.response = null;

    this.$saas.getHttp().patch(`/api/email-verification/verify?token=${this.$route.query.token}`).then((data) => {
      this.response = this.$saas.getHttp().response(data);
    }).catch((data) => {
      this.response = this.$saas.getHttp().response(data.response);
    });
  }
}
</script>
