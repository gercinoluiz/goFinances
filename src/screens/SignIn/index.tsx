import React from 'react'
import { Alert } from 'react-native'
import { RFValue } from 'react-native-responsive-fontsize'

import { AntDesign } from '@expo/vector-icons';
import AppleSvg from '../../assets/aple.svg'
import GoogleSvg from '../../assets/google.svg'
import LogoSvg from '../../assets/logo.svg'
import SocialButton from '../../components/SocialButton'
import { useAuth } from '../../hooks/AuthContext'



import {
     Container,
     Header,
     TitleWrapper,
     Title,
     SignInTitle,
     Footer,
     FooterWrapper,
} from './styles'

export function SignIn() {
     const { signInWithGoogle } = useAuth()

     async function handleSignInWithGoogle() {
          try {
               await signInWithGoogle()
          } catch (error) {
               Alert.alert('Something went wrong, try again later')
          }
     }

     return (
          <Container>
               <Header>
                    <TitleWrapper>
                         <LogoSvg width={RFValue(120)} height={RFValue(68)} />

                         <Title>
                              Controle suas {'\n'}
                              finanças de forma {'\n'}
                              muito simples
                         </Title>
                    </TitleWrapper>

                    <SignInTitle>
                         Faça seu login com {'\n'}
                         uma das contas abaixo
                    </SignInTitle>
               </Header>

               <Footer>
                    <FooterWrapper>
                         <SocialButton
                              title='Entrar com Google'
                              children={<AntDesign name="google" size={24} color="black" />}
                              onPress={handleSignInWithGoogle}
                         />
                         <SocialButton
                              title='Entrar com Apple'
                              children={<AntDesign name="apple1" size={24} color="black" />}
                         />
                    </FooterWrapper>
               </Footer>
          </Container>
     )
}
