import React from 'react'
import { TextInputProps } from 'react-native'
import { Control, Controller } from 'react-hook-form'

import { Container, Error } from './styles'
import MyInput from '../MyInput'

interface Props extends TextInputProps {
     control: Control
     name: string
     error: string
}

export function InputForm({ control, name, error, ...rest }: Props) {
     return (
          <Container>
               <Controller
                    control={control}
                    render={({ field: { onChange, value } }) => (
                         <MyInput
                              onChangeText={onChange}
                              value={value}
                              {...rest}
                         />
                    )}
                    name={name}
               />
               {error && <Error>{error}</Error>}
          </Container>
     )
}
