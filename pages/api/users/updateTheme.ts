import { withIronSessionApiRoute } from "iron-session/next";
import { connectToDatabase } from "../../../util/mongodb";

import { sessionOptions } from "../../../lib/session";

export default withIronSessionApiRoute(
  async function editRoute(req, res) {
    
    if(req.session.user){
        const {db} = await connectToDatabase();

        const userinfo = db.collection('userdata');
        const result = await userinfo.updateOne({name: req.session.user.user},
          {
           $set: {
              theme: req.body
           } 
          })
        res.send(200)
    }else{
        res.send(403)
    }
  },
  sessionOptions,
);