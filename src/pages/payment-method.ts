import PaymentMethodComponent from '@/components/pages/PaymentMethod.vue';

export default class PaymentMethod {
  name: string = 'payment-method';
  path: string = '/settings/payment/payment-method';
  component: any = PaymentMethodComponent;
  meta: Object | null = {
    requiresAuth: true,
  };
}
