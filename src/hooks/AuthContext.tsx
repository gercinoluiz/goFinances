import React, {
     createContext,
     ReactNode,
     useContext,
     useEffect,
     useState,
} from 'react'

import * as AuthSession from 'expo-auth-session'

import AsyncStorage from '@react-native-async-storage/async-storage'

interface AuthProviderProps {
     children: ReactNode
}

interface IUser {
     id: string
     email: string
     name: string
     photo?: string
}

interface IAuthContextData {
     user: IUser
     signInWithGoogle: () => Promise<void>;
     logOut: () => Promise <void>
}

interface AuthorizationResponse {
     params: {
          access_token: string
     }
     type: string
}

const userKey = '@goFinances:user'

const AuthContext = createContext({} as IAuthContextData)

export const AuthContextProvider = ({ children }: AuthProviderProps) => {

     const logOut = async () => {
          setUser({} as IUser)

          await AsyncStorage.removeItem(userKey)
     }

     const [user, setUser] = useState<IUser>({} as IUser)

     useEffect(() => {
          async function loadData() {
               const response = await AsyncStorage.getItem(userKey)
               const responseFormatted = response ? JSON.parse(response) : {}

               setUser(responseFormatted)

               
          }

          loadData()
     }, [])

     // sate in storage
     async function saveGoogleUser(googleUser: IUser) {
          try {
               await AsyncStorage.setItem(userKey, JSON.stringify(googleUser))

               setUser(googleUser)

               
          } catch (error) {
               console.log(error)
          }
     }

     async function signInWithGoogle() {
          try {
               const SCOPE = encodeURI('profile email') // trocar os espacos por algo compreensivel
               const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${process.env.CLIENT_ID}&redirect_uri=${process.env.REDIRECT_URI}&response_type=${process.env.RESPONSE_TYPE}&scope=${SCOPE}`

               

               const { type, params } = (await AuthSession.startAsync({
                    authUrl,
               })) as AuthorizationResponse

               

               if (type === 'success') {
                    const response = await fetch(
                         `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${params.access_token}`
                    )

                    const userInfo = await response.json()

                    

                    const googleUser = {
                         id: userInfo.id,
                         email: userInfo.email,
                         name: userInfo.given_name,
                         photo: userInfo.picture,
                    }

                    saveGoogleUser(googleUser)
               }
          } catch (error) {
               console.log(error)
          }
     }

     return (
          <AuthContext.Provider value={{ signInWithGoogle, user, logOut }}>
               {children}
          </AuthContext.Provider>
     )
}

export function useAuth() {
     const context = useContext(AuthContext)

     return context
}
