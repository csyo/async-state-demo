export const apiGetTodos = () => fetch('/api/todos').then(res => res.json());

export const apiGetTodo = (id) => fetch(`/api/todo/${id}`).then(res => res.json());

export const apiCreateTodo = (title) => fetch('/api/todo', { method: 'POST', body: JSON.stringify({ title }) });

export const apiUpdateTodo = ({ id, title }) => fetch(`/api/todo/${id}`, { method: 'PATCH', body: JSON.stringify({ title }) });
