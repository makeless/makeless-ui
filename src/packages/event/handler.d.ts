import StdEvent from './std';
import Data from './data';

interface Handler {
  (event: StdEvent): void
}

interface SubscribeHandler {
  (data: Data, event: MessageEvent): void
}

export {
  Handler,
  SubscribeHandler,
};
