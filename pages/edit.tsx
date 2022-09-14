import {ListingInfo, Theme, PageInfo} from "../components/Interfaces";

import PhotoSelect from "../components/EditLinkProfile";
import Layout from "../components/Layout";
import EditLinkListingCollection from '../components/EditLinkListingCollection';

import { withIronSessionSsr } from "iron-session/next";

import { sessionOptions } from "../lib/session";

import {connectToDatabase} from "../util/mongodb"


const linkpage = (pInfo : PageInfo) => {
    
    


    return <>        <style global jsx>{`
        body {
            background-color: ${pInfo.theme.bgColor};
            color: ${pInfo.theme.textColor}
        }
        
        h2 {
            margin-top: 8px;
            margin-bottom: 30px;
            font-weight: 600;
            color: ${pInfo.theme.textColor};
        }


        .EditLinkContainer{
            background-color: ${pInfo.theme.linkBgColor};
            border: ${'borderColor' in pInfo.theme ?  '3px ' + pInfo.theme.borderColor + ' solid' : '0' } ;
        }
        .EditLinkCollectionButton{
            background-color: ${pInfo.theme.linkBgColor};
        }
        
    `}</style><Layout>
      <PhotoSelect name={pInfo.name} profile_url={pInfo.profile_url} ></PhotoSelect>
      {pInfo.listingData && <EditLinkListingCollection links={pInfo.listingData} />}
      <div style={{padding: "20px", textAlign: "left"}}><button style={{background: "none", border: "0px", color: "black"}} onClick={()=>{fetch("./api/users/logout"), {method: "POST"};window.location.replace("/");}}>Logout</button>
      </div>
      </Layout>
    </>
}
  


export const getServerSideProps = withIronSessionSsr(async function getServerSideProps({req, res}: any) : Promise<any> {
    //Fetch from DB data

    


    //Redirect if not logged in
    if (req.session.user == undefined) {
        res.setHeader('location', '/login')
        res.statusCode = 302
        res.end()
    }

    //Fetch from DB otherwise
    const { db } = await connectToDatabase();


    const data = await db.collection("userdata").find({name: req.session.user.user}).toArray();
    //TODO
    //assert that we're getting valid data from DB.

    //Temp Hard coded
    
    let pinkTheme : Theme = {textColor: '#FFFFFF', bgColor: '#fadcdc', linkBgColor: '#f9bab3', hoverColor: '#f9bab3'};
    if(data.length == 1){
        let results : PageInfo = {
            name: req.session.user.user as string,
            listingData: data[0].links as [ListingInfo],
            theme: pinkTheme
        };
        results.listingData = data[0].links as [ListingInfo]
        return {
            props: results
          }
    }

    //Should never reach here.

    let empty : PageInfo = {
        name: 'User not found',
        theme: {textColor: '#FFFFFF', bgColor: '#dce4fa', linkBgColor: '#b9c4fc', hoverColor: '#b9c4fc'}
    };
    return {props: empty};
    


    },sessionOptions,
)


export default linkpage