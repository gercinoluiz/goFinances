import styled, {css} from 'styled-components/native' // Para pegar tipagens do Native

import { RFPercentage, RFValue } from 'react-native-responsive-fontsize'
import { Feather } from '@expo/vector-icons'

interface TypeProps{
     type:'up' | 'down' | 'total'

}

export const Container = styled.View<TypeProps>`


     background-color: ${({ theme, type }) => type === 'total'? theme.colors.secondary : theme.colors.shape};
     width: ${RFValue(300)}px;
     border-radius: 5px;
     padding: 19px 23px;
     padding-bottom: ${RFValue(42)}px;
     margin-right: 16px;


     ${(props)=> props.type === 'total' && css`
     
     background-color: ${({ theme }) => theme.colors.secondary};
     `}

`

export const Header = styled.View`
     /* width: 100%; */
     /* background-color: ${({ theme }) => theme.colors.primary}; */

     justify-content: space-between;

     flex-direction: row;
`

export const Title = styled.Text<TypeProps>`
     font-family: ${({ theme }) => theme.fonts.regular};
     font-size: ${RFValue(14)}px;
     color: ${({ theme }) => theme.colors.text_dark};

     color: ${({ theme, type }) => type === 'total'? theme.colors.shape : theme.colors.text_dark};
     
`

export const Icon = styled(Feather)<TypeProps>`
     font-size: ${RFValue(40)}px;

     ${(props)=> props.type === 'up' && css`
     
     color: ${({ theme }) => theme.colors.success};
     `}
     ${(props)=> props.type === 'down' && css`
     
     color: ${({ theme }) => theme.colors.atention};
     `}
     ${(props)=> props.type === 'total' && css`
     
     color: ${({ theme }) => theme.colors.shape};
     `}




`

export const Footer = styled.View``

export const Amount = styled.Text<TypeProps>`
     font-family: ${({ theme }) => theme.fonts.medium};
     font-size: ${RFValue(32)}px;
     color: ${({ theme, type }) => type === 'total'? theme.colors.shape : theme.colors.text_dark};
     margin-top: 38px;
`

export const LastTransaction = styled.Text<TypeProps>`
     font-family: ${({ theme }) => theme.fonts.regular};
     font-size: ${RFValue(12)}px;
     color: ${({ theme, type }) => type === 'total'? theme.colors.shape : theme.colors.text};
`
