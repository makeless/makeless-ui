<template>
    <master>
        <template slot="page">
            <b-container>
                <b-row class="justify-content-md-center">
                    <b-col lg="6">
                        <b-card :title="$makeless.t('pages.password-request.title')">
                            <b-form @submit="onSubmit">
                                <b-alert v-if="form.hasError() && form.getResponse()" variant="danger" dismissible :show="true">
                                    <template v-if="form.getResponse().getCode() >= 400 && form.getResponse().getCode() < 500">
                                        {{ $makeless.t('pages.password-request.form.errors.4x') }}
                                    </template>

                                    <template v-if="form.getResponse().getCode() >= 500">
                                        {{ $makeless.t('pages.password-request.form.errors.5x') }}
                                    </template>
                                </b-alert>

                                <b-alert v-if="form.getResponse() && form.getResponse().getCode() === 200" variant="success" dismissible :show="true">
                                    {{ $makeless.t('pages.password-request.form.errors.2x') }}
                                </b-alert>

                                <b-form-group :label="$makeless.t('pages.password-request.form.fields.email.label')" label-for="email">
                                    <b-form-input id="email" v-model="passwordRequest.email" type="email" required :placeholder="$makeless.t('pages.password-request.form.fields.email.placeholder')"></b-form-input>
                                    <b-form-invalid-feedback :state="validateEmail()">
                                        {{ $makeless.t('pages.password-request.form.validations.email') }}
                                    </b-form-invalid-feedback>
                                </b-form-group>

                                <b-button type="submit" variant="primary" :disabled="form.isDisabled() || !validator.isValid()">
                                    <b-spinner small v-if="form.isDisabled()" class="mr-1"></b-spinner>
                                    {{ $makeless.t('pages.password-request.form.button') }}
                                </b-button>

                                <b-button variant="link" :to="{name: 'login'}" class="ml-1">
                                    {{ $makeless.t('pages.password-request.login') }}
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
import PasswordRequestModel from '../../structs/password-request';
import Form from '../../packages/form/basic/form';
import Validator from '../../packages/validator/basic/validator';
import DomUtil from '../../utils/dom';

@Component
export default class PasswordRequest extends Vue {
  private passwordRequest: PasswordRequestModel = new PasswordRequestModel();
  private form: Form = new Form();
  private validator: Validator = new Validator([
    this.validateEmail,
  ]);

  public validateEmail(): boolean | null {
    if (this.passwordRequest.email === null) {
      return null;
    }

    return this.passwordRequest.email.length > 0;
  }

  onSubmit($event: Event): void {
    $event.preventDefault();
    DomUtil.removeFocus();

    this.form.setError(false);
    this.form.setDisabled(true);
    this.form.setResponse(null);

    this.$makeless.getHttp().post('/api/password-request', this.passwordRequest).then((data) => {
      this.form.setResponse(this.$makeless.getHttp().response(data));
      this.form.setDisabled(false);
      this.passwordRequest = new PasswordRequestModel();
    }).catch((data) => {
      this.form.setResponse(this.$makeless.getHttp().response(data.response));
      this.form.setError(true);
      this.form.setDisabled(false);
      this.passwordRequest = new PasswordRequestModel();
    });
  }
}
</script>
