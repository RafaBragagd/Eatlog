import React, { useState, useRef, useContext } from 'react'
import InputNumber from './thirdDegree/InputNumber'
import InputText from './thirdDegree/InputText'

//CSS
import './css/register.css'

//Context
import { FoodContext } from '../food'

//Imagens
import AddImage from '../img/AddImage.svg'


function Register() {
//Configuração para o controle das imagens
    const [selectedImage, setSelectedImage] = useState(null)
    let img = null

//constantes de referencia dos inputs\\
    const formRef = useRef(null)
    const imgRef = useRef(null)
    const inputName = useRef(null)
    const inputCalorie = useRef(null)
    const inputProtein = useRef(null)
    const inputCarbo = useRef(null)
    const inputFiber = useRef(null)
    const inputFat = useRef(null)
    const submitButton = useRef(null)

//---Variaveis de controle do foco---\\
    const [nameF, setNameF] =  useState(false)
    const [caloriesF, setCaloriesF] =  useState(false)
    const [proteinF, setProteinF] =  useState(false)
    const [carboF, setCarboF] =  useState(false)
    const [fiberF, setFiberF] =  useState(false)
    const [fatF, setFatF] =  useState(false)

//-------------Context----------------\\
    const { addFoods } = useContext(FoodContext)

//----Metodos de controle do foco-----\\
    //-Metodos do input de nome-\\
    const nameFocus = () => {
        setNameF(true)
    }
    const nameBlur = (value) => {
        if (value == ""){
            setNameF(false)
        }
    }
    //-Metodos do input de calorias-\\
    const calorieFocus = () => {
        setCaloriesF(true)
    }
    const calorieBlur = (value) => {
        if (value == ""){
            setCaloriesF(false)
        }
    }
    //-Metodos do input de Proteina-\\
    const proteinFocus = () => {
        setProteinF(true)
    }
    const proteinBlur = (value) => {
        if (value == ""){
            setProteinF(false)
        }
    }
    //-Metodos do input de Carboidratos-\\
    const carboFocus = () => {
        setCarboF(true)
    }
    const carboBlur = (value) => {
        if (value == ""){
            setCarboF(false)
        }
    }
    //-Metodos do input de fibras-\\
    const fibersFocus = () => {
        setFiberF(true)
    }
    const fibersBlur = (value) => {
        if (value == ""){
            setFiberF(false)
        }
    }
    //-Metodos do input de gorduras-\\
    const fatsFocus = () => {
        setFatF(true)
    }
    const fatsBlur = (value) => {
        if (value == ""){
            setFatF(false)
        }
    }

//-----------Metodos Gerais------------\\
    
    const imageChange = (event) => {
        const file = event.target.files[0]
        setSelectedImage(URL.createObjectURL(file))
    }
    
//------------Função Submit------------\\
    const recordData = (img) => {
        // Obter os valores dos inputs
        const name = inputName.current.value
        const calorie = parseFloat(inputCalorie.current.value)
        const protein = parseFloat(inputProtein.current.value)
        const carbo = parseFloat(inputCarbo.current.value)
        const fiber = parseFloat(inputFiber.current.value)
        const fat = parseFloat(inputFat.current.value)

        // gravar os valores
        addFoods(img, name, calorie, protein, carbo, fiber, fat)

        // Resetar o formulário
        formRef.current.reset()
        setSelectedImage(null)
        nameBlur(inputName.current.value)
        calorieBlur(inputCalorie.current.value)
        proteinBlur(inputProtein.current.value)
        carboBlur(inputCarbo.current.value)
        fibersBlur(inputFiber.current.value)
        fatsBlur(inputFat.current.value)
    }
    const submitForm = (event) => {
        event.preventDefault()

        const file = imgRef.current.files[0]
            
        if(file){
            const reader = new FileReader()

            reader.onloadend = () => {
                const base64String = reader.result
                img = base64String
                recordData(img)
                return
            }
            reader.readAsDataURL(file)
        }
        recordData("data:image/png;base64,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")
    }
//----------------Return---------------\\
    return (
        <form ref={formRef} onSubmit={submitForm}>

            <h2>Cadastrar Alimento</h2>
            <div className="inputImg">
                <input ref={imgRef} type="file" accept='image/*' onChange={imageChange}/>
                <img src={selectedImage ? selectedImage : AddImage} alt="Selected" />
            </div>
            <InputText inputRef={inputName} nextRef={inputCalorie} focus={nameFocus} blur={nameBlur} focusRef={nameF} title="Nome" />
            <InputNumber inputRef={inputCalorie} nextRef={inputProtein} focus={calorieFocus} blur={calorieBlur} focusRef={caloriesF} min={0} unit="kcal" title="Calorias" />
            <InputNumber inputRef={inputProtein} nextRef={inputCarbo} focus={proteinFocus} blur={proteinBlur} focusRef={proteinF} min={0} unit="g" title="Proteinas" />
            <InputNumber inputRef={inputCarbo} nextRef={inputFiber} focus={carboFocus} blur={carboBlur} focusRef={carboF} min={0} unit="g" title="Carboidrato" />
            <InputNumber inputRef={inputFiber} nextRef={inputFat} focus={fibersFocus} blur={fibersBlur} focusRef={fiberF} min={0} unit="g" title="Fibras" />
            <InputNumber inputRef={inputFat} nextRef={submitButton} focus={fatsFocus} blur={fatsBlur} focusRef={fatF} min={0} unit="g" title="Gorduras" />
            
            <button type="submit" ref={submitButton}>Cadastrar</button>
        </form>
    )
}

export default Register