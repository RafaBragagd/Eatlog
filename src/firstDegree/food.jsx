import React, { useState } from 'react'


export const FoodContext = React.createContext()

export const  FoodProvider = ({children}) => {

  //variaveis gerais
  const [lastId, setLastId] = useState(1)

  //Lista de alimentos
  const [foods, setFoods] = useState([
    {
      id: 1,
      img: "data:image/png;base64,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",
      name: "Batata Doce",
      calories: 60,
      protein: 4.5,
      carbo: 6.7,
      fibers: 1.2, 
      fats: 10.5,
    },
    {
      id: 2,
      img: "data:image/png;base64,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",
      name: "Arroz",
      calories: 100,
      protein: 3.4,
      carbo: 7.2,
      fibers: 2.2, 
      fats: 11.5,
    }
  ])

  //Função de Adição de alimentos
  const addFoods = (img, name, calories, protein, carbo, fibers, fats) => {
    const newFood = {
      id: lastId,
      img,
      name,
      calories,
      protein,
      carbo,
      fibers, 
      fats,
    }
    setFoods([...foods, newFood])
    setLastId(lastId + 1)
  }


  return (
    <FoodContext.Provider value={{foods, addFoods}} >
      {children}
    </FoodContext.Provider>
  )
}
