import Handler from '../handler';
import Data from '../data';

export default class Event {
  private eventSource: EventSource;

  constructor(host: string, path: string = '/api/auth/events') {
    this.eventSource = new EventSource(host + path, {
      withCredentials: true,
    });
  }

  protected parseEvent(event: any): Data {
    const obj = JSON.parse(event.data);

    return {
      id: obj.id,
      data: obj.data,
    };
  }

  public onOpen(handler: Handler): void {
    this.eventSource.onopen = (event: any) => {
      handler(this.parseEvent(event));
    };
  }

  public onError(handler: Handler): void {
    this.eventSource.onerror = (event: any) => {
      handler(this.parseEvent(event));
    };
  }

  public subscribe(channel: string, handler: Handler): void {
    this.eventSource.addEventListener(channel, ((event: any) => {
      handler(this.parseEvent(event));
    }));
  }
}
