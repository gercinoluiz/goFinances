import styled from 'styled-components/native' // Para pegar tipagens do Native
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize'
import { TextInput } from 'react-native'

export const Container = styled(TextInput)`
     width: 100%;
     background-color: ${({ theme }) => theme.colors.shape};
     padding: 18px;
     font-size: ${RFValue(15)}px;

     border-radius: 5px;
     margin-bottom: 8px;

     font-family: ${({ theme }) => theme.fonts.regular};

     color: ${({ theme }) => theme.colors.text_dark};
`

