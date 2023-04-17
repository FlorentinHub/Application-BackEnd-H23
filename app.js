// const express = require('express');
// const bodyParser = require('body-parser');

// const placesRoutes = require("./routes/places-routes")
// const utilisateursRoutes = require("./routes/utilisateurs-routes")
// const HttpErreur = require("./models/http-erreur");

// const app = express();

// app.use(bodyParser.json());

// app.use("/api/places", placesRoutes);
// app.use("/api/utilisateurs", utilisateursRoutes);

// app.use((requete, reponse, next) => {
//     return next(new HttpErreur("Route non trouvée", 404));
// });

// app.use((error, requete, reponse, next) => {
//     if(reponse.headerSent){
//         return next(error);
//     }
//     reponse.status(error.code || 500);
//     reponse.json({message: error.message || "Une erreur inconnue est survenue" });
// })



// app.listen(5000);
const express = require('express');
const mongoose = require('mongoose');

// Créer l'application Express
const app = express();

// Définir le port d'écoute
const port = 3000;

// Configurer la connexion à MongoDB avec Mongoose
mongoose.connect('mongodb://localhost:27017/college', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connecté à MongoDB'))
  .catch(err => console.error('Une erreur est survenue en se connectant à MongoDB', err));

// // Définir les routes pour les cours
// const courseRoutes = require('./routes/coursesRoutes');
// app.use('/courses', courseRoutes);

// Définir les routes pour les professeurs
const professorRoutes = require('./routes/professorRoutes');
app.use('/professors', professorRoutes);

// Définir les routes pour les étudiants
const studentRoutes = require('./routes/studentRoutes');
app.use('/students', studentRoutes);

// Ajouter une route pour la page d'accueil
app.get('/', (req, res) => {
  res.send('Bienvenue sur le site de gestion du collège');
});

// Lancer le serveur
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
