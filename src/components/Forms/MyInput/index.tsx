import React from 'react'
import { TextInputProps } from 'react-native'

import { Container } from './styles'

export interface MyInputProps extends TextInputProps {
     name?: string
}

const MyInput: React.FC<MyInputProps> = ({ ...rest }) => {
     return <Container {...rest}></Container>
}

export default MyInput
