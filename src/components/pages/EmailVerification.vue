<template>
    <master>
        <template slot="page">
            <b-container>
                <b-row class="justify-content-center">
                    <b-col sm="8" md="6" lg="5">
                        <b-card class="text-center">
                            <div v-if="response">
                                <template v-if="response && response.getCode() === 200">
                                    <div class="mt-2 mt-sm-3">
                                        <b-icon :icon="iconVerifySuccess" variant="primary" :font-scale="3"/>
                                    </div>

                                    <h2 class="mt-3">{{ $saas.t('pages.email-verification.errors.2x') }}</h2>

                                    <div class="mt-2">
                                        {{ $saas.t('pages.email-verification.access', {name: $saas.getConfig().getConfiguration().getName()}) }}
                                    </div>

                                    <div class="mt-4">
                                        <template v-if="$saas.getSecurity().isAuth()">
                                            <b-button class="btn-block" variant="primary" :to="{name: 'dashboard'}">
                                                {{ $saas.t('pages.email-verification.button.dashboard') }}
                                            </b-button>
                                        </template>
                                        <template v-else>
                                            <b-button class="btn-block" variant="primary" :to="{name: 'login'}">
                                                {{ $saas.t('pages.email-verification.button.login') }}
                                            </b-button>
                                        </template>
                                    </div>
                                </template>

                                <template v-if="response && response.getCode() >= 400">
                                    <div class="mt-2 mt-sm-3">
                                        <b-icon class="text-danger" :icon="iconVerifyFailed" :font-scale="3"/>
                                    </div>

                                    <template v-if="response.getCode() >= 400 && response.getCode() < 500">
                                        <h2 class="mt-3">{{ $saas.t('pages.email-verification.errors.4x') }}</h2>
                                    </template>

                                    <template v-if="response.getCode() >= 500">
                                        <h2 class="mt-3">{{ $saas.t('pages.email-verification.errors.5x') }}</h2>
                                    </template>
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
export default class EmailVerification extends Vue {
  private iconVerifySuccess: string = 'check-circle';
  private iconVerifyFailed: string = 'exclamation-circle';
  private response: ResponseInterface | null = null;

  created() {
    this.verifyEmailVerification();
  }

  verifyEmailVerification(): void {
    this.response = null;

    this.$saas.getHttp().patch(`/api/email-verification/verify?token=${this.$route.query.token}`, null).then((data) => {
      this.response = this.$saas.getHttp().response(data);
      this.$saas.getSecurity().verifyUser();
    }).catch((data) => {
      this.response = this.$saas.getHttp().response(data.response);
    });
  }
}
</script>
