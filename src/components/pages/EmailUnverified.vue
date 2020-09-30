<template>
    <master>
        <template slot="page">
            <b-container>
                <b-row class="justify-content-md-center">
                    <b-col lg="7">
                        <b-card class="text-center">
                            <b-alert v-if="response && response.getCode() >= 400" variant="danger" dismissible :show="true" class="text-left">
                                <template v-if="response.getCode() >= 400 && response.getCode() < 500">
                                    {{ $saas.t('pages.email-unverified.response.errors.4x') }}
                                </template>

                                <template v-if="response.getCode() >= 500">
                                    {{ $saas.t('pages.email-unverified.response.errors.5x') }}
                                </template>
                            </b-alert>

                            <b-alert v-if="response && response.getCode() === 200" variant="success" dismissible :show="true" class="text-left">
                                {{ $saas.t('pages.email-unverified.response.errors.2x') }}
                            </b-alert>

                            <b-col class="mt-2 mt-sm-3">
                                <b-icon :icon="icon" variant="primary" :font-scale="3"/>
                            </b-col>
                            <b-col class="mt-3">
                                <h2>{{ $saas.t('pages.email-unverified.pleaseVerify') }}</h2>
                            </b-col>
                            <b-col class="mt-4">
                                <span>{{ `${$saas.t('pages.email-unverified.hint.before')} ${$saas.getConfig().getConfiguration().getName()} ${$saas.t('pages.email-unverified.hint.weNeed')}` }}</span>
                            </b-col>
                            <b-col class="mt-1">
                                <span>{{ `${$saas.t('pages.email-unverified.hint.emailSent')} ${$saas.getSecurity().getUser().email}` }}</span>
                            </b-col>
                            <b-col class="mt-4">
                                <b-button size="sm" @click="resendEmailVerification()">
                                    <b-spinner v-if="isLoadingResend" small class="mr-1"></b-spinner>
                                    <span>{{ $saas.t('pages.email-unverified.button.resend') }}</span>
                                </b-button>
                            </b-col>
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
  private icon: string = 'inbox';
  private response: ResponseInterface | null = null;
  private isLoadingResend: boolean | null = null;

  resendEmailVerification(): void {
    this.response = null;
    this.isLoadingResend = true;

    this.$saas.getHttp().post('/api/auth/email-verification/resend', this.$saas.getSecurity().getUser()).then((data) => {
      this.response = this.$saas.getHttp().response(data);
      this.isLoadingResend = false;
    }).catch((data) => {
      this.response = this.$saas.getHttp().response(data.response);
      this.isLoadingResend = false;
    });
  }
}
</script>
