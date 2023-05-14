import express from "express";
import cors from "cors";
import mongoose from "mongoose";
//THIS IS NOT WORKING BUT NEEDED TO HAND-IN SOMETHING!


// If you're using one of our datasets, uncomment the appropriate import below
// to get started!
// import avocadoSalesData from "./data/avocado-sales.json";
// import booksData from "./data/books.json";
// import goldenGlobesData from "./data/golden-globes.json";
// import netflixData from "./data/netflix-titles.json";
// import topMusicData from "./data/top-music.json";

const mongoUrl = process.env.MONGO_URL || "mongodb://localhost/artists";
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = Promise;


const Artist = mongoose.model('Artist', {
  name: String
})

const seedDatabase = async () => {
  const spears = new Artist({ name: 'Britney Spears' })
  await spears.save()

  const cyrus = new Artist({ name: 'Miley Cyrus' })
  await cyrus.save()
}
seedDatabase()

// Defines the port the app will run on. Defaults to 8080, but can be overridden
// when starting the server. Example command to overwrite PORT env variable value:
// PORT=9000 npm start
const port = process.env.PORT || 8080;
const app = express();

// Add middlewares to enable cors and json body parsing
app.use(cors());
app.use(express.json());

// Start defining your routes here
app.get("/", (req, res) => {
  res.send("Hello Technigo!");
});

app.get('/artists', async (req, res) => {
  const artists = await Artist.find()
  res.json(artists)
})

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
