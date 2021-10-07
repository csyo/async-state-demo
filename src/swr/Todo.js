import { useState } from "react";
import useSWR from "swr";
import { apiGetTodo, apiUpdateTodo } from "src/api";
import {useRouter} from "next/router";

export default function Todo() {
  const { query: { id } } = useRouter()

  const [title, setTitle] = useState('');

  const todo = useSWR(id ? ['todos', id] : null, () => apiGetTodo(id), {
    onSuccess: (data) => {
      setTitle(data.title ?? '')
    }
  })

  const [isInputDisabled, setIsInputDisabled] = useState(false);

  return (
    <div className="container">
      {todo.data ? <label>ID: {id}
        <input type='text' value={title} disabled={isInputDisabled} onChange={e => setTitle(e.target.value)}/>
      </label> : todo.status}

      <button
        className="input-button"
        type="submit"
        disabled={isInputDisabled}
        onClick={async () => {
          setIsInputDisabled(true);
          await apiUpdateTodo(id, title);
          setIsInputDisabled(false);
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
