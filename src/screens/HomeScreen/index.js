import React from 'react';
import {Modal, Platform, Keyboard} from 'react-native';
import {TextInput, HelperText, Button} from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import {Formik} from 'formik';
import _ from 'lodash';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useSelector} from 'react-redux';

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
  SectionTitle,
} from './styles';
import realm from '../../services/realm';
import {NewTasksSchema} from '../../config/validations';
import {calendarFormats} from '../../config/utils';

import TaskItem from './../../components/TaskItem';

const HomeScreen = () => {
  const {user} = useSelector(state => state.signIn);

  const [modal, setModal] = React.useState(false);
  const [date, setDate] = React.useState(new Date());
  const [showDateTime, setShowDateTime] = React.useState(false);
  const [tasks, setTasks] = React.useState([]);

  React.useLayoutEffect(() => {
    const data = realm.objects('Tasks');
    data.addListener((t, changes) => {
      _.forEach(changes.insertions, index => {
        const d = _.orderBy(t, ['date'], ['asc']);
        _tasksMapping(d);
      });
    });
  }, [tasks]);

  React.useEffect(() => {
    const data = realm.objects('Tasks').sorted('date');
    _tasksMapping(data);
    return () => {
      data.removeAllListeners();
    };
  }, []);

  const _tasksMapping = data => {
    const groups = _.groupBy(data, task =>
      moment(task.date).calendar(calendarFormats),
    );

    let tsks = [];

    _.forEach(groups, (value, key) => {
      let item;
      item = _.assign(item, {
        title: key,
        data: groups[key],
      });
      tsks.push(item);
    });

    setTasks(tsks);
  };

  const closeModal = () => {
    setModal(false);
    setDate(new Date());
    setShowDateTime(false);
  };

  const save = values => {
    const totalTasks = realm.objects('Tasks').length;

    let id = 1;
    if (totalTasks > 0) {
      id = totalTasks + 1;
    }

    const data = {
      id,
      user_id: user.id,
      case_num: '001',
      description: values.description,
      date,
      create_date: new Date(),
    };

    realm.write(function() {
      realm.create('Tasks', data);
    });

    closeModal();
  };

  const onChangeDate = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDateTime(Platform.OS === 'ios');
    setDate(currentDate);
  };

  return (
    <Container>
      <SectionList
        sections={tasks}
        keyExtractor={item => item.id}
        renderItem={({item}) => <TaskItem details={item} />}
        renderSectionHeader={({section: {title}}) => (
          <SectionTitle>{title}</SectionTitle>
        )}
      />
      <FAB icon="plus" onPress={() => setModal(true)} />
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
                  initialValues={{description: ''}}
                  onSubmit={save}
                  validationSchema={NewTasksSchema}>
                  {({handleChange, values, handleSubmit, errors, isValid}) => (
                    <>
                      <TextInput
                        label="¿Cuáles son sus planes?"
                        mode="outlined"
                        multiline
                        value={values.description}
                        name="description"
                        onChangeText={handleChange('description')}
                      />
                      <HelperText type="error" visible>
                        {errors.description}
                      </HelperText>

                      <FormControl>
                        <Icon name="calendar-clock" size={20} />
                        <TextButton
                          onPress={() =>
                            setShowDateTime(() => {
                              Keyboard.dismiss();
                              return true;
                            })
                          }>
                          <TextButtonTitle>
                            {moment(date).format('LLL')}
                          </TextButtonTitle>
                        </TextButton>
                      </FormControl>

                      {showDateTime && (
                        <DateTimePicker
                          testID="dateTimePicker"
                          value={date}
                          mode="datetime"
                          is24Hour={true}
                          display="default"
                          onChange={onChangeDate}
                        />
                      )}

                      <FormControl>
                        <Icon name="checkbox-multiple-marked" size={20} />
                        <TextButton>
                          <TextButtonTitle>Pendiente</TextButtonTitle>
                        </TextButton>
                      </FormControl>
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
  );
};

export default HomeScreen;
