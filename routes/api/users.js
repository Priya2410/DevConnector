/*For routing of different pages */
const express=require('express')
const router=express.Router();
/* to validate email and password */
const {check,validationResult}=require('express-validator/check')


/* @route POST api/users 
Description of the route : Register the user 
Access of the route      :Public
(the access of the route can be public or private in private we
    send the token along like for authentication) */

/* second parameter is the message on the check */
router.post('/',[
check('name','Name is required')
.not()
.isEmpty(),
/* is email checks if its a valid email address */
/* the . after check is the for the rule we want to validate like 
length of password must be greater than 6 */
check('email','Please include a valid email').isEmail(),
check('password','Please enter a password with length greater than second').isLength({min:6})
],function(request,response){
    const errors=validationResult(request);
    /* if there is a error the response status is shwon */
    /* that error is converted to a json array and displayed */
    if(!errors.isEmpty()){
        return response.status(400).json({errors:errors.array()});
    }
    response.send('User Route')
})

module.exports=router;