import { delay, todos } from "@/todo.store"

export default async function handler(req, res) {
  if (!todos.has(req.query.id)) {
    res.status(404).send('not found');
    return;
  }
  
  if (req.method === 'GET') {
    console.log(typeof req.query.id);
    res.status(200).json({ id: req.query.id, title: todos.get(req.query.id) });
    return
  }

  if (req.method === 'PATCH') {
    todos.set(req.query.id, JSON.parse(req.body).title);
    await delay(300);
    res.status(200).send('ok');
    return
  }
}
