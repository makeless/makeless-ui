<template>
    <master>
        <template slot="page">
            <b-container>
                <b-row class="justify-content-center">
                    <b-col sm="8" md="6" lg="5">
                        <b-card class="text-center">
                            <div v-if="response && teamInvitation">
                                <b-col class="mb-2 mb-sm-3">
                                    <b-icon :icon="icon" variant="primary" :font-scale="3"/>
                                </b-col>
                                <b-col><h2>{{ `${$saas.t('pages.invitation.information.invitedTo')} ${teamInvitation.team.name}` }}</h2></b-col>
                                <b-col><small>{{ `${$saas.t('pages.invitation.information.invitedBy')} ${teamInvitation.user.name}` }}</small></b-col>
                                <hr>
                                <b-col>{{ `${$saas.t('pages.invitation.instruction.newTo')} ${$saas.getConfig().getConfiguration().getName()}?` }}</b-col>
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

                                    <b-alert v-if="form.getResponse() && form.getResponse().getCode() === 200" variant="success" dismissible :show="true">
                                        {{ $saas.t('pages.invitation.form.errors.2x') }}
                                        -
                                        <b-link :to="{name: 'login'}">{{ $saas.t('pages.invitation.login') }}</b-link>
                                    </b-alert>

                                    <b-form-group :label="$saas.t('pages.invitation.form.fields.name.label')" class="text-left" label-for="name">
                                        <b-form-input id="name" v-model="register.name" type="text" required :placeholder="$saas.t('pages.invitation.form.fields.name.placeholder')"></b-form-input>
                                        <b-form-invalid-feedback :state="validateName()">
                                            {{ $saas.t('pages.invitation.form.validations.name') }}
                                        </b-form-invalid-feedback>
                                    </b-form-group>

                                    <b-form-group :label="$saas.t('pages.invitation.form.fields.email.label')" class="text-left" label-for="email">
                                        <b-form-input id="email" v-model="register.email" type="email" required :placeholder="$saas.t('pages.invitation.form.fields.email.placeholder')"></b-form-input>
                                        <b-form-invalid-feedback :state="validateEmail()">
                                            {{ $saas.t('pages.invitation.form.validations.email') }}
                                        </b-form-invalid-feedback>
                                    </b-form-group>

                                    <b-form-group :label="$saas.t('pages.invitation.form.fields.password.label')" class="text-left" label-for="password">
                                        <b-form-input id="password" v-model="register.password" type="password" required :placeholder="$saas.t('pages.invitation.form.fields.password.placeholder')" autocomplete="false"></b-form-input>
                                        <b-form-invalid-feedback :state="validatePassword()">
                                            {{ $saas.t('pages.invitation.form.validations.password') }}
                                        </b-form-invalid-feedback>
                                    </b-form-group>

                                    <b-form-group :label="$saas.t('pages.invitation.form.fields.passwordConfirmation.label')" class="text-left" label-for="passwordConfirmation">
                                        <b-form-input id="passwordConfirmation" v-model="register.passwordConfirmation" type="password" required :placeholder="$saas.t('pages.invitation.form.fields.passwordConfirmation.placeholder')" autocomplete="false"></b-form-input>
                                        <b-form-invalid-feedback :state="validatePasswordConfirmation()">
                                            {{ $saas.t('pages.invitation.form.validations.passwordConfirmation') }}
                                        </b-form-invalid-feedback>
                                    </b-form-group>

                                    <b-form-group class="text-left">
                                        <b-form-checkbox size="sm" id="legalConfirmation" v-model="register.legalConfirmation" required>
                                            {{ $saas.t('pages.invitation.form.fields.legalConfirmation.accept') }}
                                            <b-link :to="{name: 'terms'}">{{ $saas.t('pages.invitation.form.fields.legalConfirmation.termsOfService') }}</b-link>
                                            {{ $saas.t('pages.invitation.form.fields.legalConfirmation.and') }}
                                            <b-link :to="{name: 'privacy-policy'}">{{ $saas.t('pages.invitation.form.fields.legalConfirmation.privacyPolicy') }}</b-link>
                                        </b-form-checkbox>
                                        <b-form-invalid-feedback :state="validateLegalConfirmation()">
                                            {{ $saas.t('pages.invitation.form.validations.legalConfirmation') }}
                                        </b-form-invalid-feedback>
                                    </b-form-group>

                                    <b-button type="submit" variant="primary" class="btn-block mt-4" :disabled="form.isDisabled() || !validator.isValid()">
                                        <b-spinner small v-if="form.isDisabled()" class="mr-1"></b-spinner>
                                        {{ $saas.t('pages.invitation.form.button') }}
                                    </b-button>
                                </b-form>
                            </div>
                            <div v-else class="text-center">
                                <b-spinner :label="$saas.t('pages.invitation.loading')"></b-spinner>
                            </div>
                        </b-card>
                    </b-col>
                </b-row>
            </b-container>
        </template>
    </master>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import Register from '../../structs/register';
import Form from '../../packages/form/basic/form';
import ResponseInterface from '../../packages/http/response';
import Validator from '../../packages/validator/basic/validator';
import DomUtil from '../../utils/dom';
import ValidatorUtil from '../../utils/validator';
import TeamInvitation from '../../models/team-invitation';

@Component
export default class Invitation extends Vue {
  private register: Register = new Register();
  private teamInvitation: TeamInvitation | null = null;
  private response: ResponseInterface | null = null;
  private form: Form = new Form();
  private icon: string = 'people';
  private validator: Validator = new Validator([
    this.validateName,
    this.validateEmail,
    this.validatePassword,
    this.validatePasswordConfirmation,
    this.validateLegalConfirmation,
  ]);

  created() {
    this.loadTeamInvitation();
  }

  public validateEmail(): boolean | null {
    if (this.register.email === null) {
      return null;
    }

    return ValidatorUtil.isValidEmail(this.register.email);
  }

  public validateName(): boolean | null {
    if (this.register.name === null) {
      return null;
    }

    return this.register.name.length > 0;
  }

  public validatePassword(): boolean | null {
    if (this.register.password === null) {
      return null;
    }

    return this.register.password.length >= 6;
  }

  public validatePasswordConfirmation(): boolean | null {
    if (this.register.passwordConfirmation === null) {
      return null;
    }

    return this.register.passwordConfirmation.length >= 6 && this.register.password === this.register.passwordConfirmation;
  }

  public validateLegalConfirmation(): boolean | null {
    return this.register.legalConfirmation;
  }

  loadTeamInvitation(): void {
    this.form = new Form();

    this.$saas.getHttp().get(`/api/team-invitation?token=${this.$route.query.token}`).then((data) => {
      this.response = this.$saas.getHttp().response(data);
      this.teamInvitation = this.response.getData().data;
    });
  }

  onSubmit($event: Event): void {
    $event.preventDefault();
    DomUtil.removeFocus();

    this.form.setError(false);
    this.form.setDisabled(true);
    this.form.setResponse(null);

    this.$saas.getHttp().post(`/api/team-invitation/register?token=${this.$route.query.token}`, this.register).then((data) => {
      this.form.setResponse(this.$saas.getHttp().response(data));
      this.form.setDisabled(false);
      this.register = new Register();
    }).catch((data) => {
      this.form.setResponse(this.$saas.getHttp().response(data.response));
      this.form.setError(true);
      this.form.setDisabled(false);
      this.register = new Register();
    });
  }
}
</script>
