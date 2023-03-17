import express from "express";
import cors from "cors";
import bodyParser from 'body-parser';
import fetch  from 'node-fetch';
import dotenv from 'dotenv';
import moment from 'moment';
import 'moment/locale/fr.js';
import axios from "axios";

const urls= [
  "https://webmail.buyin.pro/lm_auth_proxy?DoLMLogin?curl=L2fowa&curlid=3446992831-3598899218",
  "https://mail.francemutuelle.fr/lm_auth_proxy?DoLMLogin?curl=L2fowa&curlid=661763043-2620574924",
  "https://webmail.adapei65.fr/ ",
  "https://webmail.francebrevets.com",
  "https://sts.lixir.fr/",
  "https://mail.nidek.fr/owa",
  "https://webmail.bredinprat.com/lm_auth_proxy?DoLMLogin?curl=L2fowa&curlid=1831998750-2022892364&curlmode=0",
  "https://www.lycra.com/en/coolmax-business",
  "https://www.fo-rothschild.fr",
  "https://francemutuelle.neocles.com",
  "https://adapei65.neocles.com",
  "https://gieccifinance.neocles.com",
  "https://gieccifinance.neocles.ir",
  "https://envoludia.neocles.com",
  "https://eri.neocles.com/vpn/index_2auth.html",
  "https://proudreed.neocles.com/vpn/index.html",
  "https://procie.neocles.com/vpn/index.html",
  "https://sfcdc65.neocles.com",
  "https://sagess-ctx.neocles.com",
  ];

// Configuration de CORS
const app = express();
axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "https://zola-testurl.netlify.app"); // remplacer "monsite.com" par le nom de domaine réel du site web
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
const corsOptions = {
  origin: 'https://zola-testurl.netlify.app',
  methods: 'GET, POST, HEAD',
  allowedHeaders: 'Content-Type',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}
app.use(cors());
moment.locale('fr');
const port=process.env.PORT;
// Utilisation de Moment
const today = moment().locale('fr').format('LL');
dotenv.config();

app.use(express.json())
// Middleware pour le parsing du corps de la requête
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.get("/", (req, res) => {
    res.send({ message: "Hello World!" });
});
// importations et configuration du serveur express

app.get('/check-urls', async (req, res) => {
  const results = [];
  for (const url of urls) {
    try {
      const response = await axios.get(url);
      results.push({ url, status: response.status });
    } catch (error) {
      results.push({ url, status: error.response ? error.response.status : 500 });
    }
  }
  res.json({ results });
});

  
  app.listen(5000, () => {
    console.log('Serveur démarré sur le port 3000');
  });