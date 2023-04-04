import "dotenv/config";
import "./src/db.js";
import "./src/api.js";
import { app } from "./server.js";

app.listen(8000, () => console.log("✅ listen to http://localhost:8000"));
