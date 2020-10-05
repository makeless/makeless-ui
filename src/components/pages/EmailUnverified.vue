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
                                <h2>{{ $makeless.t('pages.email-unverified.title') }}</h2>
                            </div>

                            <div class="mt-4">
                                <span>{{ $makeless.t('pages.email-unverified.hint', {name: $makeless.getConfig().getConfiguration().getName(), email: $makeless.getSecurity().getUser().email}) }}</span>
                            </div>

                            <b-alert v-if="response && response.getCode() >= 400" variant="danger" dismissible :show="true" class="text-left mt-3 mb-n2">
                                <template v-if="response.getCode() >= 400 && response.getCode() < 500">
                                    {{ $makeless.t('pages.email-unverified.errors.4x') }}
                                </template>

                                <template v-if="response.getCode() >= 500">
                                    {{ $makeless.t('pages.email-unverified.errors.5x') }}
                                </template>
                            </b-alert>

                            <b-alert v-if="response && response.getCode() === 200" variant="success" dismissible :show="true" class="text-left mt-3 mb-n2">
                                {{ $makeless.t('pages.email-unverified.errors.2x') }}
                            </b-alert>

                            <div class="mt-4">
                                <b-button class="btn-block" @click="resendEmailVerification()">
                                    <b-spinner v-if="isLoadingResend" small class="mr-1"></b-spinner>
                                    <span>{{ $makeless.t('pages.email-unverified.button.resend') }}</span>
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

    this.$makeless.getHttp().post('/api/auth/email-verification/resend', this.$makeless.getSecurity().getUser()).then((data) => {
      this.response = this.$makeless.getHttp().response(data);
      this.isLoadingResend = false;
    }).catch((data) => {
      this.response = this.$makeless.getHttp().response(data.response);
      this.isLoadingResend = false;
    });
  }
}
</script>
