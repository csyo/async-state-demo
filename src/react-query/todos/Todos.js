import { useEffect, useState } from "react";
import { useQuery, useQueryClient, useMutation } from "react-query";
import { apiGetTodos, apiCreateTodo } from "src/api";
import Link from 'next/link'

export default function Todos({ label }) {
  const [title, setTitle] = useState();
  
  const queryClient = useQueryClient();
 
  const { data: todos } = useQuery(['todos'], apiGetTodos);
 
  const mutation = useMutation(apiCreateTodo, {
    onSuccess: () => {
      setTitle('');
      mutation.reset();
      queryClient.invalidateQueries(['todos'])
    },
  })

  return (
    <div className="container">
      {`${label}: `}
      <input type='text' value={title} disabled={!mutation.isIdle} onChange={e => setTitle(e.target.value)}/>
      <button
        className="input-button"
        disabled={!mutation.isIdle || !title}
        onClick={() => {
          mutation.mutate(title)
        }}
      >
        Add Todo
      </button>

      <ul>
        {todos?.map(todo => (
          <li key={todo.id}>
            <Link href={`/react-query/todo/${todo.id}`}>
              <a>{todo.title}</a>
            </Link>
          </li>
        )) ?? null}
      </ul>

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
