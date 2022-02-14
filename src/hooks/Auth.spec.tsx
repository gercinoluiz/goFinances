import React from 'react'

import { renderHook, act } from '@testing-library/react-hooks'

import { AuthContextProvider, useAuth } from './AuthContext'

import * as ExpoAuth from 'expo-auth-session'

jest.mock('expo-auth-session')

describe('AuthHook', () => {

     it('Should be able to login using Google', async () => {

          spyOn(ExpoAuth, 'startAsync').and.returnValue({
               type: 'cancel',
          })
          
          const { result } = renderHook(() => useAuth(), {
               wrapper: AuthContextProvider,
          })

          await act(() => result.current.signInWithGoogle())

          expect(result.current.user.id).toBe(undefined)
     })
})
