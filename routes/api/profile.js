/*For routing of different pages */
const express=require('express')
const router=express.Router();
const auth=require('../middleware/auth');
const Profile=require('../../models/profile')
const User=require('../../models/User')
const {check,validationResult}=require('express-validator')


/* @route GET api/profile/me  .... to get my profile
Description of the route : Get current users profile
Access of the route      :Private
(the access of the route can be public or private in private we
    send the token along like for authentication) */

/* ROUTE TO GET OUR OWN PROFILE */
router.get('/me', auth, async (req, res) => {
    try {
        /* to get the user based on the user id */
      const profile = await Profile.findOne({
        user: req.user.id
      }).populate('user', ['name', 'avatar']);
  
      if (!profile) {
        return res.status(400).json({ msg: 'There is no profile for this user' });
      }
  
      res.json(profile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  });


  /* @route POST api/profile  .... to get my profile
Description of the route : Create or update user profile
Access of the route      :Private
(the access of the route can be public or private in private we
    send the token along like for authentication) */
router.post('/',
[
    auth, // Adding in the middlewares to authrize user and check if status and skills arent empty
[
    check('status','Status is required')
        .not()
        .isEmpty(),
    check('skills','Skills is required')
        .not()
        .isEmpty()
]],async function(request,response){
    const errors=validationResult(request);
    if(!errors.isEmpty())
    {
        return response.status(400).json({errors:errors.array()});
    }
    // to get the values from the request body
    const {
        company,
        website,
        location,
        bio,
        status,
        githubusername,
        skills,
        youtube,
        facebook,
        twitter,
        instagram,
        linkedin,
      } = request.body;

      // We have to build the profile object
      //Basically we set our profile up
      const profileFields={};
      profileFields.user=request.user.id;
      if(company) profileFields.company=company;
      if(website) profileFields.website=website;
      if(location) profileFields.location=location;
      if(bio) profileFields.bio=bio;
      if(status) profileFields.status=status;
      if(githubusername) profileFields.githubusername=githubusername;

      //since skills is an string we have to convert it to an array
      if(skills){
          //To convert the skills string into array
          //And remove extra space 
          profileFields.skills=skills.split(',').map(skill=>skill.trim());
          console.log(profileFields.skills);
        //   response.send('hello');
      }

      //To build the social object
      profileFields.social={};
      if(youtube) profileFields.social.youtube=youtube;
      if(twitter) profileFields.social.twitter=twitter;
      if(facebook) profileFields.social.facebook=facebook;
      if(linkedin) profileFields.social.linkedin=linkedin;
      if(instagram) profileFields.social.instagram=instagram;

      try {
        // We update the profile if present
        // Using upsert option (creates new doc if no match is found):
        let profile=await Profile.findOne({user:request.user.id});
        if(profile)
        {
            profile=await Profile.findOneAndUpdate({
                user:request.user.id},
                {$set :profileFields},
                {new :true}
        )
        return response.json(profile)
            
    }
    profile=new Profile(profileFields);
    await profile.save();
    response.json(profile);
}
      catch (err) {
        console.error(err.message);
        return response.status(500).send('Server Error');
      }
    }
  );


module.exports=router;