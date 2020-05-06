export default class TasksSchema {
  static schema = {
    name: 'Tasks',
    primaryKey: 'id',
    properties: {
      id: {type: 'int', indexed: true},
      user_id: 'int',
      status_id: {type: 'int', default: 1},
      case_num: 'string',
      description: 'string',
      date: 'date',
      create_date: 'date',
      update_date: 'date?',
    },
  };
}
