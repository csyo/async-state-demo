import { todos, delay } from "@/todo.store"

export default async function handler(req, res) {
  await delay(500);
  res.status(200).json(Array.from(todos.entries()).map(([id, title]) => ({ id, title })));
}
