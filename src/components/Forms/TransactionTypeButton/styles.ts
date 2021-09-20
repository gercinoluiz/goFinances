import styled, { css } from 'styled-components/native' // Para pegar tipagens do Native
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize'
import { TextInput } from 'react-native'
import { Feather } from '@expo/vector-icons'
import { BorderlessButton, RectButton } from 'react-native-gesture-handler'

interface TransactionProps {
     title?: string
     type?: 'positive' | 'negative'

     isActive: boolean
}

export const Container = styled.TouchableOpacity<TransactionProps>`
     width: 48%;
     /* background-color: ${({ theme }) => theme.colors.shape}; */

     flex-direction: row;
     align-items: center;

     border-width: ${({ isActive }) => (isActive ? 0 : 1.5)}px;
     border-style: solid;
     border-color: ${({ theme }) => theme.colors.text};

     border-radius: 5px;

     padding: 16px;

     justify-content: center;

     ${({ isActive, type }) =>
          isActive &&
          type === 'positive' &&
          css`
               background-color:  ${({ theme }) => theme.colors.atention_light};
          `};

     ${({ isActive, type }) =>
          isActive &&
          type === 'positive' &&
          css`
               background-color:   ${({ theme }) => theme.colors.sucess_light};
          `};

     /* color: ${({ theme }) => theme.colors.text_dark}; */
`

export const Title = styled.Text`
     font-family: ${({ theme }) => theme.fonts.regular};
     font-size: ${RFValue(14)}px;
`

export const Icon = styled(Feather)<TransactionProps>`
     font-size: ${RFValue(24)}px;
     margin-right: 12px;

     color: ${({ theme, type }) =>
          type === 'positive' ? theme.colors.success : theme.colors.atention};
`
