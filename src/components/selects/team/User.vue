<template>
    <vue-multiselect
            v-model="obj.user"
            id="user"
            name="user"
            :options="users"
            :placeholder="$saas.t('components.selects.team.user.placeholder')"
            :multiple="false"
            :loading="loading"
            :showLabels="false"
            label="name"
            track-by="id"
            @search-change="onSearch"
    >
        <template slot="option" slot-scope="props">
            <div>{{ props.option.name }}<br><small>{{ props.option.email }}</small></div>
        </template>

        <template slot="noOptions">{{ $saas.t('components.selects.team.user.noOption') }}</template>
        <template slot="noResult">{{ $saas.t('components.selects.team.user.noResult') }}</template>
    </vue-multiselect>
</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator';
import VueMultiselect from 'vue-multiselect';
import 'vue-multiselect/dist/vue-multiselect.min.css';

@Component({
  components: {VueMultiselect},
})
export default class User extends Vue {
  @Prop(Object) obj!: Object;

  protected users: User[] = [];
  private loading: boolean = false;

  public onSearch(value: string): void {
    if (!this.$saas.getSecurity().getUser() || !this.$saas.getSecurity().getTeam() || value === "") {
      return;
    }

    this.loading = true
    this.$saas.getHttp().get(`/api/auth/team/user?search=${value}`, {
      headers: {
        "Team": this.$saas.getSecurity().getTeam()!.id,
      }
    }).then((data) => {
      this.users = this.$saas.getHttp().response(data).getData().data;
      this.loading = false;
    });
  }
}
</script>
