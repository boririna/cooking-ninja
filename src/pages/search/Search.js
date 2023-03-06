import { useLocation } from 'react-router-dom'
import { useFetch } from '../../hooks/useFetch'

// styles
import './Search.css'

// components
import RecipeList from '../../components/RecipeList'

export default function Search() {
  const queryString = useLocation().search
  console.log(queryString)
  // URLSearchParams.get is vanilla JavaScript
  const queryParams = new URLSearchParams(queryString)
  console.log(queryParams)
  const query = queryParams.get('q')
  console.log(query)
  const url = 'http://localhost:3000/recipes?q=' + query
  const { error, isPending, data } = useFetch(url)

  return (
    <div>
      <h2 className="page-title">Recipes including "{query}"</h2>
      {error && <p className="error">{error}</p>}
      {isPending && <p className="loading">Loading...</p>}
      {data && <RecipeList recipes={data}/>}
    </div>
  )
}
