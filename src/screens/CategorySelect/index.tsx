import React from 'react'
import { TouchableOpacityProps } from 'react-native'

import { FlatList } from 'react-native-gesture-handler'
import { categories } from '../../ultils/categories'
import MyButton from '../../components/Forms/MyButton'

import {
     Container,
     Header,
     Title,
     Category,
     Icon,
     Name,
     Separator,
     Footer,
} from './styles'

interface Category {
     key: string
     name: string
}

export interface CategorySelectButtonProps {
     category: Category
     setCategory: (category: Category) => void
     closeSelectCategory: () => void
}

const CategorySelectButton: React.FC<CategorySelectButtonProps> = ({
     category,
     setCategory,
     closeSelectCategory,
     ...rest
}) => {


     function handleCategorySelect (category:Category){
          setCategory(category)
     }


     return (
          <Container>
               <Header>
                    <Title>Categoria</Title>
               </Header>

               <FlatList
                    data={categories}
                    style={{ flex: 1, width: '100%' }}
                    keyExtractor={(item) => item.key}
                    renderItem={({ item }) => (
                         <Category
                         onPress={()=> handleCategorySelect(item)}
                         isActive={category.key === item.key}

                         >
                              <Icon name={item.icon} />
                              <Name>{item.name}</Name>
                         </Category>
                    )}
                    // Um item para separar cada item dentro da FlatList
                    ItemSeparatorComponent={() => <Separator />}
               />

               <Footer>
                    <MyButton title='Selecionar' onPress={closeSelectCategory} />
               </Footer>
          </Container>
     )
}

export default CategorySelectButton
