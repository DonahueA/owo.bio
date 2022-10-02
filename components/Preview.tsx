import { PageInfo, UserTheme } from "./Interfaces";
import LinkProfile from "./LinkProfile";
import ItemCollection from "./ListingCollection";

export default function Preview(pInfo : PageInfo) {

    return (<div>
                        <style >{`

            h2 {
                margin-top: 8px;
                margin-bottom: 30px;
                font-weight: 600;
            
            }
            .LinkItem{
                

            }
            .LinkContainer:hover{
                transform: scale(1.04);
                
            }

            .LinkContainer{
                width: 90%;
                margin: auto;
                margin-bottom: 1ch;
                transition: all .2s ease-in-out; 
            }
            
        `}</style>
        <div className="border-4 rounded-3xl border-black w-80 pt-6 overflow-auto" style={{height: "600px", ...pInfo.theme.backgroundStyle}}>
        {LinkProfile(pInfo.name, pInfo.profile_url, pInfo.theme.profileImageStyle, pInfo.theme.profileBioStyle)}
        {ItemCollection(pInfo.listingData, pInfo.theme.linkItemStyle)}
        </div>
        </div>)
}
