/*For routing of different pages */
const express=require('express')
const router=express.Router();

/* @route GET api/auth
Description of the route : Test Route 
Access of the route      :Public
(the access of the route can be public or private in private we
    send the token along like for authentication) */
router.get('/',function(request,response){
    response.send('Auth Router')
})

module.exports=router;