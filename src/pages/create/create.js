import { useState, useRef, useEffect } from 'react'
import { useHistory } from "react-router-dom"
import { useFetch } from '../../hooks/useFetch'

//styles
import './Create.css'


export default function Create() {
  const [ title, setTitle ] = useState('')
  const [ method, setMethod ] = useState('')
  const [ cookingTime, setCookingTime] = useState('')
  const [newIngredient, setNewIngredient] = useState('')
  const [ingredients, setIngredients] = useState([])
  const ingredientInput = useRef(null)
  const history = useHistory()

  const { postData, data, error } = useFetch('http://localhost:3000/recipes', 'POST')

  const handleSubmit = (e) => {
    e.preventDefault()
    postData({ title, ingredients, method, cookingTime: cookingTime + 'minutes' })
  }

  const handleAdd = (e) => {
    e.preventDefault()
    const ing = newIngredient.trim()
    if (ing && !ingredients.includes(ing)) {
      setIngredients(prevIngredients => [...prevIngredients, ing])
    }
    setNewIngredient('')
    ingredientInput.current.focus()
  }

  // Redirect the user when we get data response

  useEffect(() => {
    const timeout = () => {
      if (data) {
        history.push('/')
      }
    }
    setTimeout(timeout, 5000)
    
  }, [data])

  return (
    <div className="create">
      <h2 className="page-title">Add a New Recipe</h2>

      <form onSubmit={handleSubmit}>

        <label>
          <span>Recipe title:</span>
          <input 
            type="text"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            required 
          />
        </label>

        {/* Ingredients later */}
        <label>
          <span>Recipe ingredients:</span>
          <div className="ingredients">
            <input 
              type="text"
              onChange={(e) => setNewIngredient(e.target.value)}
              value={newIngredient}
              ref={ingredientInput}
            />
            <button onClick={handleAdd} className="btn">add</button>
          </div>
        </label>
        <p>Current ingredient: {ingredients.map(x => <em key={x}>{x}, </em>)}</p>

        <label>
          <span>Recipe method:</span>
          <textarea
            onChange={(e) => setMethod(e.target.value)}
            value={method}
            required 
          />
        </label>

        <label>
          <span>Cooking time:</span>
          <input 
            type="number"
            onChange={(e) => setCookingTime(e.target.value)}
            value={cookingTime}
            required 
          />
        </label>

        <button className="btn">Submit</button>

      </form>
    </div>
  )
}
