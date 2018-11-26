// IMPORTS
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
app.use(bodyParser.json());
const cors = require("cors");

// `Cross-Origin Resource Sharing` est un mechanisme permettant d'autoriser les
// requêtes provenant d'un nom de domaine different Ici, nous autorisons l'API
// à repondre aux requêtes AJAX venant d'autres serveurs

app.use("/", cors());

// CONNEXION AU SERVEUR
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/todo", {
        useNewUrlParser: true
    },
    function (err) {
        if (err) console.error("Could not connect to mongodb.");
    }

);

// Models
const taskModel = mongoose.model("task", {
    description: String,
    finished: Boolean
});
// Routes
// / en GET, pour que le client récupère la liste des tâches

app.get("/", function (req, res) {
    taskModel.find().exec((function (err, tasks) {
        err ? res.json(err) : res.json(tasks);

    }))
});



// /create en POST, pour que le client puisse créer une tâche

app.post("/create", function (req, res) {
    console.log(req.body);

    const singleTask = new taskModel({

        description: req.body.description,
        finished: false
    });
    singleTask.save(function (err, obj) {
        if (err) {
            res.state(400).send("tfouuu");
        } else {
            res.json(obj);
        }
    });

});

// /update en POST, pour que le client puisse rendre une tâche faite ou non-faite

app.post("/update/:id", function (req, res) {
    taskModel.findOneAndUpdate({
            _id: req.params.id
        }, {
            finished: !res.finished
        },
        function (err, task) {
            if (!err) {
                res.json(task);
            } else {
                res.send("aie aie aie");
            }
        }
    );
});

// /delete en POST, pour que le client puisse supprimer une tâche

app.post("/delete/:id", function (req, res) {
    taskModel.findOneAndDelete({
            _id: req.params.id
        },
        function (err, task) {
            if (!err) {
                res.send("deleted");
            } else {
                res.send("aie aie aie");
            }
        }
    );
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