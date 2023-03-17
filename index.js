import express from "express";
import cors from "cors";
import bodyParser from 'body-parser';
import fetch  from 'node-fetch';
import dotenv from 'dotenv';
import moment from 'moment';
import 'moment/locale/fr.js';
import cron from 'node-cron'

moment.locale('fr');
const port=process.env.PORT;
// Utilisation de Moment
const today = moment().locale('fr').format('LL');
dotenv.config();
const app = express();
app.use(express.json())
// Middleware pour le parsing du corps de la requête
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Configuration de CORS
app.use(cors());
app.get("/", (req, res) => {
    res.send({ message: "Hello World!" });
});
app.get('/check-url', async (req, res) => {
    const url = req.query.url;
  
    try {
      const response = await fetch(url, { method: 'HEAD' });
      const status = response.status;
      res.json({ url, status });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
  app.listen(5000, () => {
    console.log('Serveur démarré sur le port 3000');
  });