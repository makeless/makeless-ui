import {Handler, SubscribeHandler} from '../handler';
import StdEvent from '../std';
import Data from '../data';

export default class Event {
  private readonly host: string;
  private readonly path: string;
  private eventSource: EventSource | null;

  constructor(host: string, path: string = '/api/auth/events') {
    this.host = host;
    this.path = path;
    this.eventSource = null;
  }

  protected parseMessageEvent(event: MessageEvent): Data {
    const obj = JSON.parse(event.data);

    return {
      id: obj.id,
      data: obj.data,
    };
  }

  public connect(): void {
    this.eventSource = new EventSource(this.host + this.path, {
      withCredentials: true,
    });
  }

  public onOpen(handler: Handler): void {
    this.eventSource!.onopen = (event: StdEvent) => {
      handler(event);
    };
  }

  public onError(handler: Handler): void {
    this.eventSource!.onerror = (event: StdEvent) => {
      handler(event);
    };
  }

  public subscribe(channel: string, handler: SubscribeHandler): void {
    this.eventSource!.addEventListener(channel, ((event: MessageEvent) => {
      handler(this.parseMessageEvent(event), event);
    }) as EventListener);
  }

  public close(): void {
    this.eventSource!.close();
  }
}
