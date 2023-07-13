import { AddUserInfo } from '../src/controller/userinfomanagement/AddUserInfoController';
import { UserInfo } from '../src/core/entities/userinfomanagement/UserInfo';

describe('userInfoManagement module', () => {
  test('add userInfo to the database', () => {
    const data: UserInfo = {
      firstName: 'john',
      lastName: 'doe',
      phone: 639474734893,
      email: 'johndoe@example',
      photoUrl: 'someUrl',
    };

    return AddUserInfo(data).then((id) => {
      expect(id).not.toBeUndefined();
      console.log(id);
    });
  });
});
