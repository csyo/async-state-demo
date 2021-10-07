import { delay, todos } from "@/todo.store"

export default async function handler(req, res) {
  if (req.method === 'POST') {
    todos.set(Date.now().toString(), JSON.parse(req.body).title);
    await delay(5000);
    res.status(200).send('ok');
  } else {
    res.status(405).send('not supported');
  }
}
