import { rest } from 'lodash'
import React, { ReactNode } from 'react'
import { RectButtonProps } from 'react-native-gesture-handler'
import { SvgProps } from 'react-native-svg'

import { Button, ImageContainer, Text } from './styles'

interface Props extends RectButtonProps {
     title: string
     children: ReactNode
}

export default function SocialButton({ title, children, ...rest }: Props) {
     return (
          <Button {...rest} >
               <ImageContainer>
                    {children}
               </ImageContainer>
               <Text>{title}</Text>
          </Button>
     )
}
