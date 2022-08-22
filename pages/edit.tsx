import {LinkListingInfo, ListingInfo} from "../components/Interfaces";

import Layout from "../components/Layout";
import EditLinkListingCollection from '../components/EditLinkListingCollection';
import LinkProfile from '../components/LinkProfile';
import { withIronSessionSsr } from "iron-session/next";

import {connectToDatabase} from "../util/mongodb"
interface PageInfo {
    name: string;
    links: [LinkListingInfo]
}


const linkpage = (pInfo : PageInfo) => {
    
    return <Layout>
      {LinkProfile(pInfo.name)}
      <EditLinkListingCollection links={pInfo.links} />
      <button onClick={()=>{fetch("./api/users/logout"), {method: "POST"};window.location.replace("/");}}>Logout</button>
      </Layout>
  
}
  


export const getServerSideProps = withIronSessionSsr(async function getServerSideProps({req, res}) {
    //Fetch from DB data

    //Redirect if not logged in
    if (req.session.user == undefined) {
        res.setHeader('location', '/login')
        res.statusCode = 302
        res.end()
        return {props: {username: ""}}
    }

    //Fetch from DB otherwise
    const { db } = await connectToDatabase();


    const data = await db.collection("userdata").find({name: req.session.user.user}).toArray();
    if(data.length == 1){
    
        return {
            props: {name:  req.session.user.user, links:data[0].links}
          }
    }else{
        //Should never get here
        console.log("BIG ERROR");
    }

    },{
    cookieName: "myapp_cookiename",
    password: "complex_password_at_least_32_characters_long",
    // secure: true should be used in production (HTTPS) but can't be used in development (HTTP)
    cookieOptions: {
      secure: process.env.NODE_ENV === "production",
    },
  },
)


export default linkpage