import React, {
    createContext,
    ReactNode,
    useContext,
    useEffect,
    useState,
} from 'react'


import AsyncStorage from '@react-native-async-storage/async-storage'


interface TransactionProviderProps {
    children: ReactNode
}


interface ITransaction  {
    type: 'positive' | 'negative'
    name: string
    amount: string
    date: string
    category: string
}
