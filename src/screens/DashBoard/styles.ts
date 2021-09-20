import styled from 'styled-components/native' // Para pegar tipagens do Native

import { FlatList } from 'react-native'

import { RFPercentage, RFValue } from 'react-native-responsive-fontsize'
import { Feather } from '@expo/vector-icons'

import { DataListProps } from './'
import { BorderlessButton } from 'react-native-gesture-handler'

// lidar com espacamento no header do iphone ===> IphoneXhelper

export const Container = styled.View`
     flex: 1;
     background-color: ${({ theme }) => theme.colors.background};
`

export const Header = styled.View`
     width: 100%;
     background-color: ${({ theme }) => theme.colors.primary};

     /* I need to put px right in front */
     height: ${RFPercentage(42)}px;

     justify-content: center;
     align-items: flex-start;
     flex-direction: row;
`
export const UserWrapper = styled.View`
     width: 100%;
     /* 0 = x 24 = y */
     padding: 0 24px;

     flex-direction: row;
     justify-content: space-between;

     align-items: center;

     margin-top: ${RFValue(32)}px;
`
export const UserInfo = styled.View`
     align-items: center;
     flex-direction: row;
`

export const UserPhoto = styled.Image`
     width: ${RFValue(55)}px;
     height: ${RFValue(55)}px;
     border-radius: 10px;
`
export const User = styled.View`
     margin-left: 17px;
`

export const UserGreeting = styled.Text`
     color: ${({ theme }) => theme.colors.shape};

     font-size: ${RFValue(18)}px;
     font-family: ${({ theme }) => theme.fonts.regular};
`

export const UserName = styled.Text`
     color: ${({ theme }) => theme.colors.shape};

     font-size: ${RFValue(18)}px;
     font-family: ${({ theme }) => theme.fonts.bold};
`

export const PowerIcon = styled(Feather)`
     color: ${({ theme }) => theme.colors.secondary};
     font-size: ${RFValue(24)}px;
`

// Esse AttR é para pegar as props do component por aqui, sem ser somente de
export const Cards = styled.ScrollView.attrs({
     horizontal: true,
     showsHorizontalScrollIndicator: false,
     contentContainerStyle: { paddingHorizontal: 24 }, // dentro da scroll viewe
})`
     /* //Fazer ela pegar metade do Header */

     width: 100%;
     position: absolute;
     margin-top: ${RFPercentage(20)}px;
`

export const Transactions = styled.View`
     flex: 1;
     padding: 0 24px;
     margin-top: ${RFPercentage(12)}px;
`

export const Title = styled.Text`
     font-size: ${RFValue(18)}px;
     font-family: ${({ theme }) => theme.fonts.regular};

     margin-bottom: 16px;
`

// TOOOP
export const TransactionsList = styled(
     FlatList as new () => FlatList<DataListProps>
).attrs({
     showsVerticalScrollIndicator: false,
     contentContainerStyle: {
          paddingBottom: 10,
     },
})`
     flex: 1;
     
     margin-top: ${RFValue(12)}px;
`

export const LogoutButton = styled(BorderlessButton)`



`

export const LoadContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;