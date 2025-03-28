import { createServer } from "http";
import next from "next";
//nextjs server
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

//nextjs server start
app.prepare().then(() => {
  createServer((req, res) => {
    handle(req, res);
  }).listen(3000, (err) => {
    if (err) throw err;
    console.log("> Ready on http://localhost:3000");
  });
});
