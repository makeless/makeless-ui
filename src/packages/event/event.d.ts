import {Handler, SubscribeHandler} from './handler';

export default interface Event {
  isConnected(): boolean

  connect(): void

  onOpen(handler: Handler): void

  onError(handler: Handler): void

  subscribe(channel: string, handler: SubscribeHandler): void

  close(): void
}
