import {LocaleMessageObject} from 'vue-i18n';
import ProfileComponent from './../../../components/pages/settings/profile/Profile.vue';
import messages from './../../../messages/pages/settings/profile/profile.json';

export default class Profile {
  name: string = 'profile';
  path: string = '/settings/profile';
  component: any = ProfileComponent;
  messages: LocaleMessageObject | null = messages;
  meta: Object | null = {
    requiresAuth: true,
  };
}
