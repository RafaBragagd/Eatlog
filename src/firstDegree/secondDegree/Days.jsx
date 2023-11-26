import React, { useState, useRef, useContext } from 'react'
import { Link } from 'react-router-dom';

//Componentes
import FoodCard from './thirdDegree/foodCard'
import FoodList from './thirdDegree/foodList'
import InputText from './thirdDegree/InputText'
import InputNumber from './thirdDegree/InputNumber'
import DynamicSelect from './thirdDegree/dynamicSelect'

//CSS
import './css/Days.css'

//Imagens
import addFood from './img/addFood.svg'
import bell from './img/bell.svg'
import listCheck from './img/listCheck.svg'
import listFood from './img/ListFood.svg'
import shoppingList from './img/shoppingList.svg'

//Context
import { FoodContext } from '../food'

function Days() {
  const [days, setDays] = useState({
    sunday: {
      title: "Domingo",
      meals: []
    },
    monday: {
      title: "Segunda-Feira",
      meals: []
    },
    tuesday: {
      title: "Terça-Feira",
      meals: []
    },
    wednesday: {
      title: "Quarta-Feira",
      meals: []
    },
    thursday: {
      title: "Quinta-Feira",
      meals: []
    },
    friday: {
      title: "Sexta-Feira",
      meals: []
    },
    saturday: {
      title: "Sábado",
      meals: []
    }
  })


  //Context
  const { foods } = useContext(FoodContext)
  //Constantes auxiliares
  const [selectedFoods, setSelectedFoods] = useState([]);
  const [ultimoIdMeal, setUltimoIdMeal] =useState(0)

  //Constantes de Referencia de input
  const addMealForm = useRef(null)
  const titleRef = useRef(null)
  const selectRef = useRef(null)
  const quantRef = useRef(null)
  const unitRef = useRef(null)
  const dayWeekRef = useRef(null)

  //Variaveis de controle do focus
  const [idMealF, setIdMealF] = useState(false)
  const [mealTitleF, setMealTitleF] = useState(false)
  const [quantF, setQuantF] = useState(false)

  //----Metodos de controle do foco-----\\
    //-Metodos do input de id das refeições-\\
    const idMealFocus = () => {
      setIdMealF(true)
    }
    const idMealBlur = (value) => {
      if (value == ""){
          setIdMealF(false)
      }
    }
    //-Metodos do input de Titulo das refeições-\\
    const mealTitleFocus = () => {
      setMealTitleF(true)
    }
    const mealTitleBlur = (value) => {
      if (value == ""){
          setMealTitleF(false)
      }
    }
    //-Metodos do input da quantidade refeição-\\
    const quantFocus = () => {
      setQuantF(true)
    }
    const quantBlur = (value) => {
      if (value == ""){
          setQuantF(false)
      }
    }
  
  //Funções de controle das refeições
  const closeFormMeal = () => {
    addMealForm.current.classList.toggle("active")
    resetFormMeal()
  }
  const resetFormMeal = () => {
    titleRef.current.value = ""
    quantRef.current.value = ""
    selectRef.current.selectedIndex = 0
    unitRef.current.selectedIndex = 0
    dayWeekRef.current.selectedIndex = 0
    setSelectedFoods([])
  }
  const addMeal = (event, titulo, foods, day) => {
    event.preventDefault()
    const id = ultimoIdMeal
    const title = titulo ? titulo : "Refeição"
    const newMeal = {
      id,
      title,
      foods
    }

    const newList = days[day].meals
    newList.push(newMeal)

    const updateDays = {
      ...days,
      [day]: {
        ...days[day],
        meals: newList
      }
    }

    setDays(updateDays)
    addMealForm.current.classList.remove("active")
    resetFormMeal()
    setUltimoIdMeal(ultimoIdMeal+1)
  }

  const SelectFood = (e) => {
    const quantidade = quantRef.current.value ? quantRef.current.value : 1
    const food = {
      id: selectRef.current.value,
      quant: quantidade,
      unit: unitRef.current.value
    }
    if ((food.id)&&!(selectedFoods.find(item=> item.id === food.id))) {

      setSelectedFoods([...selectedFoods, food])
    }
  }
  const RemoveFood = (foodId) => {
    console.log(typeof foodId)
    setSelectedFoods(selectedFoods.filter(item=> item.id !== foodId));
  }


  return (
    <div className='main'>
      <div className="container">
        <div className='week'>
          {Object.keys(days).map((day) => (
            <div className='day' key={day}>
              <h2>{days[day].title}</h2>
              <div>
                {days[day].meals.map((meal, index) => (
                  <div key={`${meal.id}-${index}`}  className='meal'>
                    <h3>{meal.title}</h3>
                    <div className='mealList'>
                      {meal.foods.map((food) => (
                        <FoodCard key={food.id} id={parseInt(food.id)} quant={food.quant} unit={food.unit} />
                      ))}
                    </div>
                    <div className='buttons'>
                      <button type="button">+ Alimento</button>
                      <button type="button">Concluir</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      <form ref={addMealForm} className="addMeal" onSubmit={(e) => addMeal(e, titleRef.current.value, selectedFoods, dayWeekRef.current.value)}>
        <span className="close" onClick={closeFormMeal}>X</span>
        <h3>Registrar Refeições</h3>
        <InputText inputRef={titleRef} focus={mealTitleFocus} blur={mealTitleBlur} focusRef={mealTitleF} title="Titulo"/>
        <div className='foodRegis'>
          <h4>Selecione os alimentos para a refeição:</h4>
          {selectedFoods.map(food => (
            <FoodList key={food.id} id={parseInt(food.id)} quant={food.quant} unit={food.unit} onRemove={RemoveFood} />
          ))}
          <div className='foodSelector'>
            <DynamicSelect
              className="dynamicSelector"
              options={foods}  // Pass the list of food options to the component
              inputRef={selectRef}
              firstOption="Selecione os Alimentos"
            />
            <InputNumber className='foodQuant' inputRef={quantRef} focus={quantFocus} blur={quantBlur} focusRef={quantF} min={1} unit="" title="Quantidade" />
            <select className='foodUnit' ref={unitRef}>
              <option value="ea">ea (unidade)</option>
              <option value="g">g (grama)</option>
              <option value="kg">kg (quilograma)</option>
              <option value="mg">mg (miligrama)</option>
              <option value="ml">ml (mililitro)</option>
              <option value="oz">oz (onça)</option>
              <option value="lb">lb (libra)</option>
              <option value="cup">cup (xícara)</option>
              <option value="tbsp">tbsp (colher de sopa)</option>
              <option value="tsp">tsp (colher de chá)</option>
            </select>
            <button className='foodAdd' type='button' onClick={SelectFood}>Adicionar</button>
          </div>
        </div>
        
        <select className='weekMeal' ref={dayWeekRef}>
            <option value="monday">Segunda-Feira</option>
            <option value="tuesday">Terça-Feira</option>
            <option value="wednesday">Quarta-Feira</option>
            <option value="thursday">Quinta-Feira</option>
            <option value="friday">Sexta-Feira</option>
            <option value="saturday">Sabado</option>
            <option value="sunday">Domingo</option>
          </select>

          <button type="submit">Cadastrar</button>
      </form>
      <aside>
        <button>
          <Link to="/foodregister">
            <img src={addFood} alt="Adicionar Alimento" />
          </Link>
          
        </button>
        <button onClick={() => {addMealForm.current.classList.toggle("active")}}>
          <img src={bell} alt="Adicionar refeição" />
        </button>
        <button>
          <img src={listFood} alt="Lista de alimentos" />
        </button>
        <button>
          <img src={listCheck} alt="Tabela Nutricional" />
        </button>
        <button>
          <img src={shoppingList} alt="Lista de Compras" />
        </button>
      </aside>
    </div>
  )
}
  

export default Days;
