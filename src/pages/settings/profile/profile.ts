import {LocaleMessageObject} from 'vue-i18n';
import ProfileComponent from './../../../components/pages/settings/profile/Profile.vue';
import messages from './../../../messages/pages/settings/profile/profile.json';
import Page from '../../page';
import {VueConstructor} from 'vue';

export default class Profile extends Page {
  name: string = 'profile';
  path: string = '/settings/profile';
  component: VueConstructor = ProfileComponent;
  messages: LocaleMessageObject | null = messages;
  meta: any | null = {
    requiresAuth: true,
  };
}
