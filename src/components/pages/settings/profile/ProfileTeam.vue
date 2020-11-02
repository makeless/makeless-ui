<template>
    <master>
        <template slot="page">
            <b-container>
                <b-row>
                    <b-col lg="3">
                        <settings-navigation></settings-navigation>
                    </b-col>

                    <b-col lg="9">
                        <h1>{{ $makeless.t('pages.profile-team.title') }}</h1>
                        <hr>
                        <b-form @submit="onSubmit">
                            <b-alert v-if="form.hasError() && form.getResponse()" variant="danger" dismissible :show="true">
                                <template v-if="form.getResponse().getCode() >= 400 && form.getResponse().getCode() < 500">
                                    {{ $makeless.t('pages.profile-team.form.errors.4x') }}
                                </template>

                                <template v-if="form.getResponse().getCode() >= 500">
                                    {{ $makeless.t('pages.profile-team.form.errors.5x') }}
                                </template>
                            </b-alert>

                            <b-alert v-if="form.getResponse() && form.getResponse().getCode() === 200" variant="success" dismissible :show="true">
                                {{ $makeless.t('pages.profile-team.form.errors.2x') }}
                            </b-alert>

                            <b-form-group :label="$makeless.t('pages.profile-team.form.fields.name.label')" label-for="name">
                                <b-form-input id="name" v-model="profile.name" type="text" required :placeholder="$makeless.t('pages.profile-team.form.fields.name.placeholder')"></b-form-input>
                                <b-form-invalid-feedback :state="validateName()">
                                    {{ $makeless.t('pages.profile-team.form.validations.name') }}
                                </b-form-invalid-feedback>
                            </b-form-group>

                            <b-button type="submit" variant="primary" :disabled="form.isDisabled() || !validator.isValid()">
                                <b-spinner small v-if="form.isDisabled()" class="mr-1"></b-spinner>
                                {{ $makeless.t('pages.profile-team.form.button') }}
                            </b-button>
                        </b-form>
                    </b-col>
                </b-row>
            </b-container>
        </template>
    </master>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import ProfileTeamStruct from '../../../../structs/profile-team';
import UtilObject from '../../../../utils/object';
import Form from '../../../../packages/form/basic/form';
import Validator from '../../../../packages/validator/basic/validator';
import DomUtil from '../../../../utils/dom';

@Component
export default class ProfileTeam extends Vue {
  private profile: ProfileTeamStruct = UtilObject.clone(this.$makeless.getSecurity().getTeam());
  private form: Form = new Form();
  private validator: Validator = new Validator([
    this.validateName,
  ]);

  public validateName(): boolean | null {
    if (this.profile.name === null) {
      return null;
    }

    return this.profile.name.length >= 4 && this.profile.name.length <= 50;
  }

  public onSubmit($event: Event) {
    $event.preventDefault();
    DomUtil.removeFocus();

    this.form.setError(false);
    this.form.setResponse(null);
    this.form.setDisabled(true);

    this.$makeless.getHttp().patch('/api/auth/team/profile', this.profile, {
      headers: {
        'Team': this.$makeless.getSecurity().getTeam()!.id,
      },
    }).then((data) => {
      this.form.setResponse(this.$makeless.getHttp().response(data));
      this.form.setDisabled(false);
      Object.assign(this.$makeless.getSecurity().getTeam(), {
        name: this.form.getResponse()!.getData().data.name,
      });
    }).catch((data) => {
      this.form.setResponse(this.$makeless.getHttp().response(data.response));
      this.form.setError(true);
      this.form.setDisabled(false);
    });
  }
}
</script>
