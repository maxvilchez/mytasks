import styled from 'styled-components/native';
import {getBottomSpace} from './../../config/utils';

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

export const Form = styled.View`
  margin-top: 20px;
`;

export const FormControl = styled.View`
  margin-bottom: 5px;
`;

export const Footer = styled.View`
  position: absolute;
  padding: 10px 20px;
  bottom: ${getBottomSpace()}px;
  left: 0;
  right: 0;
`;

export const Title = styled.Text`
  font-size: 32px;
  font-weight: bold;
`;

export const SubTitle = styled.Text`
  font-size: 16px;
  font-weight: bold;
`;
