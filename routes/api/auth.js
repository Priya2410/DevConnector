/*For routing of different pages */
const express=require('express')
const router=express.Router();
const auth=require('../middleware/auth')
const User=require('../../models/User')
/* @route GET api/auth
Description of the route : Test Route 
Access of the route      :Public
(the access of the route can be public or private in private we
    send the token along like for authentication) */
router.get('/',auth,async function(request,response){
    // response.send('Auth Router')
    try{
        const user= await User.findById(request.user.id).select('-password');
        response.json(user);
    }
    catch(err){
        console.error(err.message);
        response.status(500).send('Server error');
    }
})

module.exports=router;