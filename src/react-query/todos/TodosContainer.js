import { useQuery } from "react-query";
import { apiGetTodos } from "src/api";

export default function TodosContainer({ children }) {
  const { status } = useQuery(['todos'], apiGetTodos, { enabled: false })

  return (
    <>
      <div>
          Status: {status}
      </div>
      <hr />
      {status !== 'success' && 'wait...'}
      <div hidden={status !== 'success'}>
        {children}
      </div>
    </>
  )
}
