<template>
    <vue-multiselect
            v-model="obj.emails"
            id="member-emails"
            name="member-emails"
            :options="obj.emails"
            :placeholder="$saas.t('components.selects.team.memberEmails.placeholder')"
            :multiple="true"
            label="email"
            track-by="email"
            :taggable="true"
            :close-on-select="false"
            @tag="addTeamCreateEmail"
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
export default class MemberEmails extends Vue {
  @Prop(Object) obj!: TeamCreate;

  private addTeamCreateEmail(email: string) {
    this.obj.emails!.push(Object.assign(new TeamCreateEmail(), {
      email: email,
    }));
  }
}
</script>
