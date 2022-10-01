
import { withIronSessionSsr } from "iron-session/next";
import EditLinkListingCollection from "../../components/EditLinkListingCollection";

import Navbar from "../../components/EditNavBar";

import { ListingInfo, PageInfo, Theme} from "../../components/Interfaces";

import { sessionOptions } from "../../lib/session";
import { connectToDatabase } from "../../util/mongodb";




export default function links(pInfo: PageInfo) {

    
    return <div>
    <Navbar />
    <div>
    <EditLinkListingCollection links={pInfo.listingData} />
    </div>

    </div>;
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

