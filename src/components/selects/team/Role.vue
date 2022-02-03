<template>
    <b-dropdown @toggle="setShowDropdown(false)" @hide="(bvEvt) => suppressHideDropdown(bvEvt)" v-if="obj.userId !== $makeless.getSecurity().getUser().id" right variant="default" class="dropdown" size="sm" :text="$makeless.t('components.selects.team.role.buttons.role', {role: $makeless.getConfig().getConfiguration().getTeams().getRole(obj.role)[$makeless.getI18n().getLocale()]})">
        <b-dropdown-header class="mt-n2 mb-n2">
            {{ $makeless.t('components.selects.team.role.header') }}
        </b-dropdown-header>
        <b-dropdown-divider></b-dropdown-divider>
        <b-dropdown-item :disabled="obj.role === role" @click="updateRoleTeamUserTeam(obj, role, index)" v-for="(t, role, index) in $makeless.getConfig().getConfiguration().getTeams().getRoles()" :key="role">
            <div class="d-flex flex-row">
                <div style="width: 20px;">
                    <b-icon-check v-if="obj.role === role"></b-icon-check>
                    <b-spinner v-if="obj.state.loadingUpdateRole === index" small></b-spinner>
                </div>
                <div class="ml-1">{{ t[$makeless.getI18n().getLocale()] }}</div>
            </div>
        </b-dropdown-item>
    </b-dropdown>
</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator';
import TeamUser from '../../../models/team-user';
import TeamUserTeamUpdateRole from '../../../structs/team-user-team-update-role';

@Component({
  name: 'Role',
})
export default class Role extends Vue {
  @Prop(Object) obj!: any;

  private showDropdown: boolean = false;

  private suppressHideDropdown(bvEvt: Event): void {
    if (this.showDropdown) {
      bvEvt.preventDefault();
    }
  }

  private setShowDropdown(show: boolean): void {
    this.showDropdown = show;
  }

  updateRoleTeamUserTeam(teamUser: TeamUser, role: string, index: number): void {
    this.setShowDropdown(true);

    if (teamUser.role === role) {
      return;
    }

    teamUser.state.responseUpdateRole = null;
    teamUser.state.loadingUpdateRole = index;

    const teamUserTeamUpdateRole: TeamUserTeamUpdateRole = Object.assign(new TeamUserTeamUpdateRole(), {
      id: teamUser.id,
      role: role,
    });

    this.$makeless.getHttp().patch('/api/auth/team/team-user/role', teamUserTeamUpdateRole, {
      headers: {
        'Team': this.$makeless.getSecurity().getTeam()!.id,
      },
    }).then((data) => {
      teamUser.state.responseUpdateRole = this.$makeless.getHttp().response(data);
      teamUser.state.loadingUpdateRole = null;
      teamUser.role = role;
    }).catch((data) => {
      teamUser.state.responseUpdateRole = this.$makeless.getHttp().response(data.response);
      teamUser.state.loadingUpdateRole = null;
    });
  }
}
</script>
