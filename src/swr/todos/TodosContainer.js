import useSWR from "swr";
import { apiGetTodos } from "src/api";

export default function TodosContainer({ children }) {
  const { data, isValidating } = useSWR(['todos'], apiGetTodos)

  return (
    <>
      <div>
        isValidating: {isValidating ? 'True' : 'False'}
      </div>
      <hr />
      {!data && 'wait...'}
      <div hidden={!data}>
        {children}
      </div>
    </>
  )
}
