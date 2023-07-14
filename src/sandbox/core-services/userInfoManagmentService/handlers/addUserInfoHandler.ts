import BaseRepository from '../../../repository/baseRepository';
import { BaseHandler } from '../../../service-locator-sdk/baseHandler';
import { UserInfoRepositoryInteractor } from '../userInfoRepositoryInteractor';

export class AddUserInfoHandler extends BaseHandler {
  private readonly interactor: UserInfoRepositoryInteractor;

  constructor(db: BaseRepository) {
    super();

    this.method = HandlerRequestMethod.CREATE;
    this.endpoint = '/api/userinfo';
    this.interactor = new UserInfoRepositoryInteractor(db);
  }

  public handle(request: Map<string, any>): Promise<Map<string, any>> {
    const res = new Map<string, any>();

    const firstName = request.get('firstName');
    const lastName = request.get('lastName');

    try {
      const id = this.interactor.add({
        firstName: firstName,
        lastName: lastName,
      });

      res.set('status', 200);
      res.set('body', {
        id: id,
      });
      return Promise.resolve(res);
    } catch (error) {
      res.set('status', 500);
      res.set('message', 'internal server error: ' + error);
      return Promise.reject(res);
    }
  }
}
