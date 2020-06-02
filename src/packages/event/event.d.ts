import {Handler as HandlerInterface, SubscribeHandler as SubscribeHandlerInterface} from './handler';

export default interface Event {
  isConnected(): boolean

  connect(): void

  onOpen(handler: HandlerInterface): void

  onError(handler: HandlerInterface): void

  subscribe(channel: string, handler: SubscribeHandlerInterface): void

  close(): void
}
