import { RFValue } from 'react-native-responsive-fontsize'
import styled from 'styled-components/native' // Para pegar tipagens do Native

export const Container = styled.TouchableOpacity`
     background-color: ${({ theme }) => theme.colors.secondary};
     width: 100%;
     border-radius: 5px;
     align-items: center;
`

export const Title = styled.Text`
     font-family: ${({ theme }) => theme.fonts.medium};
     font-size: ${RFValue(14)}px;
     color: ${({ theme }) => theme.colors.shape};

     padding: 18px;
`


