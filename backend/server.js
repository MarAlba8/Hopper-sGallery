var express = require("express")
var cors = require('cors')
var app = express()
var db = require("./database.js")

app.use(cors())

var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Server port
var HTTP_PORT = 8000 
// Start server
app.listen(HTTP_PORT, () => {
    console.log("Server running on port %PORT%".replace("%PORT%",HTTP_PORT))
});
// Root endpoint
app.get("/", (req, res, next) => {
    console.log("connected..")
    res.json({"message":"Ok"})
});

//API endpoints
app.get("/api/items", (req, res, next) => {
    var sql = "select * from item"
    var params = []
    db.all(sql, params, (err, rows) => {
        if (err) {
          res.status(400).json({"error":err.message});
          return;
        }
        res.json({
            "message":"success",
            "data":rows
        })
      });
});

app.get("/api/item/:id", (req, res, next) => {
    var sql = "select * from item where id = ?"
    var params = [req.params.id]
    db.get(sql, params, (err, row) => {
        if (err) {
          res.status(400).json({"error":err.message});
          return;
        }
        res.json({
            "message":"success",
            "data":row
        })
      });
});

app.post("/api/item/", (req, res, next) => {
    var errors=[]
    if (!req.body.title){
        errors.push("No title specified");
    }
    if (errors.length){
        res.status(400).json({"error":errors.join(",")});
        return;
    }
    var data = {
        title: req.body.title,
        description: req.body.description,
        range : req.body.range,
        image: req.body.image
    }
    var sql ='INSERT INTO item (title, description, range, image) VALUES (?,?,?,?)'
    var params =[data.title, data.description, data.range, data.image]
    db.run(sql, params, function (err, result) {
        if (err){
            res.status(400).json({"error": err.message})
            return;
        }
        res.json({
            "message": "success",
            "data": data,
            "id" : this.lastID
        })
    });
})

app.patch("/api/item/:id", (req, res, next) => {
    var data = {
        title: req.body.title,
        description: req.body.description,
        range: req.body.range,
        image: req.body.image
    }
    db.run(
        `UPDATE item set 
           title = COALESCE(?,title), 
           description = COALESCE(?,description), 
           range = COALESCE(?,range),
           image = COALESCE(?,image) 
           WHERE id = ?`,
        [data.title, data.description, data.range, data.image, req.params.id],
        function (err, result) {
            if (err){
                res.status(400).json({"error": res.message})
                return;
            }
            res.json({
                message: "success",
                data: data,
                changes: this.changes
            })
    });
})

app.delete("/api/item/:id", (req, res, next) => {
    db.run(
        'DELETE FROM item WHERE id = ?',
        req.params.id,
        function (err, result) {
            if (err){
                res.status(400).json({"error": res.message})
                return;
            }
            res.json({"message":"deleted", changes: this.changes})
    });
})

//comments endpoints

app.get("/api/comments/:id_image", (req, res, next) => {
    var sql = "select * from comments where id_image = ?"
    var params = [req.params.id_image]
    db.all(sql, params, (err, rows) => {
        if (err) {
          res.status(400).json({"error":err.message});
          return;
        }
        res.json({
            "message":"success",
            "data":rows
        })
      });
});

app.post("/api/comment/:id_image", (req, res, next) => {
    var errors=[]
    if (!req.body.comment){
        errors.push("No comment specified");
    }
    if (errors.length){
        res.status(400).json({"error":errors.join(",")});
        return;
    }
    var data = {
        name: req.body.name,
        comment: req.body.comment,
        id_image: req.params.id_image
    }
    var sql ='INSERT INTO comments (name, comment, id_image) VALUES (?,?,?)'
    var params =[data.name, data.comment, req.params.id_image]
    db.run(sql, params, function (err, result) {
        if (err){
            res.status(400).json({"error": err.message})
            console.log(err.message)
            return;
        }
        res.json({
            "message": "success",
            "data": data,
            "id" : this.lastID
        })
    });
})


//rating endpoints
app.get("/api/rating/:id_image", (req, res, next) => {
    var sql = "select * from rating where id_image = ?"
    var params = [req.params.id_image]
    db.all(sql, params, (err, rows) => {
        if (err) {
          res.status(400).json({"error":err.message});
          return;
        }
        res.json({
            "message":"success",
            "data":rows
        })
      });
});

app.post("/api/rating/:id_image", (req, res, next) => {
    var errors=[]
    if (!req.body.rating){
        errors.push("No rating specified");
    }
    if (errors.length){
        res.status(400).json({"error":errors.join(",")});
        return;
    }

    var sql = "SELECT rate, n_voters FROM rating WHERE id_image = ?"
    var params = [req.params.id_image]
    db.all(sql, params, (err, row) => {
        if (err) {
          res.status(400).json({"error":err.message});
          return;
        }

        rate = row[0].rate;
        nVoters = row[0].n_voters;

        var newRate = ((rate*nVoters) + req.body.rating)/(nVoters+1);
        var newVoters = nVoters +1;

        var data = {
            rate: newRate,
            newVoters: newVoters
        }

        db.run(
            `UPDATE rating set 
               rate = COALESCE(?,rate), 
               n_voters = COALESCE(?,n_voters),
               id_image = COALESCE(?,id_image)
               WHERE id_image = ?`,
            [data.rate, data.newVoters, req.params.id_image, req.params.id_image],
            function (err, result) {
                if (err){
                    console.log("Error updating: " + err)
                    res.status(400).json({"error": res.message})
                    return;
                }
                res.json({
                    message: "success",
                    data: Math.round(data.rate),
                    changes: this.changes
                })
            }
        );
    });
})

// Default response for any other request
app.use(function(req, res){
    res.status(404);
});

