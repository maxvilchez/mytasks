import styled from 'styled-components/native';
import {Button} from 'react-native-paper';

export const Container = styled.View`
  flex: 1;
`;

export const Section = styled.View`
  padding: 20px 20px 0 20px;
`;

export const CenterContent = styled.View`
  flex: 1;
  justify-content: center;
  width: 85%;
  margin: auto;
`;

export const FormContent = styled.View`
  margin-top: 20px;
`;

export const Footer = styled.View`
  position: absolute;
  padding: 10px 20px;
  bottom: 0;
  left: 0;
  right: 0;
`;

export const Row = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const Colum = styled.View`
  width: 48%;
`;

export const Title = styled.Text`
  font-size: 32px;
  font-weight: bold;
`;

export const SubTitle = styled.Text`
  font-size: 16px;
  font-weight: bold;
`;

export const BPrimaryLogin = styled(Button)`
  width: 136px;
  align-self: flex-end;
`;
