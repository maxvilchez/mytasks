import styled from 'styled-components/native';
import {Button} from 'react-native-paper';
import {getBottomSpace} from './utils';

export const Container = styled.SafeAreaView`
  flex: 1;
`;

export const Section = styled.View`
  padding: 0px 20px;
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

export const InputContent = styled.View`
  margin-bottom: 10px;
`;

export const Footer = styled.View`
  position: absolute;
  padding: 10px 20px;
  bottom: ${getBottomSpace()}px;
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

export const BPrimary = styled(Button)`
  width: 136px;
  align-self: center;
  margin: 5px 0;
`;

/** ProfileScreen */

export const HeaderProfile = styled.View`
  padding: 15px 0px;
  align-items: center;
`;

export const FullNmae = styled.Text`
  font-size: 18px;
  font-weight: bold;
  text-align: center;
  margin-top: 10px;
  text-transform: capitalize;
`;

export const ChangePasswordText = styled.Text`
  text-align: center;
  color: #707070;
`;
