export abstract class BaseHandler {
  protected endpoint: string;

  protected method: HandlerRequestMethod;

  constructor() {
    this.method = HandlerRequestMethod.READ;
    this.endpoint = 'endpoint unimplemented';
  }

  public abstract handle(request: Map<string, any>): Promise<Map<string, any>>;

  public getEndpoint(): string {
    return this.endpoint;
  }

  public getEndpointMethod(): HandlerRequestMethod {
    return this.method;
  }
}
