const { Post, User, Comment } = require('../models');
const fs = require('fs');
const autho = require('../utils/authorization');

//Création d'un post
exports.createPost = (req, res, next) => {

  // Valider une requête
  if (!req.body) {
    return res
      .status(400)
      .json({ message: "problème de requête!" });
  }
  // Créer un post
  console.log(autho.userId(req))
  const post = new Post({
    userId: autho.userId(req),
    title: req.body.title,
    content: req.body.content,
    image: req.file ? `${req.protocol}://${req.get('host')}/images/${req.file.filename}` : null
  });

  //Enregistré un post dans la BDD
  post.save()
    .then(() => res.status(200).json({message: 'Post créé'}))
    .catch(error => res.status(400).json({ error: 'non créé' }));
};

//Affichage d'un post
exports.getOnePost = (req, res, next) => {
  Post.findOne({where: { id: req.params.id }, include: [{ model: User }]})
    .then(post => res.status(200).json(post))
    .catch(error => res.status(400).json({error}));
};

//Affichage des posts
exports.getAllPosts = (req, res, next) => {
  Post.findAll({ include: [ 
      { model: User }, // Inclus la relation avec la table Post
      { model: Comment, include: [{ model: User }] } // Inclus la table User dans la table Comment
    ], 
    order: [["createdAt", "DESC"]] // Ordre d'affichage des posts
  })
    .then(post => res.status(200).json(post))
    .catch(error => res.status(400).json({error}));
};

//Modification de post
exports.modifyPost = (req, res, next) => {
  const { id } = req.params;
  if (id) {
    Post.findOne({where: {id}})
    .then((post) => {
      if (!post) {
        return res.status(404).json({message: 'post non trouvé!'});
      }
      const postObject = req.file ?
        {
          ...req.body,
          ...post,
          image: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
        } : {...req.body, ...post};
      Post.update({...postObject, id})
        .then(() => res.status(200).json({message: "Votre post a été modifié !"}))
        .catch(error => res.status(400).json({ error }));
    })
  }
};
  
// Suppression de post
exports.deletePost = (req, res, next) => {
  const { id } = req.params;
  const { userId } = autho.userId(req); 
  const { isAdmin } = autho.isAdmin(req);
 
  Post.findOne({ where: { id }}) // on récupère l'id du post dans la BDD
  .then((post) => {
    if (post.UserId === userId || isAdmin) {
      if (!post.image) {
        const filename = post.image.split('/images/')[1];
        fs.unlink(`images/${filename}`,() => {
          Comment.destroy({postId: post.id})
        });
      }
      Post.destroy({ where: {id}})
        .then(() => res.status(200).json({ message: "Post supprimé ! "}))
        .catch(error => res.status(400).json({ error }));
    } else {
      return res.status(401).json({error});
    }
  })
  .catch((error) => res.status(500).json({ error }));
};