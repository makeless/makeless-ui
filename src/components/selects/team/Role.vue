<template>
    <b-dropdown v-if="obj.userId !== $makeless.getSecurity().getUser().id" right variant="default" class="dropdown" size="sm" :text="$makeless.t('components.selects.team.role.buttons.role', {role: obj.role})">
        <b-dropdown-header class="mt-n2 mb-n2">
            {{ $makeless.t('components.selects.team.role.header') }}
        </b-dropdown-header>
        <b-dropdown-divider></b-dropdown-divider>
        <b-dropdown-item :disabled="obj.role === role" @click.native.capture.stop="updateRoleTeamUserTeam(obj, role.toString(), index)" v-for="(role, index) in roles">
            <div class="d-flex flex-row flex-wrap">
                <div class="dropdown-item-icon">
                    <b-icon-check v-if="obj.role === role"></b-icon-check>
                    <b-spinner v-if="obj.state.loadingUpdateRole === index" small></b-spinner>
                </div>
                <div class="ml-1">{{ role }}</div>
            </div>
        </b-dropdown-item>
    </b-dropdown>
</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator';
import TeamUser from '../../../models/team-user';
import TeamUserTeamUpdateRole from '../../../structs/team-user-team-update-role';

@Component
export default class Role extends Vue {
  @Prop(Object) obj!: any;

  private roles: string[] = ['owner', 'user']

  updateRoleTeamUserTeam(teamUser: TeamUser, role: string, index: number): void {
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
