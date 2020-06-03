<template>
    <b-modal :id="modalId" :ref="modalId" no-fade :title="$saas.t('pages.member-team.forms.remove.title')">
        <b-form id="form-member-team-remove" v-if="$saas.getSecurity().isAuth() && this.userLoaded && user" @submit="onSubmit">
            <b-alert v-if="form.hasError() && form.getResponse()" variant="danger" dismissible :show="true">
                <template v-if="form.getResponse().getCode() >= 400 && form.getResponse().getCode() < 500">
                    {{ $saas.t('pages.member-team.forms.remove.errors.4x') }}
                </template>

                <template v-if="form.getResponse().getCode() >= 500">
                    {{ $saas.t('pages.member-team.forms.remove.errors.5x') }}
                </template>
            </b-alert>

            <b-form-group :label="$saas.t('pages.member-team.forms.remove.fields.name.label', {name: this.user.name})" label-for="name">
                <b-form-input id="name" type="text" v-model="name" autocomplete="off" required :placeholder="$saas.t('pages.member-team.forms.remove.fields.name.placeholder')"></b-form-input>
                <b-form-invalid-feedback :state="validateName()">
                    {{ $saas.t('pages.member-team.forms.remove.validations.name') }}
                </b-form-invalid-feedback>
            </b-form-group>
        </b-form>

        <template v-slot:modal-footer="{ cancel }">
            <b-button @click="cancel()">
                {{ $saas.t('pages.member-team.forms.remove.buttons.cancel') }}
            </b-button>
            <b-button form="form-member-team-remove" type="submit" variant="danger" :disabled="form.isDisabled() || !validator.isValid">
                {{ $saas.t('pages.member-team.forms.remove.buttons.remove') }}
            </b-button>
        </template>
    </b-modal>
</template>

<script lang="ts">
import {Component, Prop, Mixins} from 'vue-property-decorator';
import UserMixin from './../../../../mixins/User.vue';
import Form from '../../../../packages/form/basic/form';
import Validator from '../../../../packages/validator/basic/validator';
import {BModal, BvModal, BvModalEvent} from 'bootstrap-vue';
import User from '../../../../models/user';

@Component
export default class Remove extends Mixins(UserMixin) {
  @Prop(Object) readonly user!: User;
  @Prop(Array) readonly users!: User[];

  private modalId: string = 'member-team-remove';
  private name: string | null = null;
  private form: Form = new Form();
  private validator: Validator = new Validator([
    this.validateName,
  ]);

  public validateName(): boolean | null {
    if (this.name === null) {
      return null;
    }

    return this.user.name === this.name;
  }

  created() {
    this.onModalHide();
  }

  public onModalHide(): void {
    this.$root.$on('bv::modal::hide', (bvEvent: BvModalEvent, modalId: string) => {
      if (this.modalId === modalId) {
        this.name = null;
      }
    });
  }

  public removeUser(user: User): void {
    for (let i = 0; i < this.users.length; i++) {
      if (this.users[i].id !== user.id) {
        continue;
      }

      this.users.splice(i, 1);
      return;
    }
  }

  public onSubmit($event: Event) {
    $event.preventDefault();
    this.form.setError(false);
    this.form.setDisabled(true);
    this.form.setResponse(null);

    this.$saas.getHttp().delete('/api/auth/team/member', {
      data: this.user,
      headers: {
        'Team': this.$saas.getSecurity().getTeam()!.id,
      },
    }).then((data) => {
      this.form.setResponse(this.$saas.getHttp().response(data));
      this.form.setDisabled(false);
      this.removeUser(this.user);
      (this.$refs[this.modalId] as BModal).hide();
    }).catch((data) => {
      this.form.setResponse(this.$saas.getHttp().response(data.response));
      this.form.setError(true);
      this.form.setDisabled(false);
    });
  }
}
</script>
