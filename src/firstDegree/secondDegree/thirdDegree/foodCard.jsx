import React, { useContext } from 'react'

//Context
import { FoodContext } from '../../food'

//CSS
import "./css/foodCard.css"

function foodCard({id, quant, unit}) {
    //Context
    const { foods } = useContext(FoodContext)
    const objeto = foods.find(item =>item.id === id)

    return (
        <div className='foodCard'>
            <img src={objeto.img} alt="Icone" />
            <div className='info'>
                <h4>{objeto.name}</h4>
                <p>Quantidade: {quant}{unit}</p>
            </div>
        </div>
    )
}

export default foodCard