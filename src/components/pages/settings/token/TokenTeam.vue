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
                            {{ $saas.t('pages.token-team.title') }}
                            <b-button size="sm" variant="primary" v-b-modal.token-team-create>{{ $saas.t('pages.token-team.actions.create') }}</b-button>
                        </h1>
                        <hr>
                        <b-list-group v-if="$saas.getSecurity().isAuth() && userLoaded && response && tokens">
                            <b-list-group-item class="d-flex justify-content-between align-items-center" v-for="token in tokens" :key="token.id" :variant="token.new ? 'success': null">
                                <div>
                                    <template v-if="token.new">{{ token.token }}</template>
                                    <template v-else>{{ token.note }}</template>
                                    <br><small class="mr-2">{{ token.user.name }}</small>
                                </div>
                                <b-button size="sm" variant="danger" v-b-modal.token-team-delete @click="selectToken(token)">{{ $saas.t('pages.token-team.actions.delete') }}</b-button>
                            </b-list-group-item>
                        </b-list-group>
                        <div v-else class="text-center">
                            <b-spinner :label="$saas.t('pages.token-team.loading')"></b-spinner>
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
import SettingsNavigation from './../../../../components/navigations/SettingsNavigation.vue';
import UserMixin from './../../../../mixins/User.vue';
import ResponseInterface from '../../../../packages/http/response';
import TokenModel from '../../../../models/token';
import CreateModal from '../../../modals/settings/token/team/Create.vue';
import DeleteModal from '../../../modals/settings/token/team/Delete.vue';

@Component({
  components: {
    SettingsNavigation,
    CreateModal,
    DeleteModal,
  },
})
export default class TokenTeam extends Mixins(UserMixin) {
  private selectedToken: TokenModel | null = null;
  private response: ResponseInterface | null = null;
  private tokens: TokenModel[] | null = null;

  public selectToken(token: TokenModel) {
    this.selectedToken = token;
  }

  onUserLoaded() {
    if (this.response === null) {
      this.loadTokens();
    }
  }

  created() {
    this.loadTokens();
  }

  loadTokens(): void {
    if (this.$saas.getSecurity().getUser() === null) {
      return;
    }

    this.$saas.getHttp().get('/api/auth/team/token', {
      headers: {
        "Team": this.$saas.getSecurity().getTeam()!.id,
      }
    }).then((data) => {
      this.tokens = [];
      this.response = this.$saas.getHttp().response(data);
      this.response.getData().data.forEach((token: TokenModel) => {
        this.tokens!.push(token);
      });
    });
  }
}
</script>
