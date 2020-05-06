import React from 'react';
import {Checkbox} from 'react-native-paper';
import moment from 'moment';

import {
  Container,
  ContentLeft,
  ContentRight,
  Content,
  Case,
  Description,
  TimeText,
} from './styles';

function TaskItem({details}) {
  return (
    <Container>
      <ContentLeft>
        <Checkbox status={'checked'} />
      </ContentLeft>
      <ContentRight>
        <Content>
          <Case>{details.case_num}</Case>
          <Description numberOfLines={1}>{details.description}</Description>
        </Content>
        <TimeText>{moment(details.date).format('LT')}</TimeText>
      </ContentRight>
    </Container>
  );
}

export default TaskItem;
