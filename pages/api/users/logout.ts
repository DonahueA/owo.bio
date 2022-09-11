import { withIronSessionApiRoute } from "iron-session/next";
import { sessionOptions } from "../../../lib/session";

export default withIronSessionApiRoute(
  function logoutRoute(req, res) {
    if(req.method === 'POST'){
    req.session.destroy();
    res.send({ ok: true });
  }else{
    res.send({ok: false});
  }

  },
  sessionOptions,
);