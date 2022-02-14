import React from 'react'

import { render } from '@testing-library/react-native'

import Card from '.'

import { ThemeProvider } from 'styled-components/native'
import theme from '../../screens/global/styles/theme'


const Providers: React.FC = ({ children }) => (
     <ThemeProvider theme={theme}>{children}</ThemeProvider>
)


describe ('Card', ()=>{

    it('Should check if type total has the color of secondary' ,()=>{

        const {getByTestId,debug }  = render(
            <Card

                
                amount='100'
                name='card'
                lastTransaction='decrase'
                type='total'
                testID='amount-card'
            />,
            {
                wrapper: Providers
            }
        )
        

        const cardComponent = getByTestId('amount-card')

        expect(cardComponent.props.style[0].backgroundColor).toEqual(theme.colors.secondary)

    })

})