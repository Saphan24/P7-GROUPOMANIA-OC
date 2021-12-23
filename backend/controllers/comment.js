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
    userId: autho.userId(req),
    postId: req.body.postId,
    content: req.body.content,
    image: req.file ? `${req.protocol}://${req.get('host')}/images/${req.file.filename}` : null
  });

  // Enregistrement d'un commentaire dans la BDD
  comment.save()
    .then(() => res.status(201).json({message:'commentaire créé'}))
    .catch(error => res.status(400).json({error}));
};

//suppression d'un commentaire
exports.deleteComment = (req, res, next ) => {
  const { id } = req.params;
  const { userId } = autho.userId(req); 
  const { isAdmin } = autho.isAdmin(req);

  Comment.findOne({ where: { id }})
  .then((comment) => {
    if (comment.UserId === userId || isAdmin) {
      /*Post.findOne({ where: {id: comment.postId}})
        .then((post) => {
          post.update({ where: {id: comment.postId}})
            .then(() => res.status(200).json({ message: "Commentaire supprimé ! "}))
            .catch(error => res.status(400).json({ error }))
        });*/
          comment.destroy({ where: { id }})
            .then(() => res.status(200).json({ message: "commentaire supprimé ! "}))
            .catch(error => res.status(400).json({ error }));
    } else {
      return res.status(401).json({error});
    }
  })
  .catch(error => res.status(500).json({ error }));
};

exports.getAllComments = (req, res, next ) => {
  Comment.findAll({ where: {postId: req.params.id }, 
    include: [ {model: User} ],
    order: [["createdAt", "DESC"]]
  })
    .then(comment => res.status(200).json(comment))
    .catch(error => res.status(400).json({error}));
}
  