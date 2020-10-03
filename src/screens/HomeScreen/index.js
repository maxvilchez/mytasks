import React from 'react'
import { Modal, Platform, Keyboard } from 'react-native'
import { TextInput, HelperText, Button } from 'react-native-paper'
import DateTimePicker from '@react-native-community/datetimepicker'
import moment from 'moment'
import { Formik } from 'formik'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { useSelector, useDispatch } from 'react-redux'

import {
  Container,
  FAB,
  ModalContainer,
  ModalHeader,
  ModalTitle,
  ModalCloseButton,
  ModalBody,
  CenterContent,
  TextButton,
  TextButtonTitle,
  Form,
  FormControl,
  SectionList,
  SectionTitle
} from './styles'
import realm from '../../services/realm'
import { NewTasksSchema } from '../../config/validations'
// import { tasksMapping } from '../../config/utils'

import TaskItem from './../../components/TaskItem'
import TasksActions from './../../redux/reducers/tasks'
import Tasks from './../../schemas/TasksSchema'

// console.tron.log(realm.path)

const HomeScreen = () => {
  const dispatch = useDispatch()

  const { user } = useSelector(state => state.sessionReducer)
  const { tasksSection } = useSelector(state => state.tasksReducer)

  const [stateFAB, setStateFAB] = React.useState(false)
  const [modal, setModal] = React.useState(false)

  const [date, setDate] = React.useState(new Date())
  const [time, setTime] = React.useState(new Date())

  const [showDate, setShowDate] = React.useState(false)
  const [showTime, setShowTime] = React.useState(false)

  // const [tasks, setTasks] = React.useState([])

  React.useLayoutEffect(() => {
    const data = realm.objects('Tasks')
    data.addListener((t, changes) => {
      // if (changes.insertions.length > 0) {
      //   _.forEach(changes.insertions, index => {
      //     // const d = _.orderBy(t, ['scheduled_date'], ['asc'])
      //     const d = realm.objects('Tasks').sorted('scheduled_date')
      //     _tasksMapping(d)
      //   })
      // }
      // if (changes.modifications.length > 0) {
      //   _.forEach(changes.modifications, index => {
      //     const d = _.orderBy(t, ['scheduled_date'], ['asc'])
      //     _tasksMapping(d)
      //   })
      // }
    })
  }, [tasksSection])

  React.useEffect(() => {
    dispatch(TasksActions.syncTaskRequest())
    // const data = Tasks.getTasks()
    // if (data.length) {
    //   const t = tasksMapping(data)
    //   console.tron.log(t)
    // }
    return () => {
      realm.removeAllListeners()
    }
  }, [])

  const closeModal = () => {
    setDate(new Date())
    setTime(new Date())
    setShowDate(false)
    setShowTime(false)
    setModal(false)
  }

  const save = values => {
    const totalTasks = realm.objects('Tasks').length

    let id = 1
    if (totalTasks > 0) {
      id = totalTasks + 1
    }

    const h = moment(time).get('hour')
    const m = moment(time).get('minute')

    const f = moment(date).set({ hour: h, minute: m })

    const data = {
      id,
      user_id: user.id,
      status_id: 1,
      case: '00' + id,
      description: values.description,
      scheduled_date: new Date(f),
      active: false,
      create_date: new Date()
    }

    Tasks.save(data)
    dispatch(TasksActions.saveTaskRequest(data)) // Action

    closeModal()
  }

  const onChangeDate = (event, selectedDate) => {
    const currentDate = selectedDate || date
    setShowDate(Platform.OS === 'ios')
    setDate(currentDate)
  }

  const onChangeTime = (event, selectedDate) => {
    const currentDate = selectedDate || date
    setShowTime(Platform.OS === 'ios')
    setTime(currentDate)
  }

  const onPressCheck = id => {
    const task = realm.objects('Tasks').filtered(`id=${id}`)
    const data = {
      id: task[0].id,
      user_id: task[0].user_id,
      status_id: task[0].status_id,
      case: task[0].case,
      description: task[0].description,
      scheduled_date: task[0].scheduled_date,
      active: task[0].active,
      create_date: task[0].create_date
    }

    console.log(data)

    // dispatch({ type: SYNC_FETCH_REQUEST, payload: data })
  }

  const syncTask = () => {
    dispatch(TasksActions.syncTaskRequest())
  }

  return (
    <Container>
      <SectionList
        sections={tasksSection}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <TaskItem details={item} onPressCheck={onPressCheck} />
        )}
        renderSectionHeader={({ section: { title } }) => (
          <SectionTitle>{title}</SectionTitle>
        )}
      />
      <FAB.Group
        open={stateFAB}
        icon={'calendar'}
        actions={[
          { icon: 'plus', onPress: () => setModal(true) },
          { icon: 'sync', onPress: () => syncTask() }
        ]}
        onStateChange={({ open }) => setStateFAB(open)}
        onPress={() => {
          if (stateFAB) {
            // do something if the speed dial is open
          }
        }}
      />
      <Modal visible={modal} animationType="slide">
        <ModalContainer>
          <ModalHeader>
            <ModalTitle>Nueva Tarea</ModalTitle>
            <ModalCloseButton icon="close" size={26} onPress={closeModal} />
          </ModalHeader>
          <ModalBody>
            <CenterContent>
              <Form>
                <Formik
                  initialValues={{ description: '' }}
                  onSubmit={save}
                  validationSchema={NewTasksSchema}>
                  {({ handleChange, values, handleSubmit, errors, isValid }) => (
                    <>
                      <TextInput
                        label="¿Cuáles son sus planes?"
                        mode="outlined"
                        value={values.description}
                        name="description"
                        onChangeText={handleChange('description')}
                      />
                      <HelperText type="error" visible>
                        {errors.description}
                      </HelperText>

                      <FormControl>
                        <Icon name="calendar-month" size={20} />
                        <TextButton
                          onPress={() =>
                            setShowDate(() => {
                              Keyboard.dismiss()
                              return true
                            })
                          }>
                          <TextButtonTitle>
                            {moment(date).format('DD-MM-YYYY')}
                          </TextButtonTitle>
                        </TextButton>
                      </FormControl>

                      {showDate && (
                        <DateTimePicker
                          testID="datePicker"
                          value={date}
                          mode="datetime"
                          display="default"
                          onChange={onChangeDate}
                        />
                      )}

                      <FormControl>
                        <Icon name="calendar-clock" size={20} />
                        <TextButton
                          onPress={() =>
                            setShowTime(() => {
                              Keyboard.dismiss()
                              return true
                            })
                          }>
                          <TextButtonTitle>
                            {moment(time).format('h:mm a')}
                          </TextButtonTitle>
                        </TextButton>
                      </FormControl>

                      {showTime && (
                        <DateTimePicker
                          testID="timePicker"
                          value={time}
                          mode="time"
                          is24Hour={true}
                          display="default"
                          onChange={onChangeTime}
                        />
                      )}
                      <Button onPress={handleSubmit} disabled={!isValid}>
                        Save
                      </Button>
                    </>
                  )}
                </Formik>
              </Form>
            </CenterContent>
          </ModalBody>
        </ModalContainer>
      </Modal>
    </Container>
  )
}

export default HomeScreen
