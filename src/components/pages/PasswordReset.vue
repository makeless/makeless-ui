<template>
    <master>
        <template slot="page">
            <b-container>
                <b-row class="justify-content-md-center">
                    <b-col lg="6">
                        <b-card :title="$makeless.t('pages.password-reset.title')">
                            <b-form @submit="onSubmit">
                                <b-alert v-if="form.hasError() && form.getResponse()" variant="danger" dismissible :show="true">
                                    <template v-if="form.getResponse().getCode() >= 400 && form.getResponse().getCode() < 500">
                                        {{ $makeless.t('pages.password-reset.form.errors.4x') }}
                                    </template>

                                    <template v-if="form.getResponse().getCode() >= 500">
                                        {{ $makeless.t('pages.password-reset.form.errors.5x') }}
                                    </template>
                                </b-alert>

                                <b-alert v-if="form.getResponse() && form.getResponse().getCode() === 200" variant="success" dismissible :show="true">
                                    {{ $makeless.t('pages.password-reset.form.errors.2x') }}
                                    -
                                    <b-link :to="{name: 'login'}">{{ $makeless.t('pages.password-reset.login') }}</b-link>
                                </b-alert>

                                <b-row>
                                    <b-col sm="6">
                                        <b-form-group :label="$makeless.t('pages.password-reset.form.fields.password.label')" label-for="password">
                                            <b-form-input id="password" v-model="passwordReset.password" type="password" required :placeholder="$makeless.t('pages.password-reset.form.fields.password.placeholder')"></b-form-input>
                                            <b-form-invalid-feedback :state="validatePassword()">
                                                {{ $makeless.t('pages.password-reset.form.validations.password') }}
                                            </b-form-invalid-feedback>
                                        </b-form-group>
                                    </b-col>

                                    <b-col sm="6">
                                        <b-form-group :label="$makeless.t('pages.password-reset.form.fields.passwordConfirmation.label')" label-for="passwordConfirmation">
                                            <b-form-input id="passwordConfirmation" v-model="passwordReset.passwordConfirmation" type="password" required :placeholder="$makeless.t('pages.password-reset.form.fields.passwordConfirmation.placeholder')"></b-form-input>
                                            <b-form-invalid-feedback :state="validatePasswordConfirmation()">
                                                {{ $makeless.t('pages.password-reset.form.validations.passwordConfirmation') }}
                                            </b-form-invalid-feedback>
                                        </b-form-group>
                                    </b-col>
                                </b-row>

                                <b-button type="submit" variant="primary" :disabled="form.isDisabled() || !validator.isValid()">
                                    <b-spinner small v-if="form.isDisabled()" class="mr-1"></b-spinner>
                                    {{ $makeless.t('pages.password-reset.form.button') }}
                                </b-button>

                                <b-button variant="link" :to="{name: 'login'}" class="ml-1">
                                    {{ $makeless.t('pages.password-reset.login') }}
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
import PasswordResetModel from '../../structs/password-reset';
import Form from '../../packages/form/basic/form';
import Validator from '../../packages/validator/basic/validator';
import DomUtil from '../../utils/dom';

@Component
export default class PasswordReset extends Vue {
  private passwordReset: PasswordResetModel = new PasswordResetModel();
  private form: Form = new Form();
  private validator: Validator = new Validator([
    this.validatePassword,
    this.validatePasswordConfirmation,
  ]);

  public validatePassword(): boolean | null {
    if (this.passwordReset.password === null) {
      return null;
    }

    return this.passwordReset.password.length >= 6;
  }

  public validatePasswordConfirmation(): boolean | null {
    if (this.passwordReset.passwordConfirmation === null) {
      return null;
    }

    return this.passwordReset.passwordConfirmation.length >= 6 && this.passwordReset.password === this.passwordReset.passwordConfirmation;
  }

  onSubmit($event: Event): void {
    $event.preventDefault();
    DomUtil.removeFocus();

    this.form.setError(false);
    this.form.setDisabled(true);
    this.form.setResponse(null);

    this.$makeless.getHttp().post(`/api/password-reset?token=${this.$route.query.token}`, this.passwordReset).then((data) => {
      this.form.setResponse(this.$makeless.getHttp().response(data));
      this.form.setDisabled(false);
      this.passwordReset = new PasswordResetModel();
    }).catch((data) => {
      this.form.setResponse(this.$makeless.getHttp().response(data.response));
      this.form.setError(true);
      this.form.setDisabled(false);
      this.passwordReset = new PasswordResetModel();
    });
  }
}
</script>
