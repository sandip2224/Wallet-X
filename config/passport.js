const GoogleStrategy=require('passport-google-oauth20').Strategy
const mongoose=require('mongoose')

const userModel=require('../models/User')

module.exports=(passport)=>{
    passport.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: '/auth/google/callback'
    },
    async (accessToken, refershToken, profile, done)=>{
        const newUser={
            googleId: profile.id,
            displayName: profile.displayName,
            firstName: profile.name.givenName,
            lastName: profile.name.familyName,
            image: profile.photos[0].value
        }
        try{
            let user=await userModel.findOne({googleId: profile.id})
            if(user){ // If user exists
                done(null, user)
            }
            else{
                user=await userModel.create(newUser)
                done(null, user)
            }
        }
        catch(err){
            console.error(err)
        }
    }))
    passport.serializeUser((user, done)=>{
        done(null, user.id);
    });
        
    passport.deserializeUser((id, done)=>{
        userModel.findById(id, (err, user)=> done(err, user));
    })
}