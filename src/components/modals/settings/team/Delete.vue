<template>
    <b-modal :id="modalId" no-fade :title="$makeless.t('pages.team.forms.delete.title')">
        <b-form v-if="team" id="form-team-delete" @submit="onSubmit">
            <b-alert v-if="form.hasError() && form.getResponse()" variant="danger" dismissible :show="true">
                <template v-if="form.getResponse().getCode() >= 400 && form.getResponse().getCode() < 500">
                    {{ $makeless.t('pages.team.forms.delete.errors.4x') }}
                </template>

                <template v-if="form.getResponse().getCode() >= 500">
                    {{ $makeless.t('pages.team.forms.delete.errors.5x') }}
                </template>
            </b-alert>

            <b-form-group :label="$makeless.t('pages.team.forms.delete.fields.name.label', {name: this.team.name})" label-for="name">
                <b-form-input id="name" type="text" v-model="name" autocomplete="off" required :placeholder="$makeless.t('pages.team.forms.delete.fields.name.placeholder')"></b-form-input>
                <b-form-invalid-feedback :state="validateName()">
                    {{ $makeless.t('pages.team.forms.delete.validations.name') }}
                </b-form-invalid-feedback>
            </b-form-group>
        </b-form>

        <template v-slot:modal-footer="{ cancel }">
            <b-button @click="cancel()">
                {{ $makeless.t('pages.team.forms.delete.buttons.cancel') }}
            </b-button>
            <b-button form="form-team-delete" type="submit" variant="danger" :disabled="form.isDisabled() || !validator.isValid()">
                <b-spinner small v-if="form.isDisabled()" class="mr-1"></b-spinner>
                {{ $makeless.t('pages.team.forms.delete.buttons.delete') }}
            </b-button>
        </template>
    </b-modal>
</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator';
import Form from '../../../../packages/form/basic/form';
import Validator from '../../../../packages/validator/basic/validator';
import Team from '../../../../models/team';
import {BvModalEvent} from 'bootstrap-vue';
import DomUtil from '../../../../utils/dom';

@Component({
  name: 'Delete',
})
export default class Delete extends Vue {
  @Prop(Object) readonly team!: Team;

  private modalId: string = 'team-delete';
  private name: string | null = null;
  private form: Form = new Form();
  private validator: Validator = new Validator([
    this.validateName,
  ]);

  public validateName(): boolean | null {
    if (this.name === null) {
      return null;
    }

    return this.team.name === this.name;
  }

  created() {
    this.onModalHide();
  }

  public onModalHide(): void {
    this.$root.$on('bv::modal::hide', (bvEvent: BvModalEvent, modalId: string) => {
      if (this.modalId === modalId) {
        this.name = null;
        this.form = new Form();
      }
    });
  }

  public onSubmit($event: Event) {
    $event.preventDefault();
    DomUtil.removeFocus();

    this.form.setError(false);
    this.form.setDisabled(true);
    this.form.setResponse(null);

    this.$makeless.getHttp().delete('/api/auth/team', {
      headers: {
        'Team': this.team.id,
      },
    }).then((data) => {
      this.form.setResponse(this.$makeless.getHttp().response(data));
      this.form.setDisabled(false);
      this.$makeless.getSecurity().deleteTeam(this.team);
      this.$makeless.getSecurity().switchToUser();
    }).catch((data) => {
      this.form.setResponse(this.$makeless.getHttp().response(data.response));
      this.form.setError(true);
      this.form.setDisabled(false);
    });
  }
}
</script>
