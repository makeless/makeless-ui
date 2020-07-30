<template>
    <master>
        <template slot="page">
            <b-container>
                <b-row>
                    <b-col lg="3">
                        <settings-navigation></settings-navigation>
                    </b-col>

                    <b-col lg="9">
                        <h1 class="d-flex justify-content-between align-items-center">
                            {{ $saas.t('pages.token.title') }}
                            <b-button size="sm" variant="primary" v-b-modal.token-create>{{ $saas.t('pages.token.actions.create') }}</b-button>
                        </h1>
                        <hr>
                        <b-list-group v-if="$saas.getSecurity().isAuth() && response && tokens">
                            <b-list-group-item class="d-flex justify-content-between align-items-center" v-for="token in tokens" :key="token.id" :variant="token.new ? 'success': null">
                                <template v-if="token.new">{{ token.token }}</template>
                                <template v-else>{{ token.note }}</template>
                                <b-button size="sm" variant="danger" v-b-modal.token-delete @click="selectToken(token)">{{ $saas.t('pages.token.actions.delete') }}</b-button>
                            </b-list-group-item>
                        </b-list-group>
                        <div v-else class="text-center">
                            <b-spinner :label="$saas.t('pages.token.loading')"></b-spinner>
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
import {Component, Mixins} from 'vue-property-decorator';
import UserMixin from './../../../../mixins/User.vue';
import ResponseInterface from '../../../../packages/http/response';
import TokenModel from '../../../../models/token';
import CreateModal from '../../../modals/settings/token/Create.vue';
import DeleteModal from '../../../modals/settings/token/Delete.vue';

@Component({
  components: {
    CreateModal,
    DeleteModal,
  },
})
export default class Token extends Mixins(UserMixin) {
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
    this.$saas.getHttp().get('/api/auth/token').then((data) => {
      this.response = this.$saas.getHttp().response(data);
      this.response.getData().data.forEach((token: TokenModel) => {
        this.tokens!.push(token);
      });
    });
  }
}
</script>
