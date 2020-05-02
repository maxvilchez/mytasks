import Realm from 'realm';

import UsersSchema from './../schemas/UsersSchema';
import TasksSchema from './../schemas/TasksSchema';
import StatusSchema from './../schemas/StatusSchema';

export default function getRealm() {
  return Realm.open({
    path: 'mytasks.realm',
    schema: [StatusSchema, TasksSchema, UsersSchema],
    schemaVersion: 1,
  });
}
