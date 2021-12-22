const { Post, User, Comment } = require('../models');
const autho = require('../utils/authorization');
const fs = require('fs');

// création d'un commentaire
exports.createComment = (req, res, next ) => {

  // Valider une requête
  if (!req.body) {
    return res
      .status(400)
      .json({ message: "problème de requête!" });
  }
  
  // Créer un commentaire
  const comment = new Comment({
    userId: req.body.userId,
    postId: req.body.postId,
    content: req.body.content,
    image: `${req.protocole}://${req.get('host')}/images/${req.file.filename}`
  });

  // Enregistrement d'un commentaire dans la BDD
  comment.save()
    .then(() => res.status(201).json({message:'commentaire créé'}))
    .catch(error => res.status(400).json({error}));
};

//suppression d'un commentaire
exports.deleteComment = (req, res, next ) => {
  Comment.findOne({ where: {id: req.params.id}})
  .then( comment => {
    const filename = comment.image.split('/images/')[1];
      fs.unlink(`images/${filename}`,() => {
        Comment.destroy({ where: {id: req.params.id}})
          .then(() => res.status(200).json({ message: "commentaire supprimé ! "}))
          .catch(error => res.status(400).json({ error }));
      });
  })
  .catch(error => res.status(500).json({ error }));
};
  