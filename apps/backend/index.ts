import express from "express";

const app = express();
const port = Number(process.env.PORT ?? 3001);

// Middleware to parse JSON
app.use(express.json());

// Basic GET route
app.get("/", (_req, res) => {
  res.json({ message: "Hello from Express running on Bun! 🥟" });
});

app.listen(port, () => {
  console.log(`Express server listening on port ${port}...`);
});
