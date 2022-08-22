import {ListingInfo} from "../components/Interfaces";

import Layout from "../components/Layout";
import ItemCollection from '../components/ListingCollection';
import LinkProfile from '../components/LinkProfile';

import {connectToDatabase} from "../util/mongodb"



interface PageInfo {
    name: string;
    found: boolean;
    listingData: [ListingInfo]

}


const linkpage = (pInfo : PageInfo) => {

    
    if(pInfo.found == false){
        return <Layout><h2 style={{marginTop:"200px", marginBottom:"100px"}}>The page you were looking for doesn't exist.</h2><h2> <a href="./register">Make this page yours.</a></h2></Layout>
    }
    return <Layout>
      {LinkProfile(pInfo.name)}
      {ItemCollection(pInfo.listingData)}
      </Layout>
  
  
}
  


export async function getServerSideProps({params}) {
    //Fetch from DB data
    // Connection URI
    const { db } = await connectToDatabase();


    const data = await db.collection("userdata").find({name: params.username}).toArray();
    if(data.length == 1){
        return {
            props: {name: params.username, found: true, listingData:data[0].links.filter(x=>x.enabled)}, // will be passed to the page component as props
          }
    }
    return {
        props: {name: "User not created", found: false, listingData:[]}, // will be passed to the page component as props
      }


}


export default linkpage