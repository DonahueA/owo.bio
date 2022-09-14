import {ListingInfo} from "../components/Interfaces";

import PhotoSelect from "../components/EditLinkProfile";
import Layout from "../components/Layout";
import EditLinkListingCollection from '../components/EditLinkListingCollection';
import LinkProfile from '../components/LinkProfile';
import { withIronSessionSsr } from "iron-session/next";

import { sessionOptions } from "../lib/session";

import {connectToDatabase} from "../util/mongodb"
interface PageInfo {
    name: string;
    links: [ListingInfo]
    profile_url?: string;
}


const linkpage = (pInfo : PageInfo) => {
    
    
    return <Layout>
      <PhotoSelect name={pInfo.name} profile_url={pInfo.profile_url} ></PhotoSelect>
      <EditLinkListingCollection links={pInfo.links} />
      <div style={{padding: "20px", textAlign: "left"}}><button style={{background: "none", border: "0px", color: "black"}} onClick={()=>{fetch("./api/users/logout"), {method: "POST"};window.location.replace("/");}}>Logout</button>
      </div>
      </Layout>
      
}
  


export const getServerSideProps = withIronSessionSsr(async function getServerSideProps({req, res}: any) : Promise<any> {
    //Fetch from DB data

    //Redirect if not logged in
    if (req.session.user == undefined) {
        res.setHeader('location', '/login')
        res.statusCode = 302
        res.end()
        return {props: {name: ""}}
    }

    //Fetch from DB otherwise
    const { db } = await connectToDatabase();


    const data = await db.collection("userdata").find({name: req.session.user.user}).toArray();
    if(data.length == 1){
    
        return {
            props: {name:  req.session.user.user, links:data[0].links, profile_url:  data[0].profile_url ? "https://owo.sfo3.digitaloceanspaces.com/profile-images/" + data[0].profile_url: null}
          }
    }else{
        //Should never get here
        return {props: {name: ""}}
    }

    },sessionOptions,
)


export default linkpage