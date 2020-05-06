import styled from 'styled-components/native';
import {FAB as PaperFAB, IconButton} from 'react-native-paper';
import {getBottomSpace} from './../../config/utils';

export const Container = styled.SafeAreaView`
  flex: 1;
`;

export const SectionList = styled.SectionList`
  padding: 15px;
`;

export const SectionTitle = styled.Text`
  margin: 20px 0;
  font-size: 32px;
  text-transform: uppercase;
  color: #707070;
`;

export const FAB = styled(PaperFAB)`
  position: absolute;
  right: 20px;
  bottom: ${getBottomSpace() + 30}px;
`;

export const ModalContainer = styled.SafeAreaView`
  flex: 1;
`;

export const ModalHeader = styled.View`
  width: 100%;
  position: relative;
  padding-top: 15px;
`;

export const ModalTitle = styled.Text`
  text-align: center;
  font-size: 18px;
  text-transform: uppercase;
`;

export const ModalCloseButton = styled(IconButton)`
  position: absolute;
  top: 0;
  right: 10px;
`;

export const ModalBody = styled.View`
  flex: 1;
  padding: 15px;
`;

export const CenterContent = styled.View`
  flex: 1;
  justify-content: center;
  width: 85%;
  margin: auto;
`;

export const Form = styled.View`
  margin-top: 0px;
`;

export const FormControl = styled.View`
  display: flex;
  flex-direction: row;
  margin-bottom: 10px;
  margin-top: 10px;
`;

export const TextButton = styled.TouchableOpacity`
  margin-left: 15px;
`;

export const TextButtonTitle = styled.Text`
  width: 100%;
`;
