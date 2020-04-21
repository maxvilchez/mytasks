export default class UserSchema {
  static schema = {
    name: 'User',
    primaryKey: 'id',
    properties: {
      id: {type: 'int', indexed: true},
      fullname: 'string',
      email: 'string',
      age: 'string?',
      phone: 'string?',
      password: 'string',
    },
  };
}
