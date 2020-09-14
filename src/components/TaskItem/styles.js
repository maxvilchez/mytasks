import styled from 'styled-components/native'

export const Container = styled.View`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 15px;
`

export const ContentLeft = styled.View`
  margin: 0px 10px;
`

export const ContentRight = styled.View`
  flex: 1;
  padding: 10px 0;
  border-bottom-color: #707070;
  border-bottom-width: 1px;
  display: flex;
  flex-direction: row;
  align-items: center;
`

export const Content = styled.View`
  flex: 1;
`

export const Case = styled.Text`
  font-weight: bold;
`

export const Description = styled.Text`
  font-weight: normal;
  flex: 1;
`

export const TimeText = styled.Text`
  font-weight: bold;
`
