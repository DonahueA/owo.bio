import Link from 'next/link'

import {ListingInfo, Theme} from "../components/Interfaces";

import Layout from "../components/Layout";
import ItemCollection from '../components/ListingCollection';
import LinkProfile from '../components/LinkProfile';

import {connectToDatabase} from "../util/mongodb"



interface PageInfo {
    name: string;
    profile_url?: string;
    found: boolean;
    listingData: [ListingInfo]
    theme?: Theme
}


const linkpage = (pInfo : PageInfo) => {

    
    if(pInfo.found == false){
        return <Layout><h2 style={{marginTop:"200px", marginBottom:"100px"}}>The page you were looking for doesn&apos;t exist.</h2><h2> <Link href="./register">Make this page yours.</Link></h2></Layout>
    }
    if(!pInfo.theme){
    return <>
    <title>{pInfo.name}</title>
    <Layout>
      {LinkProfile(pInfo.name, pInfo.profile_url)}
      {ItemCollection(pInfo.listingData)}
      </Layout></>
    }else{

        return <><title>{pInfo.name}</title>
        <style global jsx>{`
            body {
                background-color: ${pInfo.theme.bgColor};
                color: ${pInfo.theme.textColor};
            }

            h2 {
                margin-top: 8px;
                margin-bottom: 30px;
                font-weight: 600;
                color: ${pInfo.theme.textColor};
            }
            .LinkItem{
                color: ${pInfo.theme.textColor};
            }
            .LinkContainer:hover{
                transform: scale(1.04);
                background-color: ${'hoverColor' in pInfo.theme ? pInfo.theme.hoverColor : ''}
                
            }

            .LinkContainer{
                transition: all .2s ease-in-out; 
                background-color: ${pInfo.theme.linkBgColor};
                border: ${'borderColor' in pInfo.theme ?  '3px ' + pInfo.theme.borderColor + ' solid' : '0' } ;
            }
            
        `}</style>
        <Layout>    
        {LinkProfile(pInfo.name, pInfo.profile_url)}
        {ItemCollection(pInfo.listingData)}
        </Layout></>

    }
  
  
}
  


export async function getServerSideProps({params} : any) {
    //Fetch from DB data
    // Connection URI
    const { db } = await connectToDatabase();

    //dce4fa
    //b9c4fc
    //Temp Hardcoded themes
    let blueTheme : Theme = {textColor: '#FFFFFF', bgColor: '#dce4fa', linkBgColor: '#b9c4fc', hoverColor: '#b9c4fc'};
    let purpleTheme : Theme = {textColor: '#FFFFFF', bgColor: '#e7e5fb', linkBgColor: '#cfbff8', hoverColor: '#cfbff8'};
    let pinkTheme: Theme = {textColor: '#FFFFFF', bgColor: '#fadcdc', linkBgColor: '#f9bab3', hoverColor: '#f9bab3'};
    

    const data = await db.collection("userdata").find({name: params.username}).toArray();
    if(data.length == 1){
        return {
            props: {name: params.username, theme: purpleTheme, profile_url:  data[0].profile_url ? "https://owo.sfo3.digitaloceanspaces.com/profile-images/" + data[0].profile_url: null, found: true, listingData:data[0].links.filter((x: { enabled: boolean; })=>x.enabled)}, // will be passed to the page component as props
          }
    }
    return {
        props: {name: "User not created", found: false, listingData:[]}, // will be passed to the page component as props
      }


}


export default linkpage