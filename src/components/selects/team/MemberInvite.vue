<template>
    <vue-multiselect
            v-model="obj.emails"
            id="member-invite"
            name="member-invite"
            :options="obj.emails"
            :placeholder="$saas.t('components.selects.team.memberInvite.placeholder')"
            :multiple="true"
            label="email"
            track-by="email"
            :taggable="true"
            :close-on-select="false"
            @tag="addTeamCreatEmail"
    >
    </vue-multiselect>
</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator';
import VueMultiselect from 'vue-multiselect';
import 'vue-multiselect/dist/vue-multiselect.min.css';
import {TeamCreate, TeamCreateEmail} from '../../../structs/team-create';

@Component({
  components: {VueMultiselect},
})
export default class MemberInvite extends Vue {
  @Prop(Object) obj!: TeamCreate;

  private addTeamCreatEmail(email: string) {
    this.obj.emails!.push(Object.assign(new TeamCreateEmail(), {
      email: email,
    }));
  }
}
</script>
