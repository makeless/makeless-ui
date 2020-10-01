<template>
    <master>
        <template slot="page">
            <b-container>
                <b-row class="justify-content-center">
                    <b-col sm="8" md="6" lg="5">
                        <b-card class="text-center">
                            <div class="mt-2 mt-sm-3">
                                <b-icon :icon="icon" variant="primary" :font-scale="3"/>
                            </div>

                            <div class="mt-3">
                                <h2>{{ $saas.t('pages.email-unverified.title') }}</h2>
                            </div>

                            <div class="mt-4">
                                <span>{{ $saas.t('pages.email-unverified.hint', {name: $saas.getConfig().getConfiguration().getName(), email: $saas.getSecurity().getUser().email}) }}</span>
                            </div>

                            <b-alert v-if="response && response.getCode() >= 400" variant="danger" dismissible :show="true" class="text-left mt-3 mb-n2">
                                <template v-if="response.getCode() >= 400 && response.getCode() < 500">
                                    {{ $saas.t('pages.email-unverified.errors.4x') }}
                                </template>

                                <template v-if="response.getCode() >= 500">
                                    {{ $saas.t('pages.email-unverified.errors.5x') }}
                                </template>
                            </b-alert>

                            <b-alert v-if="response && response.getCode() === 200" variant="success" dismissible :show="true" class="text-left mt-3 mb-n2">
                                {{ $saas.t('pages.email-unverified.errors.2x') }}
                            </b-alert>

                            <div class="mt-4">
                                <b-button class="btn-block" @click="resendEmailVerification()">
                                    <b-spinner v-if="isLoadingResend" small class="mr-1"></b-spinner>
                                    <span>{{ $saas.t('pages.email-unverified.button.resend') }}</span>
                                </b-button>
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
export default class EmailUnverified extends Vue {
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
