import BaseRepository from '../../repository/baseRepository';
import { BaseHandlerRegistrator } from '../../service-locator-sdk/baseHandlerRegistrator';
import { AddUserInfoHandler } from './handlers/addUserInfoHandler';

export class UserInfoRegistrator extends BaseHandlerRegistrator {
  constructor(db: BaseRepository) {
    super();
    this.handlers.push(new AddUserInfoHandler(db));
  }
}
