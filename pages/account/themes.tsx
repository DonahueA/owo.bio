
import { withIronSessionSsr } from "iron-session/next";


import Navbar from "../../components/EditNavBar";

import { ListingInfo, PageInfo, Theme, UserTheme} from "../../components/Interfaces";
import ThemeSelector from "../../components/ThemeSelector";

import { sessionOptions } from "../../lib/session";
import { connectToDatabase } from "../../util/mongodb";




export default function themePage(pInfo: PageInfo) {

    
    return <div>
    <Navbar />
    <div>
    <ThemeSelector pInfo={pInfo} />
    
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
    
    let pinkTheme : UserTheme = {
        linkItemStyle: {backgroundColor: "white", color:"#2b3235", borderRadius: "50px"},
        profileBioStyle: {color:"white"},
        profileImageStyle: {},
        backgroundStyle: {backgroundColor: "#fadcdc"}
    };
    
    if(data.length == 1){

        let results : PageInfo = {
            name: req.session.user.user as string,
            listingData: data[0].links as [ListingInfo],
            profile_url: data[0].profile_url ? "https://owo.sfo3.digitaloceanspaces.com/profile-images/" + data[0].profile_url : "https://owo.sfo3.digitaloceanspaces.com/profile-images/default.webp",
            theme: data[0].theme
        };        

        return {
            props: results
          }
    }

    //Should never reach here.

    let empty : PageInfo = {
        name: 'User not found',
        theme: pinkTheme
    };
    return {props: empty};
    


    },sessionOptions,
)

