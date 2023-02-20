import { useFetch } from '../../hooks/useFetch'
import { useParams } from 'react-router-dom'

//styles
import './Recipe.css'

export default function Recipe() {
  const { id } = useParams()
  const {data, isPending, error} = useFetch(`http://localhost:3000/recipes/${id}`)
  return (
    <div>
      {error && <p className="error">{error}</p>}
      {isPending && <p className="loading">Loading...</p>}
      {data && <p>{data.title}</p>}
    </div>
  )
}
