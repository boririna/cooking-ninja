import { useFetch } from '../../hooks/useFetch'
import { useParams } from 'react-router-dom'

//styles
import './Recipe.css'

export default function Recipe() {
  const { id } = useParams()
  const {data: recipe, isPending, error} = useFetch(`http://localhost:3000/recipes/${id}`)
  return (
    <div className="recipe">
      {error && <p className="error">{error}</p>}
      {isPending && <p className="loading">Loading...</p>}
      {recipe && (
        <>
          <h3 className="page-title">{recipe.title}</h3>
          <p>Takes {recipe.cookingTime} to cook</p>
          <ul>
            {recipe.ingredients.map(ing => <li key={ing}>{ing}</li>)}
          </ul>
          <p className="method">{recipe.method}</p>
        </>
      )}
    </div>
  )
}
