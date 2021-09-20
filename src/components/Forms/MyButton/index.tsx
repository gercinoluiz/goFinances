import React from 'react'
import { TouchableOpacityProps } from 'react-native'

import { Container, Title } from './styles'

export interface MyButtonProps extends TouchableOpacityProps {
     title: string
}

const MyButton: React.FC<MyButtonProps> = ({ title, ...rest }) => {
     return (
          <Container {...rest}>
               <Title>{title}</Title>
          </Container>
     )
}

export default MyButton
