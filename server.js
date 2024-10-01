import jsonServer from "json-server";
import bodyParser from "body-parser";
import cors from "cors";

const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();

server.use(bodyParser.json());
server.use(middlewares);
server.use(router);
server.use(cors());

// Custom login route
server.post("/login", (req, res) => {
  const { email, password } = req.body;
  const db = router.db;
  const user = db.get("users").find({ email, password }).value();

  if (user) {
    res.status(200).jsonp({ message: "Login successful", user });
  } else {
    res.status(401).jsonp({ message: "Invalid credentials" });
  }
});

// Start server
const PORT = 3000;
server.listen(PORT, () => {
  console.log(`JSON Server is running on http://localhost:${PORT}`);
});
