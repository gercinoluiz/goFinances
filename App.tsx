import {
     Poppins_400Regular,
     Poppins_500Medium,
     Poppins_700Bold,
     useFonts
} from '@expo-google-fonts/poppins'
import AppLoading from 'expo-app-loading'
import 'intl'
import 'intl/locale-data/jsonp/pt-BR'
import React from 'react'
import { StatusBar } from 'react-native'
import { ThemeProvider } from 'styled-components/native'
import { AppProvider } from './src/hooks'
import { Routes } from './src/routes'
import theme from './src/screens/global/styles/theme'


export default function App() {
     try {
          const [fontsLoaded] = useFonts({
               Poppins_400Regular,
               Poppins_500Medium,
               Poppins_700Bold,
          })

          if (!fontsLoaded) {
               return <AppLoading />
          }
     } catch (error) {
          console.log({ error })
     }

     return (
          <ThemeProvider theme={theme}>
               <StatusBar barStyle='light-content' />
               <AppProvider>
                    <Routes />
               </AppProvider>
          </ThemeProvider>
     )
}
