export default class UsersSchema {
  static schema = {
    name: 'Users',
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
