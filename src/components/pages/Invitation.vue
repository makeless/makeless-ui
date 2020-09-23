<template>
    <master>
        <template slot="page">
            <b-container>
                <b-row class="justify-content-md-center">
                    <b-col lg="4">
                        <b-card class="text-center">
                            <b-col class="mb-2 mb-sm-3"><b-icon :icon="icon" variant="primary" :font-scale="3"/></b-col>
                            <b-col><h2>{{ $saas.t('pages.invitation.information.invitedTo') }}</h2></b-col>
                            <b-col><small>{{ $saas.t('pages.invitation.information.invitedBy') }}</small></b-col>
                            <hr>
                            <b-col>{{ `${$saas.t('pages.invitation.instruction.newTo')} ${$saas.getConfig().getConfiguration().getName()}${$saas.t('pages.invitation.instruction.questionMark')}` }}</b-col>
                            <b-col class="mb-1 mb-sm-3">{{ $saas.t('pages.invitation.instruction.createAccount') }}</b-col>

                            <b-form @submit="onSubmit">
                                <b-alert v-if="form.hasError() && form.getResponse()" variant="danger" dismissible :show="true">
                                    <template v-if="form.getResponse().getCode() >= 400 && form.getResponse().getCode() < 500">
                                        {{ $saas.t('pages.invitation.form.errors.4x') }}
                                    </template>

                                    <template v-if="form.getResponse().getCode() >= 500">
                                        {{ $saas.t('pages.invitation.form.errors.5x') }}
                                    </template>
                                </b-alert>

                                <b-form-group :label="$saas.t('pages.invitation.form.fields.name.label')" class="text-left" label-for="name">
                                    <b-form-input id="name" v-model="invitation.name" type="text" required :placeholder="$saas.t('pages.invitation.form.fields.name.placeholder')"></b-form-input>
                                    <b-form-invalid-feedback :state="validateName()">
                                        {{ $saas.t('pages.invitation.form.validations.name') }}
                                    </b-form-invalid-feedback>
                                </b-form-group>

                                <b-form-group :label="$saas.t('pages.invitation.form.fields.email.label')" class="text-left" label-for="email">
                                    <b-form-input id="email" v-model="invitation.email" type="email" required :placeholder="$saas.t('pages.invitation.form.fields.email.placeholder')"></b-form-input>
                                    <b-form-invalid-feedback :state="validateEmail()">
                                        {{ $saas.t('pages.invitation.form.validations.email') }}
                                    </b-form-invalid-feedback>
                                </b-form-group>

                                <b-form-group :label="$saas.t('pages.invitation.form.fields.password.label')" class="text-left" label-for="password">
                                    <b-form-input id="password" v-model="invitation.password" type="password" required :placeholder="$saas.t('pages.invitation.form.fields.password.placeholder')" autocomplete="false"></b-form-input>
                                    <b-form-invalid-feedback :state="validatePassword()">
                                        {{ $saas.t('pages.invitation.form.validations.password') }}
                                    </b-form-invalid-feedback>
                                </b-form-group>

                                <b-button type="submit" variant="primary" class="btn-block" :disabled="form.isDisabled() || !validator.isValid()">
                                    <b-spinner small v-if="form.isDisabled()" class="mr-1"></b-spinner>
                                    {{ $saas.t('pages.invitation.form.button') }}
                                </b-button>
                            </b-form>
                        </b-card>
                    </b-col>
                </b-row>
            </b-container>
        </template>
    </master>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import InvitationModel from '../../structs/invitation';
import Form from '../../packages/form/basic/form';
import Validator from '../../packages/validator/basic/validator';
import DomUtil from '../../utils/dom';

@Component
export default class Invitation extends Vue {
  private invitation: InvitationModel = new InvitationModel();
  private form: Form = new Form();
  private icon: string = "people";
  private validator: Validator = new Validator([
    this.validateName,
    this.validateEmail,
    this.validatePassword,
  ]);

  public validateEmail(): boolean | null {
    if (this.invitation.email === null) {
      return null;
    }

    return this.invitation.email.length > 0;
  }

  public validateName(): boolean | null {
    if (this.invitation.name === null) {
      return null;
    }

    return this.invitation.name.length > 0;
  }

  public validatePassword(): boolean | null {
    if (this.invitation.password === null) {
      return null;
    }

    return this.invitation.password.length >= 6;
  }

  onSubmit($event: Event): void {
    $event.preventDefault();
    DomUtil.removeFocus();

    this.form.setError(false);
    this.form.setDisabled(true);
    this.form.setResponse(null);

    this.$saas.getHttp().post('/api/login', this.invitation).then((data) => {
      this.form.setResponse(this.$saas.getHttp().response(data));
      this.form.setDisabled(false);
      this.invitation = new InvitationModel();

      this.$saas.getSecurity().login(this.form.getResponse()!);
    }).catch((data) => {
      this.form.setResponse(this.$saas.getHttp().response(data.response));
      this.form.setError(true);
      this.form.setDisabled(false);
      this.invitation = new InvitationModel();

      this.$saas.getSecurity().logout(false);
    });
  }
}
</script>
