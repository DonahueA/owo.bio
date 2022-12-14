import { withIronSessionApiRoute } from "iron-session/next";
import { sessionOptions } from "../../../lib/session";
import { connectToDatabase } from "../../../util/mongodb";

import { PassThrough } from "node:stream";

import { uploadStream } from "../../../util/spaces";

const formidable = require('formidable');
const sharp = require('sharp');
const { v4: uuidv4 } = require('uuid');




function streamTransform(file: { newFilename: string; }){

    const firstStream = new PassThrough();
    const lastStream = uploadStream(file);
    var transformer = sharp().resize({width: 100, height: 100}).jpeg({quality: 100});
    firstStream.pipe(transformer).pipe(lastStream);
    return firstStream;
}

function createFilename(){
    return uuidv4() + ".jpg"
}
export default withIronSessionApiRoute(
  async function logoutRoute(req, res) {
    if(req.method === 'DELETE'){
      const {db} = await connectToDatabase();

      const userinfo = db.collection('userdata');
      const result = await userinfo.updateOne({name: req.session.user!.user},
      {
      $set: {
          profile_url: 'https://owo.sfo3.digitaloceanspaces.com/profile-images/default.webp'
      } 
      })
      res.send({ok: true})
      return;
    }
    if(req.method === 'POST'){

        
        if(!req.session.user || !req.session.user.user){
            res.send(403)
        }
        var form = new formidable.IncomingForm({ filename: createFilename, fileWriteStreamHandler : streamTransform});
        

        
        form.parse(req, async function (err: any, fields: any, files: any) {
            if(err){
                console.log(err)
                res.send({ok: false})
            }
            
            //Send to DB
            console.log(files.file.newFilename)
            const {db} = await connectToDatabase();

            const userinfo = db.collection('userdata');
            const result = await userinfo.updateOne({name: req.session.user!.user},
            {
            $set: {
                profile_url: files.file.newFilename
            } 
            })
            res.send({ok: true})
        });

  }else{
    res.send({ok: false});
  }

  },
  sessionOptions,
);

export const config = {
    api: {
      bodyParser: false,
    },
  };
  