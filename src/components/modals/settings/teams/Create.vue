<template>
    <b-modal id="create" no-fade centered title="Create Team">
        <b-form v-if="$saas.getSecurity().isAuth() && this.userLoaded" @submit="onSubmit">
            <b-alert v-if="hasError && response" variant="danger" dismissible :show="true">
                <template v-if="response.getCode() >= 400 && response.getCode() < 500">
                    Create failed.
                </template>

                <template v-if="response.getCode() >= 500">
                    System error.
                </template>
            </b-alert>

            <b-form-group label="Name" label-for="name">
                <b-form-input id="name" type="text" required placeholder="Name"></b-form-input>
            </b-form-group>
        </b-form>
    </b-modal>
</template>

<script lang="ts">
import {Component, Mixins} from 'vue-property-decorator';
import UserMixin from '@/mixins/User.vue';
import ResponseInterface from '@/packages/http/response';
import Team from '@/models/team';

@Component({})
export default class Create extends Mixins(UserMixin) {
  private hasError: boolean = false;
  private disabled: boolean = false;
  private response: ResponseInterface | null = null;

  public get team(): Team {
    return new Team();
  }

  public onSubmit($event: Event) {
    $event.preventDefault();
    this.hasError = false;
    this.response = null;
    this.disabled = true;

    this.$saas.getHttp().patch('/api/auth/team/create', this.team).then((data) => {
      this.response = this.$saas.getHttp().response(data);
      this.disabled = false;
      Object.assign(this.team, {
        name: this.response.getData().data.name,
        updatedAt: this.response.getData().data.updatedAt,
      });
    }).catch((data) => {
      this.response = this.$saas.getHttp().response(data.response);
      this.hasError = true;
      this.disabled = false;
    });
  }
}
</script>
