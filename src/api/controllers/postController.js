const Post = require('../models/postModel');
const loripsum = require('../providers/loripsumApiProvider');

exports.list_all_post = (req, res) => {
  // Post.find({}, (error, posts) => {
  //   if(error){
  //     res.status(500);
  //     console.log(error);
  //     res.json({message: "Erreur serveur."})
  //   }
  //   else{
  //     res.status(200);
  //     res.json(posts)
  //   }
  // })

  Post.find({})
  .then(posts => {
    res.status(200);
    res.json(posts)
  })
  .catch(error => {
    res.status(500);
    console.log(error);
    res.json({message: "Erreur serveur."})
  })
}

exports.create_a_post = (req, res) => {
  let new_post = new Post(req.body);

// Function to save a post
  function savePost(resData, postData){
    postData.save((error, post) => {
      if(error){
        resData.status(500);
        console.log(error);
        resData.json({message: "Erreur serveur."})
      }
      else{
        resData.status(201);
        resData.json(post);
      }
    })
  }

// If there is no content
  if(!new_post.content){

    let getRandomText = loripsum.getRandomText()

    getRandomText
    .then(response => {
      new_post.content = response;

      savePost(res, new_post);

    })
    .catch(error => {
      res.status(500);
      console.log(error);
      res.json({message: "Erreur serveur."})
    })

  }
  // If there is a content
  else{
    savePost(res, new_post);
  }


}

exports.get_a_post = (req, res) => {
  // let post_id = req.params.post_id;
  let {post_id} = req.params;

  // Post.findOne({_id : post_id}, (error, posts) => {
  Post.findById(post_id, (error, post) => {
    if(error){
      res.status(500);
      console.log(error);
      res.json({message: "Erreur serveur."})
    }
    else{
      res.status(200);
      res.json(post)
    }
  })
}

exports.update_a_post = (req, res) => {
  // Post.findOneAndUpdate({_id: req.params.post_id}, req.body, {new: true}, (error, post) => {
  Post.findByIdAndUpdate(req.params.post_id, req.body, {new: true}, (error, post) => {
    if(error){
      res.status(500);
      console.log(error);
      res.json({message: "Erreur serveur."})
    }
    else {
      res.status(200);
      res.json(post);
    }
  })
}

exports.delete_a_post = (req, res) => {
  Post.remove({_id: req.params.post_id}, (error) => {
    if(error){
      res.status(500);
      console.log(error);
      res.json({message: "Erreur serveur."})
    }
    else {
      res.status(200);
      res.json({message: "Article supprimé"});
    }
  })
}
