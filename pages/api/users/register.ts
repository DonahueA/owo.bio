
import type { NextApiRequest, NextApiResponse } from 'next'

import { withIronSessionApiRoute } from "iron-session/next";

import { userAgentFromString } from 'next/server';
import { resourceLimits } from 'worker_threads';
import {connectToDatabase} from "../../../util/mongodb";
const bcrypt = require("bcrypt");


export default withIronSessionApiRoute(async function register(req: NextApiRequest,
    res: NextApiResponse<{}>
  ) {
    // split out password from user details 
    if (req.method === 'POST') {
        const { password, ...user } = req.body;

        
        // Will have to get from DB
        const { db } = await connectToDatabase();

        //Validate 
        if(!/^[a-zA-Z0-9\-\_]+$/.test(user.username)){
            res.status(400);
            res.json({error: "Invalid username."});
        }

        //Slow
        const emailInUse = await db.collection("userdata").find({email:user.email}).toArray();
        const result =  await db.collection("userdata").find({name: user.username}).toArray();
        if (emailInUse.length > 0){
            res.status(400);
            res.json({error: "Email in use", type:"email"})
        }
        else if (result.length >0 ){
            res.status(400)
            res.json({error: "Username in use", type:"username"})

        }else{
            // hash and store to DB

            user.hash = bcrypt.hash(password, 10, (err: any, hash: any)=>{
                db.collection("userdata").insertOne({name: user.username, email: user.email, hash: hash, links: []})
            })    

            //Should login
            req.session.user = {
                user: user.username,
              };
            await req.session.save();
            res.status(200).send({ok:true})
        }
    }
},{
    cookieName: "myapp_cookiename",
    password: "complex_password_at_least_32_characters_long",
    // secure: true should be used in production (HTTPS) but can't be used in development (HTTP)
    cookieOptions: {
      secure: process.env.NODE_ENV === "production",
    },
  },
);