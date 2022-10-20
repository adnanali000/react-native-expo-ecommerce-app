import { View, Text, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import CategoryCard from './CategoryCard'

const Categories = () => {
    const categories = [
        {id:1,image: 'https://p.kindpng.com/picc/s/194-1945580_laptop-windows-10-png-windows-10-laptop-png.png',title:'Laptop'},
        {id:2,image: 'https://pngimg.com/uploads/iphone_11/iphone_11_PNG21.png',title:'Mobile'},
        {id:3,image: 'https://www.neuf.tv/wp-content/uploads/2020/09/1600425867_28_Critique-du-casque-sans-fil-a-reduction-de-bruit-Sony.jpg',title:'Gadgets'},
        {id:4,image: 'https://media.wired.com/photos/5c9d5e938c79ea63995ca04d/1:1/w_1800,h_1800,c_limit/Apple-AirPods-worlds-most-popular-wireless-headphones_03202019.jpg',title:'Gadgets'},
        {id:5,image: 'https://images-om.imgix.net/eZTTSYlTMnoX/glossy-rectangular-power-banks-mockup-dark.jpg?auto=format&fit=max&q=90&w=1500&s=1b724884fb39653b17724daf54083ad9',title:'Gadgets'},
    ]

    return (
        <ScrollView
            contentContainerStyle={{
                paddingHorizontal: 15,
                paddingTop:10
            }}
            horizontal
            showsHorizontalScrollIndicator={false}
        >
            {/* Category card  */}
            {categories?.map((category)=>(
              <CategoryCard imgUrl={category.image} title= {category.title} key={category.id} />
            ))}
          
        </ScrollView>
      )
    }
    
export default Categories