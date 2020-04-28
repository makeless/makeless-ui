import {LocaleMessageObject} from 'vue-i18n';
import ProfileComponent from './../../../components/pages/settings/profile/Profile.vue';

export default class Profile {
  name: string = 'profile';
  path: string = '/settings/profile';
  component: any = ProfileComponent;
  messages: LocaleMessageObject | null = null;
  meta: Object | null = {
    requiresAuth: true,
  };
}
