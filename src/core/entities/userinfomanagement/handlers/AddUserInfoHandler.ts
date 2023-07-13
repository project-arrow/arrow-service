import { randomUUID } from 'crypto';
import { UserInfo } from '../UserInfo';
import { UserInfoRepository } from '../UserInfoRepository';

export default class AddUserInfoHandler {
  private readonly repository: UserInfoRepository;

  constructor(repository: UserInfoRepository) {
    this.repository = repository;
  }

  add(data: UserInfo) {
    return this.repository.add(data);
  }
}
