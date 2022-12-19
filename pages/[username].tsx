import Link from 'next/link'

import {ListingInfo, Theme, UserTheme, PageInfo} from "../components/Interfaces";

import Layout from "../components/Layout";
import ItemCollection from '../components/ListingCollection';
import LinkProfile from '../components/LinkProfile';

import {connectToDatabase} from "../util/mongodb"


/*
interface PageInfo {
    name: string;
    profile_url?: string;
    found: boolean;
    listingData: [ListingInfo]
    theme?: Theme
}
*/


const linkpage = (pInfo : PageInfo & {found: Boolean}) => {

    
    if(pInfo.found == false){
        return <><header><title>Not found | owo</title></header><Layout>
                <div className='flex flex-col h-full justify-center'>
                    <h2 className="text-primary-pink text-4xl font-bold" style={{ marginBottom:"100px"}}>The page you were looking for doesn&apos;t exist.</h2><h2>
                    <Link  className="text-primary-pink hover:underline" href="./register">Make this page yours.</Link></h2>
                </div>
            </Layout>
            </>
    }

    return <><title>{pInfo.name}</title>
    <style global jsx>{`
        body{
            background-color: ${pInfo.theme.backgroundStyle.backgroundColor};
            ${pInfo.theme.backgroundStyle.background ? 'background: ' + pInfo.theme.backgroundStyle.background : ''};
        }
        h2 {
            margin-top: 8px;
            margin-bottom: 30px;
            font-weight: 600;

        }

        .LinkContainer:hover{
            transform: scale(1.04);
            
        }

        .LinkContainer{
            transition: all .2s ease-in-out; 
        }
        
    `}</style>
    <Layout>

    {LinkProfile(pInfo.name, pInfo.profile_url, pInfo.theme.profileImageStyle, pInfo.theme.profileBioStyle)}
    {ItemCollection(pInfo.listingData, pInfo.theme.linkItemStyle)}
    </Layout></>


  
  
}
  


export async function getServerSideProps({params} : any) {
    //Fetch from DB data
    // Connection URI
    const { db } = await connectToDatabase();

    //dce4fa
    //b9c4fc
    //Temp Hardcoded themes

    let newblueTheme: UserTheme = {
        linkItemStyle: {backgroundColor: "#c5d0eb", color:"white", borderWidth: "3px", borderColor: "white", borderRadius: "50px"},
        profileBioStyle: {color:"white"},
        profileImageStyle: {},
        backgroundStyle: {backgroundColor: "#c5d0eb"}
    };

    const data = await db.collection("userdata").find({name: params.username}).toArray();
    if(data.length == 1){
        return {
            props: {
                name: params.username, 
                theme: data[0].theme, 
                profile_url:  data[0].profile_url ? "https://owo.sfo3.digitaloceanspaces.com/profile-images/" + data[0].profile_url: null, 
                found: true, 
                listingData:data[0].links.filter((x: { enabled: boolean; })=>x.enabled)}, // will be passed to the page component as props
          }
    }
    return {
        props: {name: "User not created", found: false, listingData:[]}, // will be passed to the page component as props
      }


}


export default linkpage