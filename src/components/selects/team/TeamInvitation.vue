<template>
    <vue-multiselect
            v-model="obj.invitations"
            id="team-invitation"
            name="team-invitation"
            :options="obj.invitations"
            :placeholder="$makeless.t('components.selects.team.invitation.placeholder')"
            :multiple="true"
            label="email"
            :showLabels="false"
            tagPlaceholder=""
            track-by="email"
            :taggable="true"
            :close-on-select="false"
            @tag="addTeamInvitation"
    >

        <template slot="noOptions">{{ $makeless.t('components.selects.team.invitation.noOption') }}</template>
    </vue-multiselect>
</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator';
import VueMultiselect from 'vue-multiselect';
import TeamInvitationStruct from '../../../structs/team-invitation';

@Component({
  name: 'TeamInvitation',
  components: {VueMultiselect},
})
export default class TeamInvitation extends Vue {
  @Prop(Object) obj!: any;

  private addTeamInvitation(email: string): void {
    this.obj['invitations'].push(Object.assign(new TeamInvitationStruct(), {
      email: email,
    }));
  }
}
</script>
