import { BaseHandler } from './baseHandler';
import { HandlerRegistratorCollector } from './handlerRegistratorCollector';

export class HandlerResolver {
  private handlers: Map<string, BaseHandler>;

  constructor(collector: HandlerRegistratorCollector) {
    this.handlers = collector.getHandlers();
  }

  public async resolve(
    method: HandlerRequestMethod,
    endpoint: string,
    request: Map<string, any>
  ): Promise<Map<string, any>> {
    const key = `${endpoint}/m?=${method}`;
    const handler = this.handlers.get(key);

    if (!handler) {
      throw new Error(
        `No handler found for endpoint: ${endpoint} and method: ${method}`
      );
    }

    return handler.handle(request);
  }
}
