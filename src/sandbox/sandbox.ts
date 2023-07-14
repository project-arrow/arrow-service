import { UserInfoRegistrator } from './core-services/userInfoManagmentService/userInfoRegistrator';
import { FirebaseRepository } from './data/firebaseRepository';
import { HandlerRegistratorCollector } from './service-locator-sdk/handlerRegistratorCollector';
import { HandlerResolver } from './service-locator-sdk/handlerResolver';

export default async function sandbox() {
  const db: FirebaseRepository = new FirebaseRepository();

  const collector = new HandlerRegistratorCollector([
    new UserInfoRegistrator(db),
  ]);

  const resolver = new HandlerResolver(collector);

  const request = new Map<string, any>();
  request.set('firstName', 'John');
  request.set('lastName', 'doe');

  const res = await resolver.resolve(
    HandlerRequestMethod.CREATE,
    '/api/userinfo',
    request
  );

  console.log(res.get('body')['id']);
}
