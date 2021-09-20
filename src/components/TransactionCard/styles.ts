import styled, { css } from 'styled-components/native' // Para pegar tipagens do Native

import { RFPercentage, RFValue } from 'react-native-responsive-fontsize'
import { Feather } from '@expo/vector-icons'
import { BorderlessButton } from 'react-native-gesture-handler'
import { View } from 'react-native'

interface TransactionProps {
     type: 'positive' | 'negative'
}

export const Container = styled.View`
     /* width: ${RFValue(300)}px; */
     border-radius: 5px;
     padding: 17px 24px;

     /* margin-right: 16px; */

     background-color: ${({ theme }) => theme.colors.shape};

     margin-bottom: 16px;
`

export const Title = styled.Text`
     font-size: ${RFValue(14)}px;

     font-family: ${({ theme }) => theme.fonts.regular};
`

export const Amount = styled.Text<TransactionProps>`
     margin-top: 2px;

     font-size: ${RFValue(20)}px;
     font-family: ${({ theme }) => theme.fonts.regular};

     color: ${({ theme, type }) =>
          type === 'positive' ? theme.colors.success : theme.colors.atention};
`

export const Footer = styled.View`
     flex-direction: row;
     justify-content: space-between;
     align-items: center;
     margin-top: 19px;
`

export const Category = styled.Text`
     
     flex-direction: row;
     
     width:100px;
     
     
`

export const Icon = styled(Feather)`
     font-size: ${RFValue(20)}px;

     color: ${({ theme }) => theme.colors.text};
     
`

export const CategoryName = styled.Text`
     font-size: ${RFValue(14)}px;

     color: ${({ theme }) => theme.colors.text};
     margin-left:auto;
     

`

export const Date = styled.Text`
     font-size: ${RFValue(14)}px;

     color: ${({ theme }) => theme.colors.text};
`
export const RemoveButton = styled(BorderlessButton)``

export const TitleContainer = styled.View`

     justify-content: space-between;
     flex-direction:row
`
