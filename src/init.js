import "dotenv/config.js";
import "./db.js";
import "./models/Track.js";
import "./models/User.js";
import app from "./server.js";

const port = 3000;

app.listen(port, () => {
  console.log(`✅ Server listening on port http://localhost:${port}`);
});
