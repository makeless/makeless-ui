import StdEventInterface from './std';
import DataInterface from './data';

interface Handler {
  (event: StdEventInterface): void
}

interface SubscribeHandler {
  (data: DataInterface, event: MessageEvent): void
}

export {
  Handler,
  SubscribeHandler,
};
