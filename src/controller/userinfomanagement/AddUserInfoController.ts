import { UserInfo } from '../../core/entities/userinfomanagement/UserInfo';
import { UserInfoRepository } from '../../core/entities/userinfomanagement/UserInfoRepository';
import AddUserInfoHandler from '../../core/entities/userinfomanagement/handlers/AddUserInfoHandler';
import { DatabaseProvider } from '../../dataaccess/serviceprovider/DatabaseProvider';
import FirebaseAccessor from '../../dataaccess/serviceprovider/FirebaseAccessor';

export function AddUserInfo(data: UserInfo) {
  const databaseProvider = new DatabaseProvider(FirebaseAccessor.getDb());
  const repository = new UserInfoRepository(databaseProvider);
  const handler = new AddUserInfoHandler(repository);

  return handler.add(data);
}
