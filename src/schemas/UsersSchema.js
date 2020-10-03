import realm from './../services/realm'

class Users {
  static getUsers() {
    try {
      const users = realm.objects('Users')
      return users
    } catch (error) {
      console.log('Error al obtener los usuarios')
    }
  }
}

Users.schema = {
  name: 'Users',
  primaryKey: 'id',
  properties: {
    id: { type: 'int', indexed: true },
    fullname: 'string',
    email: 'string',
    age: 'string?',
    phone: 'string?',
    password: 'string'
  }
}

export default Users
