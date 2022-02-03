<template>
    <master>
        <template slot="page">
            <b-container>
                <b-row>
                    <b-col lg="3">
                        <setting-navigation></setting-navigation>
                    </b-col>

                    <b-col lg="9">
                        <h1 class="d-flex justify-content-between align-items-center">
                            {{ $makeless.t('pages.token.title') }}
                            <b-button size="sm" variant="primary" v-b-modal.token-create>{{ $makeless.t('pages.token.actions.create') }}</b-button>
                        </h1>
                        <hr>
                        <div v-if="response && tokens">
                            <b-list-group v-if="tokens.length">
                                <b-list-group-item class="d-flex justify-content-between align-items-center" v-for="token in tokens" :key="token.id" :variant="token.new ? 'success': null">
                                    <template v-if="token.new">{{ token.token }}</template>
                                    <template v-else>{{ token.note }}</template>
                                    <b-button size="sm" variant="danger" v-b-modal.token-delete @click="selectToken(token)">{{ $makeless.t('pages.token.actions.delete') }}</b-button>
                                </b-list-group-item>
                            </b-list-group>
                            <div v-else class="text-center">
                                <div class="mt-2 mt-sm-5">
                                    <b-icon :icon="icon" variant="primary" :font-scale="3"/>
                                </div>
                                <div class="mt-3 mt-sm-3">
                                    <h2>{{ $makeless.t('pages.token.noTokens') }}</h2>
                                </div>
                            </div>
                        </div>
                        <div v-else class="text-center">
                            <b-spinner :label="$makeless.t('pages.token.loading')"></b-spinner>
                        </div>
                    </b-col>
                </b-row>
            </b-container>
        </template>

        <template slot="outside">
            <create-modal :tokens="tokens"></create-modal>
            <delete-modal :tokens="tokens" :token="selectedToken"></delete-modal>
        </template>
    </master>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import ResponseInterface from '../../../../packages/http/response';
import TokenModel from '../../../../models/token';
import CreateModal from '../../../modals/settings/token/Create.vue';
import DeleteModal from '../../../modals/settings/token/Delete.vue';

@Component({
  name: 'Token',
  components: {
    CreateModal,
    DeleteModal,
  },
})
export default class Token extends Vue {
  public icon: string = 'box';
  private selectedToken: TokenModel | null = null;
  private response: ResponseInterface | null = null;
  private tokens: TokenModel[] = [];

  public selectToken(token: TokenModel) {
    this.selectedToken = token;
  }

  created() {
    this.loadTokens();
  }

  loadTokens(): void {
    this.$makeless.getHttp().get('/api/auth/token').then((data) => {
      this.response = this.$makeless.getHttp().response(data);
      this.response.getData().data.forEach((token: TokenModel) => {
        this.tokens!.push(token);
      });
    });
  }
}
</script>
