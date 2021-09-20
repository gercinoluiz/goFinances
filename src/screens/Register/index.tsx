import React, { useEffect } from 'react'
import { useState } from 'react'
import MyButton from '../../components/Forms/MyButton'
import { CategorySelectButton } from '../../components/Forms/CategorySelectButton'
import { useForm } from 'react-hook-form'
import MyInput from '../../components/Forms/MyInput'
import TransactionTypeButton from '../../components/Forms/TransactionTypeButton'
import { Modal } from 'react-native'
import {
     Container,
     Header,
     Title,
     Form,
     Fields,
     TransactioTypesContainer,
} from './styles'
import CategorySelect from '../CategorySelect'
import { InputForm } from '../../components/Forms/InputForm'
import { TouchableWithoutFeedback } from 'react-native' // para esconder o teclado
import { Keyboard } from 'react-native'
import { Alert } from 'react-native'

import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

import AsyncStorage from '@react-native-async-storage/async-storage'

import uuid from 'react-native-uuid'
import { useNavigation } from '@react-navigation/native'
import { useAuth } from '../../hooks/AuthContext'

export interface RegisterProps {}

interface FormData {
     name: string
     amount: string
     quantity:number
}

const schema = Yup.object().shape({
     name: Yup.string().required('Name required'),
     amount: Yup.number()
          .typeError('It must be a number')
          .positive('Negative numbers not allower')
          .required('Value required'),
     quantity: Yup.number()
          .typeError('It must be a number')
          .positive('Negative numbers not allower')
          .required('Value required'),
})

const Register = () => {
     const { user } = useAuth()

     const dataKey = `@gofinances:transactions_user:${user.id}`

     const [selectedTransactionType, setSelectedTransactionType] = useState('')

     const handdleTransactionTypeButtonSelect = (
          type: 'positive' | 'negative'
     ) => {
          setSelectedTransactionType(type)
     }

     const [categoryModalOpen, setCategoryModalOpen] = useState(false)

     const [category, setCategory] = useState({
          key: 'category',
          name: 'Categoria',
     })

     function handleOpenSelectCategoryModal() {
          setCategoryModalOpen(true)
     }

     function handleCloseSelectCategoryModal() {
          setCategoryModalOpen(false)
     }

     const navigation = useNavigation()

     // FORM ITEMS ==>
     const {
          control,
          handleSubmit,
          formState: { errors },
          reset,
     } = useForm({ resolver: yupResolver(schema) })

     async function handleRegister(form: FormData) {
          if (!selectedTransactionType) {
               return Alert.alert('Selecione o Tipo da Transação')
          }

          if (!category.key) {
               return Alert.alert('Selecione a categoria')
          }

          const totalAmount = Number(form.amount)  * Number(form.quantity)

          const newTransaction = {
               id: String(uuid.v4()),
               name: form.name,
               amount: totalAmount,
               type: selectedTransactionType,
               category: category.key,
               date: new Date(),
          }

          try {
               const data = await AsyncStorage.getItem(dataKey)
               const currentData = data ? JSON.parse(data) : []

               console.log({ currentData })

               const formatedData = [...currentData, newTransaction]

               await AsyncStorage.setItem(dataKey, JSON.stringify(formatedData))

               // Zerando os campos
               reset()
               setSelectedTransactionType('')
               setCategory({ key: 'category', name: 'Categoria' })

               navigation.navigate('Listagem' as never)
          } catch (error) {
               console.log(error)
               Alert.alert('Não foi possível salvar')
          }
     }

     useEffect(() => {
          async function loadData() {
               const data = await AsyncStorage.getItem(dataKey)
               console.log(JSON.parse(data!))

               //     await AsyncStorage.removeItem(dataKey)
          }

          loadData()
     }, [])

     return (
          //Desaparecer o teclado
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
               <Container>
                    <Header>
                         <Title>Cadastro</Title>
                    </Header>

                    <Form>
                         <Fields>
                              <InputForm
                                   name='name'
                                   autoCapitalize='sentences'
                                   autoCorrect={false}
                                   placeholder='Nome'
                                   control={control}
                                   error={errors.name && errors.name.message}
                              />
                              <InputForm
                                   name='amount'
                                   placeholder='Preço'
                                   control={control}
                                   keyboardType='numeric'
                                   error={
                                        errors.amount && errors.amount.message
                                   }
                              />
                              <InputForm
                                   name='quantity'
                                   placeholder='Quantidade'
                                   control={control}
                                   keyboardType='numeric'
                                   error={
                                        errors.quantity && errors.quantity.message
                                   }
                              />

                              <TransactioTypesContainer>
                                   <TransactionTypeButton
                                        isActive={
                                             selectedTransactionType ===
                                             'positive'
                                        }
                                        title='Income'
                                        onPress={() =>
                                             handdleTransactionTypeButtonSelect(
                                                  'positive'
                                             )
                                        }
                                        type='positive'
                                   />
                                   <TransactionTypeButton
                                        isActive={
                                             selectedTransactionType ===
                                             'negative'
                                        }
                                        title='Outcome'
                                        onPress={() =>
                                             handdleTransactionTypeButtonSelect(
                                                  'negative'
                                             )
                                        }
                                        type='negative'
                                   />
                              </TransactioTypesContainer>
                              <CategorySelectButton
                                   title={category.name}
                                   onPress={handleOpenSelectCategoryModal}
                              />
                         </Fields>
                         <MyButton
                              title='Enviar'
                              onPress={handleSubmit(handleRegister)} // nesse caso nao pode ser arrow function
                         />
                    </Form>
                    <Modal visible={categoryModalOpen}>
                         <CategorySelect
                              category={category}
                              setCategory={setCategory}
                              closeSelectCategory={
                                   handleCloseSelectCategoryModal
                              }
                         />
                    </Modal>
               </Container>
          </TouchableWithoutFeedback>
     )
}

export default Register
