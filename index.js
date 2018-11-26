// IMPORTS
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
app.use(bodyParser.json({
    limit: "10mb"
}));
const cors = require("cors");

// `Cross-Origin Resource Sharing` est un mechanisme permettant d'autoriser les
// requêtes provenant d'un nom de domaine different Ici, nous autorisons l'API
// à repondre aux requêtes AJAX venant d'autres serveurs

app.use("/", cors());

// CONNEXION AU SERVEUR
mongoose.connect(process.env.URI || "mongodb://localhost:27017/todo", {
        useNewUrlParser: true
    },
    function (err) {
        if (err) console.error("Could not connect to mongodb.");
    }

);

// Models

// Routes


// Première page

app.get("/", function (req, res) {
    res.send("Welcome to To Do API.");
    console.log("hello");

});

// Toutes les méthodes HTTP (GET, POST, etc.) des pages non trouvées afficheront
// une erreur 404
app.all("*", function (req, res) {
    res.status(404).json({
        error: "Not Found"
    });
});

// Initialisation du serveur

app.listen(process.env.PORT || 3000, function () {
    console.log("Serveur initialisé");
});