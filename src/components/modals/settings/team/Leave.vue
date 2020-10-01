<template>
    <b-modal :id="modalId" no-fade :title="$saas.t('pages.team.forms.leave.title')">
        <b-form id="form-team-leave" v-if="team" @submit="onSubmit">
            <b-alert v-if="form.hasError() && form.getResponse()" variant="danger" dismissible :show="true">
                <template v-if="form.getResponse().getCode() >= 400 && form.getResponse().getCode() < 500">
                    {{ $saas.t('pages.team.forms.leave.errors.4x') }}
                </template>

                <template v-if="form.getResponse().getCode() >= 500">
                    {{ $saas.t('pages.team.forms.leave.errors.5x') }}
                </template>
            </b-alert>

            <b-form-group :label="$saas.t('pages.team.forms.leave.fields.name.label', {name: this.team.name})" label-for="name">
                <b-form-input id="name" type="text" v-model="name" autocomplete="off" required :placeholder="$saas.t('pages.team.forms.leave.fields.name.placeholder')"></b-form-input>
                <b-form-invalid-feedback :state="validateName()">
                    {{ $saas.t('pages.team.forms.leave.validations.name') }}
                </b-form-invalid-feedback>
            </b-form-group>
        </b-form>

        <template v-slot:modal-footer="{ cancel }">
            <b-button @click="cancel()">
                {{ $saas.t('pages.team.forms.leave.buttons.cancel') }}
            </b-button>
            <b-button form="form-team-leave" type="submit" variant="danger" :disabled="form.isDisabled() || !validator.isValid()">
                <b-spinner small v-if="form.isDisabled()" class="mr-1"></b-spinner>
                {{ $saas.t('pages.team.forms.leave.buttons.leave') }}
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

@Component
export default class Leave extends Vue {
  @Prop(Object) readonly team!: Team;

  private modalId: string = 'team-leave';
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

    this.$saas.getHttp().delete('/api/auth/team-user', {
      headers: {
        'Team': this.team.id,
      },
    }).then((data) => {
      this.form.setResponse(this.$saas.getHttp().response(data));
      this.form.setDisabled(false);
      this.$saas.getSecurity().deleteTeam(this.team);
      this.$saas.getSecurity().switchToUser();
    }).catch((data) => {
      this.form.setResponse(this.$saas.getHttp().response(data.response));
      this.form.setError(true);
      this.form.setDisabled(false);
    });
  }
}
</script>
