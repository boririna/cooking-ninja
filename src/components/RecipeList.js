import { Link } from 'react-router-dom'

// styles 
import './ResipeList.css'

export default function RecipeList( { recipes }) {
  return (
    <div className="recipy-list">
        {recipes.map(recipe =>(
            <div key={recipe.id} className="card">
                <h3>{recipe.title}</h3>
                <p>{recipe.cookingTime} to make</p>
                <p>{recipe.method.substring(0, 100)} ...</p>
                <Link to={`recipe/${recipe.id}`}>Cook this</Link>
            </div>
        ))}
    </div>
  )
}
