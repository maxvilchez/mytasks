import styled from 'styled-components/native'
import {
  Button,
  FAB as FABPaper,
  IconButton,
  Title as TitlePaper,
  TextInput,
  Text as TextPaper,
  HelperText as HelperTextPaper
} from 'react-native-paper'
import { getBottomSpace } from './utils'
import IconVectorIcons from 'react-native-vector-icons/MaterialCommunityIcons'

export const Icon = styled(IconVectorIcons)`
  color: #707070;
`

export const Text = styled(TextPaper)`
  font-size: 14px;
`

export const HelperText = styled(HelperTextPaper)`
  font-size: 12px;
`

export const Container = styled.SafeAreaView`
  flex: 1;
`

export const Section = styled.View`
  padding: 0px 20px;
`

export const CenterContent = styled.View`
  flex: 1;
  justify-content: center;
  width: 85%;
  margin: auto;
`

export const Form = styled.View`
  margin-top: 20px;
`

export const FormControl = styled.View`
  margin-bottom: 5px;
`

export const Input = styled(TextInput)`
  width: 100%;
`

export const Label = styled.View`
  display: flex;
  flex-direction: row;
  margin-top: 20px;
`

export const Footer = styled.View`
  position: absolute;
  padding: 10px 20px;
  bottom: ${getBottomSpace()}px;
  left: 0;
  right: 0;
`

export const Row = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`

export const Colum = styled.View`
  width: 48%;
`

export const Title = styled.Text`
  font-size: 32px;
  font-weight: bold;
`

export const SubTitle = styled.Text`
  font-size: 16px;
  font-weight: bold;
`

export const BPrimary = styled(Button)`
  margin: 5px 0;
  align-self: center;
`

export const ButtonText = styled.TouchableOpacity`
  margin-left: 15px;
`

export const ButtonTextTitle = styled.Text`
  width: 100%;
`

/** ProfileScreen */

export const HeaderProfile = styled.View`
  padding: 15px 0px;
  align-items: center;
`

export const FullNmae = styled.Text`
  font-size: 18px;
  font-weight: bold;
  text-align: center;
  margin-top: 10px;
  text-transform: capitalize;
`

export const ChangePasswordText = styled.Text`
  text-align: center;
  color: #707070;
`

/** HomeScreen */

export const FAB = styled(FABPaper)`
  position: absolute;
  right: 20px;
  bottom: ${getBottomSpace() + 30}px;
`

export const ModalContainer = styled.SafeAreaView`
  flex: 1;
`

export const ModalHeader = styled.View`
  width: 100%;
  position: relative;
  padding-top: 10px;
`

export const ModalTitle = styled(TitlePaper)`
  text-align: center;
`

export const ModalClose = styled(IconButton)`
  position: absolute;
  top: 0;
  right: 10px;
`

export const ModalBody = styled.View`
  flex: 1;
  padding: 15px;
`

export const SectionTitle = styled.Text`
  margin: 20px 0;
  font-size: 32px;
  text-transform: uppercase;
  color: #707070;
`
