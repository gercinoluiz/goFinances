import AsyncStorage from '@react-native-async-storage/async-storage'
import { useFocusEffect } from '@react-navigation/native' // Top Library to useEffect when changin from one tab to another
import {  parseISO, intlFormat } from 'date-fns'
import React, { useCallback, useEffect, useState } from 'react'
import { ActivityIndicator } from 'react-native'
import { useTheme } from 'styled-components'
import Card from '../../components/Card'
import TransactionCard, {
     TransactionCardProps,
} from '../../components/TransactionCard'
import { useAuth } from '../../hooks/AuthContext'
import {
     Cards,
     Container,
     Header,
     LogoutButton,
     PowerIcon,
     Title,
     Transactions,
     TransactionsList,
     User,
     UserGreeting,
     UserInfo,
     UserName,
     UserPhoto,
     UserWrapper,
} from './styles'

export interface DashBoardProps {}

export interface DataListProps extends TransactionCardProps {
     id: string
}

interface HighlightProps {
     amount: string
     lastTransaction: string
}

interface HighlightData {
     entries: HighlightProps
     expenses: HighlightProps
     total: HighlightProps
}

const DashBoard = () => {
     const { user, logOut } = useAuth()

     const dataKey = `@gofinances:transactions_user:${user.id}`
     const [isLoading, setIsLoading] = useState(true)
     const [data, setData] = useState<DataListProps[]>([])
     const [dataToSave, setDataToSave] = useState<DataListProps[]>([])

     const handleLogOut = async () => {
          await logOut()
     }

     const [highlightData, setHighlightData] = useState<HighlightData>(
          {} as HighlightData
     )

     const theme = useTheme()

     function getLastTransacionDate(
          collection: DataListProps[],
          type: 'positive' | 'negative'
     ) {
          const lastTransaction = new Date(
               Math.max.apply(
                    Math,
                    collection
                         .filter((transaction) => transaction.type === type)
                         .map((transaction) =>
                              new Date(transaction.date).getTime()
                         )
               )
          )

          if (isNaN(Number(lastTransaction))) {
               return ''
          }

          return `${lastTransaction?.getDate()} de ${lastTransaction.toLocaleString(
               'pt-BR',
               { month: 'long' }
          )}`
     }

     let entriesTotal = 0
     let expensesTotal = 0

     async function loadTransactions() {
          try {
               const response = await AsyncStorage.getItem(dataKey)

               const transactions = response ? JSON.parse(response) : []

               setDataToSave(transactions)


               const formatedTransactions: DataListProps[] = transactions.map(
                    (transaction: DataListProps) => {
                         if (transaction.type === 'positive') {
                              entriesTotal += Number(transaction.amount)
                         } else {
                              expensesTotal += Number(transaction.amount)
                         }

                         const amount = Number(
                              transaction.amount
                         ).toLocaleString('pt-BR', {
                              style: 'currency',
                              currency: 'BRL',
                         })

                   

                         const date = intlFormat(parseISO(transaction.date),{
                              year:'numeric',
                              month:'long',
                              day:'2-digit'
                         })

                         return {
                              id: transaction.id,
                              name: transaction.name,
                              type: transaction.type,
                              amount,
                              category: transaction.category,
                              date: date,
                         }
                    }
               )

               setData(formatedTransactions)

               const lastTransactionPositive = getLastTransacionDate(
                    transactions,
                    'positive'
               )
               const lastTransactionNegative = getLastTransacionDate(
                    transactions,
                    'negative'
               )
               const totalInterval = `01 a ${lastTransactionNegative}`

               const total = entriesTotal - expensesTotal

               console.log({ entriesTotal, expensesTotal, total })

               setHighlightData({
                    entries: {
                         amount: entriesTotal.toLocaleString('pt-BR', {
                              style: 'currency',
                              currency: 'BRL',
                         }),
                         lastTransaction: `Última entrada dia ${lastTransactionPositive}`,
                    },
                    expenses: {
                         amount: expensesTotal.toLocaleString('pt-BR', {
                              style: 'currency',
                              currency: 'BRL',
                         }),
                         lastTransaction: `Última saída dia ${lastTransactionNegative}`,
                    },
                    total: {
                         amount: total.toLocaleString('pt-BR', {
                              style: 'currency',
                              currency: 'BRL',
                         }),
                         lastTransaction: totalInterval,
                    },
               })

               setIsLoading(false)
          } catch (error) {
               console.log({ error })
          }
     }

     const handleRemoveItem = async (id: string) => {

          const newData = data.filter((item) => item.id !== id)
          const newDatatoSave = dataToSave.filter((item) => item.id !== id)

          await AsyncStorage.setItem(dataKey, JSON.stringify(newDatatoSave))

          setData(newData)
     }
     ;-useEffect(() => {
          loadTransactions()
     }, [data])

     useFocusEffect(
          useCallback(() => {
               loadTransactions()
          }, [])
     )

     return (
          <Container>
               {isLoading ? (
                    <ActivityIndicator />
               ) : (
                    <>
                         <Header>
                              <UserWrapper>
                                   <UserInfo>
                                        <UserPhoto
                                             source={{
                                                  uri: user.photo,
                                             }}
                                        />
                                        <User>
                                             <UserGreeting>
                                                  Wellcome,{' '}
                                             </UserGreeting>
                                             <UserName>{user?.name}</UserName>
                                        </User>
                                   </UserInfo>
                                   <LogoutButton onPress={handleLogOut}>
                                        <PowerIcon name='power' size={24} />
                                   </LogoutButton>
                              </UserWrapper>
                         </Header>

                         <Cards>
                              <Card
                                   name='Entradas'
                                   type='up'
                                   amount={highlightData.entries?.amount}
                                   lastTransaction={
                                        highlightData.entries.lastTransaction
                                   }
                              />
                              <Card
                                   name='Saídas'
                                   type='down'
                                   amount={highlightData.expenses?.amount}
                                   lastTransaction={
                                        highlightData.expenses.lastTransaction
                                   }
                              />
                              <Card
                                   name='Total'
                                   type='total'
                                   amount={highlightData.total?.amount}
                                   lastTransaction={
                                        highlightData.total.lastTransaction
                                   }
                              />
                         </Cards>

                         <Transactions>
                              <Title>Listagem</Title>

                              <TransactionsList
                                   data={data}
                                   keyExtractor={(item) => item.id}
                                   renderItem={({ item }) => (
                                        <TransactionCard
                                             onPress={() =>
                                                  handleRemoveItem(item.id)
                                             }
                                             data={item}
                                        />
                                   )}
                              />
                         </Transactions>
                    </>
               )}
          </Container>
     )
}

export default DashBoard
