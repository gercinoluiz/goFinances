import { RFValue } from 'react-native-responsive-fontsize'
import styled from 'styled-components/native' // Para pegar tipagens do Native

// lidar com espacamento no header do iphone ===> IphoneXhelper

export const Container = styled.View`
     background-color: ${({ theme }) => theme.colors.background};
     flex: 1;
`
export const Header = styled.View`
     height: ${RFValue(113)}px;
     background-color: ${({ theme }) => theme.colors.primary};
     width: 100%;
     align-items: center;
     padding-bottom: 19px;
     justify-content: flex-end;
`

export const Title = styled.Text`
     color: ${({ theme }) => theme.colors.shape};
     font-family: ${({ theme }) => theme.fonts.regular};
     font-size: ${RFValue(18)}px;
`
export const Form = styled.View`
     width: 100%;
     padding: 24px;
     flex: 1;

     justify-content: space-between;
`

export const Fields = styled.View``

export const TransactioTypesContainer = styled.View`
     flex-direction: row;

     justify-content: space-between;
     margin-top:18px
`
