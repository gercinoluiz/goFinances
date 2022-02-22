import React from 'react'
import { ViewProps, Text } from 'react-native'
import { useTheme } from 'styled-components'
import {
     Container,
     Header,
     Title,
     Icon,
     Footer,
     Amount,
     LastTransaction,
} from './styles'

export interface CardProps extends ViewProps {

     
          name: string
          amount: string
          lastTransaction: string
          type:'up' | 'down' | 'total'
     
}


const icon = {
     up:'arrow-up-circle',
     down:'arrow-down-circle',
     total:'dollar-sign'
}

const Card = ({amount, lastTransaction, name, type}:CardProps) => {
     const theme = useTheme()

     return (
          <Container type={type} testID='amount-card'>
               <Header>
                    <Text style={{color:theme.colors.atention}}> Hello</Text>
                    <Title type={type}>{name}</Title>
                    <Icon name={icon[type]} type={type} ></Icon>
               </Header>
               <Footer>
                    <Amount type={type}>{amount}</Amount>
                    <LastTransaction type={type}>
                        {lastTransaction}
                    </LastTransaction>
               </Footer>
          </Container>
     )
}

export default Card
