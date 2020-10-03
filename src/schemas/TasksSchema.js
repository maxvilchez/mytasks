import realm from './../services/realm'

class Tasks {
  static getTasks() {
    try {
      const data = realm.objects('Tasks').sorted('scheduled_date')
      return data
    } catch (error) {
      console.log('Error al obtener las tareas')
    }
  }

  static save(data) {
    try {
      realm.write(() => {
        realm.create('Tasks', data)
      })
    } catch (error) {
      console.log('Error al guardar una tarea')
    }
  }

  static update(uuid, id) {
    try {
      realm.write(() => {
        realm.create('Tasks', { id: uuid, server_id: id }, 'modified')
      })
    } catch (error) {
      console.log('Error al sync la tarea taskId: ' + uuid)
    }
  }
}

Tasks.schema = {
  name: 'Tasks',
  primaryKey: 'id',
  properties: {
    id: { type: 'int', indexed: true },
    server_id: 'int?',
    case: 'string',
    description: 'string',
    scheduled_date: 'date',
    active: { type: 'bool', default: false },
    status_id: { type: 'int', default: 1 },
    create_date: 'date',
    update_date: 'date?'
  }
}

export default Tasks
