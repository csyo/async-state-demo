import { useEffect, useState } from "react";
import useSWR from "swr";
import { apiGetTodos, apiCreateTodo } from "src/api";
import Link from 'next/link'

export default function Todos({ label }) {
  const [title, setTitle] = useState('');
  
  const { data: todos, mutate } = useSWR(['todos'], apiGetTodos);
 
  const [isInputDisabled, setIsInputDisabled] = useState(false);

  return (
    <div className="container">
      {`${label}: `}
      <input type='text' value={title} disabled={isInputDisabled} onChange={e => setTitle(e.target.value)}/>
      <button
        className="input-button"
        disabled={isInputDisabled || !title}
        onClick={async () => {
          setIsInputDisabled(true)
          await apiCreateTodo(title);
          setTitle('');
          setIsInputDisabled(false)
          mutate();
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
