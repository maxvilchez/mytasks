import React from 'react'
import { Checkbox } from 'react-native-paper'
import moment from 'moment'

import {
  Container,
  ContentLeft,
  ContentRight,
  Content,
  Case,
  Description,
  TimeText
} from './styles'

export default function TaskItem({ details, onPressCheck }) {
  return (
    <Container>
      <ContentLeft>
        <Checkbox
          status={details.active ? 'checked' : 'indeterminate'}
          onPress={() => onPressCheck(details.id)}
        />
      </ContentLeft>
      <ContentRight>
        <Content>
          <Case>
            {details.case}
            {!details.server_id && ' - sync'}
          </Case>
          <Description numberOfLines={1}>{details.description}</Description>
        </Content>
        <TimeText>{moment(details.scheduled_date).format('LT')}</TimeText>
      </ContentRight>
    </Container>
  )
}
