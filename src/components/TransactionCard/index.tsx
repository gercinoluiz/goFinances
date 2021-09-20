import React from 'react'
import { categories } from '../../ultils/categories'
import { EvilIcons } from '@expo/vector-icons'
import {
     Container,
     Title,
     Amount,
     Footer,
     Category,
     Icon,
     CategoryName,
     Date,
     TitleContainer,
     RemoveButton,
} from './styles'

// interface Category {
//      icon: string
//      name: string
// }

export interface TransactionCardProps {
     type: 'positive' | 'negative'
     name: string
     amount: string
     date: string
     category: string
}

interface Props {
     data: TransactionCardProps
     onPress: () => void
}

const TransactionCard = ({ data, onPress }: Props) => {
     const { amount, category, date, name, type } = data

     const categoryIcon = categories.filter((item) => item.key === category)[0]

     return (
          <Container>
               <Title>{name}</Title>
               <TitleContainer>
                    <Amount type={type}>
                         {type === 'negative' && '- '}

                         {amount}
                    </Amount>
                    <RemoveButton onPress={onPress}>
                         <EvilIcons name='trash' size={28} color='black' />
                    </RemoveButton>
               </TitleContainer>
               <Footer>
                    <Category>
                         <Icon name={categoryIcon?.icon } />
                         <CategoryName>{categoryIcon?.name}</CategoryName>
                    </Category>
                    <Date>{date}</Date>
               </Footer>
          </Container>
     )
}

export default TransactionCard
