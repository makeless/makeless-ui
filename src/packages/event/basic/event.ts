import {Handler as HandlerInterface, SubscribeHandler as SubscribeHandlerInterface} from '../handler';
import StdEventInterface from '../std';
import DataInterface from '../data';

export default class Event {
  private readonly host: string;
  private readonly path: string;
  private eventSource: EventSource | null;

  constructor(host: string, path: string = '/api/auth/event') {
    this.host = host;
    this.path = path;
    this.eventSource = null;
  }

  protected parseMessageEvent(event: MessageEvent): DataInterface {
    const obj = JSON.parse(event.data);

    return {
      channel: obj.channel,
      id: obj.id,
      data: obj.data,
    };
  }

  public isConnected(): boolean {
    return this.eventSource !== null;
  }

  public connect(): void {
    if (this.isConnected()) {
      return;
    }

    this.eventSource = new EventSource(this.host + this.path, {
      withCredentials: true,
    });
  }

  public onOpen(handler: HandlerInterface): void {
    if (!this.isConnected()) {
      return;
    }

    this.eventSource!.onopen = (event: StdEventInterface) => {
      handler(event);
    };
  }

  public onError(handler: HandlerInterface): void {
    if (!this.isConnected()) {
      return;
    }

    this.eventSource!.onerror = (event: StdEventInterface) => {
      handler(event);
    };
  }

  public subscribe(channel: string, handler: SubscribeHandlerInterface): void {
    if (!this.isConnected()) {
      return;
    }

    this.eventSource!.addEventListener(channel, ((event: MessageEvent) => {
      handler(this.parseMessageEvent(event), event);
    }) as EventListener);
  }

  public close(): void {
    if (!this.isConnected()) {
      return;
    }

    this.eventSource!.close();
    this.eventSource = null;
  }
}
