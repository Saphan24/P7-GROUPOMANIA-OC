const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const passwordValidator = require('password-validator');
const { User } = require('../models');

const autho = require('../utils/authorization');
const auth = require('../middleware/auth');
const { userId } = require('../utils/authorization');

// Création d'un schéma
const schema = new passwordValidator();
 
// Ajout des propriétés de passwordValidator
schema
.is().min(6)                                    //  Longueur minimale 6
.is().max(10)                                   //  Longueur maximale 10
.has().uppercase()                              //  Doit avoir des lettres majuscules
.has().lowercase()                              //  Doit avoir des lettres minuscules
.has().digits(1)                                //  Doit avoir au moins 1 chiffres
.has().not().spaces()                           //  Ne doit pas avoir d'espaces
.is().not().oneOf(['Passw0rd', 'Password123']); // Blacklist de ces valeurs

//Enregistrement d'un nouvel utilisateur
exports.signup = (req, res, next) => {
  if(!schema.validate(req.body.password)){
    console.error('Mot de passe non valide');
    return res.status(400).send('Mot de passe non valide');
  }
  console.log(req.body)
  bcrypt.hash(req.body.password, 10)
    .then(hash => {
      User.create({
        username: req.body.username,
        email: req.body.email,
        password: hash,
        description: req.body.description,
        isAdmin: req.body.isAdmin
      })
      .then((user) => res.status(201).send({ user }))
      .catch(error => res.status(400).send({ error }));
    })
    .catch(error => res.status(500).json({error}));
};

//Connection d'un utilisateur de la BDD
exports.login = (req, res, next) => {
  User.findOne({where: { email: req.body.email }})
    .then(user => {
      console.log(req.body.email)
      if (!user){
        return res.status(404).json({error: "Utilisateur non trouvé"});
    }
    console.log(user.password)
    bcrypt.compare( req.body.password, user.password)
      .then(valid => {
        if (!valid){
          return res.status(401).json({error: 'Mot de passe incorrect !'});
        }
        res.status(200).json({
          userId: user.id,
          token: jwt.sign(
            { userId: user.id, isAdmin: user.isAdmin },
            "RANDOM_TOKEN_SECRET",
            { expiresIn: '24h'}
          ),
          isAdmin: user.isAdmin
        });
      })
      .catch(error => res.status(500).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
};

//Modification d'un utilisateur
exports.modify = (req, res, next) => {
  const { id } = req.params;
  const { userId, isAdmin } = autho;
  if (id === userId || isAdmin) {
    User.findOne({where: {id}})
    .then((user) => {
      if (!user) {
        return res.status(404).json({message: 'Utilisateur non trouvé!'});
      }
    user.update({ ...req.body, id})
      .then(() => res.status(200).json({ message: 'Votre profil est modifié !'}))
      .catch(error => res.status(400).json({ error }))
    })
    .catch((error) => res.status(500).json({ error }));
  }
};

//Suppression d'un utilisateur
exports.delete = (req, res, next) => {
  const { id } = req.params;
  const { userId, isAdmin } = autho;

  if (id === userId || isAdmin) {
    User.findOne({where: { id }})
    .then((user) => {
      if (!user) {
        return res.status(404).json({message: 'Utilisateur non trouvé!'});
      }
      User.destroy({where: { id }})
        .then(() => res.status(200).json({message: 'Utilisateur supprimé'}))
        .catch(error => res.status(400).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
  } 
  else {
    return res.status(401).json({error});
  }
};

// Récupération d'un seul utilisateur dans la table User
exports.ProfilUser = (req, res, next) => {
  User.findOne({where: { id: req.params.id }})
      .then(user => {res.status(200).json(user)})
      .catch(error => res.status(404).json({error}));
};

// Récupération des profils utilisateurs dans la BDD
exports.AllProfilUser = (req, res, next) => {
  User.findAll({order: [[`username`, `ASC`]] })
      .then(user => {res.status(200).json(user)})
      .catch(error => res.status(404).json({error}));
}

