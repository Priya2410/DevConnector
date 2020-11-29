/*For routing of different pages */
const express=require('express')
const router=express.Router();
const {check,validationResult}=require('express-validator');
const auth=require('../middleware/auth');
const User=require('../../models/User');
const Post=require('../../models/Posts');
const Profile=require('../../models/profile');

/* @route POST api/posts
Description of the route :Create a post 
Access of the route      :Private
(the access of the route can be public or private in private we
    send the token along like for authentication) */
    router.post(
        '/',
        // to check if the user has sent any text if not there is a error
        [auth, [check('text', 'Text is required').not().isEmpty()]],
        async (req, res) => {
          const errors = validationResult(req);
          if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
          }
      
          try {
              //to get the user from his user id and select everything except password
            const user = await User.findById(req.user.id).select('-password');
      
            //Creating a newPost object
            const newPost = new Post({
              text: req.body.text,
              name: user.name,
              avatar: user.avatar,
              user: req.user.id
            });
      
            const post = await newPost.save();
      
            res.json(post);
          } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error');
          }
        }
      );

module.exports=router;