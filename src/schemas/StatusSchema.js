export default class StatusSchema {
  static schema = {
    name: 'Status',
    primaryKey: 'id',
    properties: {
      id: { type: 'int', indexed: true },
      name: 'string',
      description: 'string',
      create_date: 'date',
      update_date: 'date'
    }
  }
}
