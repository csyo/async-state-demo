import useCount from "src/useCount";
import Timer from 'src/components/Timer';
import Todos from './Todos';
import TodosContainer from './TodosContainer';

export default function PageTodos() {
  const [count, button] = useCount();

  return <div>
    {button}
    <Timer />
    <hr />
    <TodosContainer>
      {Array.from({ length: count }).map((_, idx) => <Todos key={idx} label={idx + 1} />)}
    </TodosContainer>
  </div>
  
};
