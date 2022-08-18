import { connect } from "http2";
import { withIronSessionApiRoute } from "iron-session/next";
import { connectToDatabase } from "../../../util/mongodb";
export default withIronSessionApiRoute(
  async function editRoute(req, res) {
    
    if(req.session.user){
        const {db} = await connectToDatabase();

        const userinfo = db.collection('userdata');
        const result = await userinfo.updateOne({name: req.session.user.user},
          {
           $set: {
              links: req.body
           } 
          })
        res.send(200)
    }else{
        res.send(403)
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