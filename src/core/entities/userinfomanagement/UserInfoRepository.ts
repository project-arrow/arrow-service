import BaseRepository from '../../repositories/BaseRepositories';
import BaseDatabaseProvider from '../../services/databaseprovider/BaseDatabaseProvider ';
import { UserInfo } from './UserInfo';

export class UserInfoRepository extends BaseRepository<UserInfo> {
  constructor(db: BaseDatabaseProvider) {
    super(db);
    this.collectionPath = 'user.info';
  }
}
