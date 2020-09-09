<template>
    <vue-multiselect
            v-model="obj.memberInvites"
            id="member-invite"
            name="member-invite"
            :options="obj.memberInvites"
            :placeholder="$saas.t('components.selects.team.invite.placeholder')"
            :multiple="true"
            label="mail"
            track-by="mail"
            :taggable="true"
            :close-on-select="false"
            @tag="addUserInvite"
            tag-placeholder="Add new mail"
    >

        <template slot="noOptions">{{ $saas.t('components.selects.team.invite.noOption') }}</template>
    </vue-multiselect>
</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator';
import VueMultiselect from 'vue-multiselect';
import 'vue-multiselect/dist/vue-multiselect.min.css';
import TeamCreate from '../../../structs/team-create';

@Component({
  components: {VueMultiselect},
})
export default class MemberInvite extends Vue {
  @Prop(Object) obj!: TeamCreate;

  private addUserInvite(input: string) {
    const newMemberInvite = {
      mail: input,
    };
    this.obj.memberInvites!.push(newMemberInvite);
  }
}
</script>
