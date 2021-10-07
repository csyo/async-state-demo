import { useState } from "react";
import { useQuery, useQueryClient, useMutation } from "react-query";
import { apiGetTodo, apiUpdateTodo } from "src/api";
import {useRouter} from "next/router";

export default function Todo() {
  const { query: { id } } = useRouter()

  const [title, setTitle] = useState('');

  const queryClient = useQueryClient()
 
  const todo = useQuery(['todos', id], () => apiGetTodo(id), {
    enabled: !!id,
    onSuccess: (data) => {
      setTitle(data.title ?? '')
    }
  })
 
  const mutation = useMutation(apiUpdateTodo, {
    onSuccess: () => {
      queryClient.invalidateQueries(['todos', id])
    },
  })

  return (
    <div className="container">
      {todo.data ? <label>ID: {id}
        <input type='text' value={title} onChange={e => setTitle(e.target.value)}/>
      </label> : todo.status}

      <button
        className="input-button"
        type="submit"
        disabled={!todo.isSuccess}
        onClick={() => {
          mutation.mutate({ id, title })
        }}
      >Update Todo</button>

      <style jsx>{`
        .container {
          padding: 2rem;
        }

        .input-button {
          margin-left: 0.5rem;
        }
      `}</style>
    </div>
  )
}
