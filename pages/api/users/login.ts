import { withIronSessionApiRoute } from "iron-session/next";
import { connectToDatabase } from "../../../util/mongodb";
const bcrypt = require("bcrypt");

const usersRepo = [{username : "xonas", password: "password"}]; 

export default withIronSessionApiRoute(
    async function loginRoute(req, res) {
      // get user from database then:
      
      if(req.method === 'POST'){
        const {username, password} = req.body;

        const { db } = await connectToDatabase();

        const data = await db.collection("userdata").find({name: username}).toArray();
        let hash = await new Promise((resolve, reject) => {
          bcrypt.hash(password, 10, function(err: any, hash: any) {
            if (err) reject(err)
            resolve(hash)
          });
        })

        if(data.length != 1)
         return res.status(400).send({ok: "false", error: "Could not find a user with that password."})
        

        if (await bcrypt.compare(password, data[0].hash)){
            res.status(200)
            req.session.user = {
                user: username,
              };
            await req.session.save();
            res.json({ok: true})

        }else{

            res.status(400).send({ok: "false", error: "Could not find a user with that password."})
        }

      }
      
    },
    {
      cookieName: "myapp_cookiename",
      password: "complex_password_at_least_32_characters_long",
      // secure: true should be used in production (HTTPS) but can't be used in development (HTTP)
      cookieOptions: {
        secure: process.env.NODE_ENV === "production",
      },
    },
  );