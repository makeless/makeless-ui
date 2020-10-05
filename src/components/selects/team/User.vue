<template>
    <vue-multiselect
            v-model="obj.user"
            id="user"
            name="user"
            :options="users"
            :placeholder="$makeless.t('components.selects.team.user.placeholder')"
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

        <template slot="noOptions">{{ $makeless.t('components.selects.team.user.noOption') }}</template>
        <template slot="noResult">{{ $makeless.t('components.selects.team.user.noResult') }}</template>
    </vue-multiselect>
</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator';
import VueMultiselect from 'vue-multiselect';
import 'vue-multiselect/dist/vue-multiselect.min.css';
import UserModel from '../../../models/user';
import TeamUserModel from '../../../models/team-user';

@Component({
  components: {VueMultiselect},
})
export default class User extends Vue {
  @Prop(Object) obj!: any;

  protected users: UserModel[] = [];
  private loading: boolean = false;

  public onSearch(value: string): void {
    if (!this.$makeless.getSecurity().getTeam() || value === '') {
      return;
    }

    this.loading = true;
    this.$makeless.getHttp().get(`/api/auth/team/team-user?search=${value}`, {
      headers: {
        'Team': this.$makeless.getSecurity().getTeam()!.id,
      },
    }).then((data) => {
      this.users = [];
      this.$makeless.getHttp().response(data).getData().data.forEach((teamUser: TeamUserModel) => {
        this.users!.push(Object.assign(new UserModel(), teamUser.user));
      });
      this.loading = false;
    });
  }
}
</script>
