import Handler from './handler';

export default interface Event {
  onOpen(handler: Handler): void

  onError(handler: Handler): void

  subscribe(channel: string, handler: Handler): void
}
