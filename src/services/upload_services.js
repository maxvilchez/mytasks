import NetInfo from '@react-native-community/netinfo'
import api from './api'
import realm from './realm'

export default class UploadServices {
  static cursor;
  static data = [];

  static syncToServer() {
    NetInfo.isConnected.fetch().then(isConnected => {
      api.get('/todo/pull').then((res) => {
        if (res.todo) {
          this.cursor = 0
          this.data = realm.objects('Tasks').slice()
          this.uploadTasks()
        }
      })
    })
  }

  static uploadTasks() {
    if (this.cursor < this.data.length) {
      console.log('cursor: ' + this.cursor)
    }
  }
}
