import React from 'react'
import { TouchableOpacityProps } from 'react-native';


import {Container, Title, Icon} from './styles'

const icons = {
    positive:'arrow-up-circle',
    negative:'arrow-down-circle'
}

export interface TransactionTypeButtonProps extends TouchableOpacityProps {
    title:string;
    type: 'positive' | 'negative';
    isActive:boolean;
    
}
 
const TransactionTypeButton: React.FC<TransactionTypeButtonProps> = ({title, type,isActive, ...rest}) => {
    return (

            <Container isActive={isActive} type={type} {...rest}>
                <Icon type={type} name={icons[type]} />
                <Title>{title}</Title>
            </Container>

      );
}
 
export default TransactionTypeButton;