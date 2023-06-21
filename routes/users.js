const { db } = require("../server");

const path = (app) => {
  app.get("/users", (req, res) => {
    const q = "SELECT * FROM users";
    db.query(q, (err, data) => {
      if (err) return res.json(err);
      return res.json(data);
    });
  });
  app.post("/users", (req, res) => {
    const nom = req.body.nom;
    const prenom = req.body.prenom;
    const mot_de_passe = req.body.mot_de_passe;
    const mail = req.body.mail;
    const roles = req.body.roles;
    if (!nom) {
      res.status(400).json({ error: "Le nom est obligatoire" });
      return;
    }
    if (!prenom) {
      res.status(400).json({ error: "Le prenom est obligatoire" });
      return;
    }
    if (!mot_de_passe) {
      res.status(400).json({ error: "Le mot de passe est obligatoire" });
      return;
    }
    if (!mail) {
      res.status(400).json({ error: "Le mail est obligatoire" });
      return;
    }
    if (!roles) {
      res.status(400).json({ error: "Le role est obligatoire" });
      return;
    }
    db.query(
      "INSERT INTO users(nom, prenom, mot_de_passe, mail, roles) VALUES(?, ?, ?, ?, ?)",
      [nom, prenom, mot_de_passe, mail, roles],
      (error, data) => {
        if (error) {
          console.error(error);
          res.status(500).send("Erreur du serveur");
        } else {
          res.status(201).json({ message: "Utilisateur créé avec succès" });
        }
      }
    );
  });
  app.put("/users/:id", (req, res) => {
    const { nom, prenom, mot_de_passe, mail, roles } = req.body;
    const id_users = req.params.id;
    db.query(
      "UPDATE users SET nom = ?, prenom = ?, mot_de_passe = ?, mail = ?, roles = ? WHERE id_users = ?",
      [nom, prenom, mot_de_passe, mail, roles, id_users],
      (error, data) => {
        if (error) {
          console.error(error);
          res.status(500).send("Erreur du serveur");
        } else {
          res.status(201).json({ message: "User modifié avec succès" });
        }
      }
    );
  });
  app.patch("/users/:id/:value", (req, res) => {
    const id_users = req.params.id;
    let value = {};
    if (req.params.value === "nom") {
      value = req.body.nom;
      reqSql = "UPDATE users SET nom = ? WHERE id_users = ?";
    } else if (req.params.value === "prenom") {
      value = req.body.prenom;
      reqSql = "UPDATE users SET prenom = ? WHERE id_users = ?";
    } else if (req.params.value === "mot_de_passe") {
      value = req.body.mot_de_passe;
      reqSql = "UPDATE users SET mot_de_passe = ? WHERE id_users = ?";
    } else if (req.params.value === "mail") {
      value = req.body.mail;
      reqSql = "UPDATE users SET mail = ? WHERE id_users = ?";
    } else if (req.params.value === "roles") {
      value = req.body.roles;
      reqSql = "UPDATE users SET roles = ? WHERE id_users = ?";
    } else {
      console.error("error");
    }
    db.query(reqSql, [value, id_users], (error, data) => {
      if (error) {
        console.error(error);
        res.status(500).send("Erreur du serveur");
      } else {
        res.status(201).json({ message: "Utilisateur modifié avec succès" });
      }
    });
  });
  app.delete("/users/:id", (req, res) => {
    const id = req.params.id;
    db.query("DELETE FROM users WHERE id_users = ?", [id], (err, results) => {
      if (err) throw err;
      if (results.affectedRows === 0) {
        res.status(404).send("user non trouvé");
      } else {
        res.status(200).json({ message: "user supprimé avec succès" });
      }
    });
  });
};

module.exports = path;
