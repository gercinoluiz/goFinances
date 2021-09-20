import React from 'react'

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import DashBoard from '../screens/DashBoard'
import Register from '../screens/Register'
import theme from '../screens/global/styles/theme'
import { MaterialIcons } from '@expo/vector-icons'
import { size } from 'lodash'
import { Platform } from 'react-native'
import { Resume } from '../screens/Resume'

const { Navigator, Screen } = createBottomTabNavigator()

export function AppRoutes() {
     return (
          <Navigator
               screenOptions={{
                    tabBarActiveTintColor: theme.colors.secondary,
                    tabBarInactiveTintColor: theme.colors.text,
                    tabBarLabelPosition: 'beside-icon',
                    tabBarStyle: {
                         paddingVertical: Platform.OS === 'ios' ? 20 : 0,
                         height: 88,
                    },
                    headerShown:false
               }}

               
          >
               <Screen
                    name='Listagem'
                    component={DashBoard}
                    options={{
                         tabBarIcon: ({ size, color }) => (
                              <MaterialIcons
                                   size={size}
                                   color={color}
                                   name='format-list-bulleted'
                              />
                         ),
                    }}
               />
               <Screen
                    name='Cadastrar'
                    component={Register}
                    options={{
                         tabBarIcon: ({ size, color }) => (
                              <MaterialIcons
                                   size={size}
                                   color={color}
                                   name='attach-money'
                              />
                         ),
                    }}
               />
               <Screen
                    name='Resumo'
                    component={Resume}
                    options={{
                         tabBarIcon: ({ size, color }) => (
                              <MaterialIcons
                                   size={size}
                                   color={color}
                                   name='pie-chart'
                              />
                         ),
                    }}
               />
          </Navigator>
     )
}
