import Image from 'next/image'
import { ValListingInfo } from "./Interfaces";
export default function ValListing(options: ValListingInfo) {
    return (
    <div className="ValContainer">
        <div className="ValProfileInfo">
            <Image className="ValIcon" src="/PlayerCards/00CDB48D-4EBE-1977-2E4F-6296CDB57C4F_small.png" width="100" height="100"></Image>
            <div className="ValListingUsername" onClick={()=>navigator.clipboard.writeText(options.username+"#"+options.tag)}><span className="ValName">{options.username }</span><span className='ValTag'>{" #" + options.tag}</span></div>
        </div>
        
        <div>
        <div className="rank"><Image src="/Ranks/Platinum_3_Rank.png" alt="me" width="64" height="64" /></div>
        <div className="winrate">99 Wins, 0 Losses</div>
        </div>
    </div>
    );
}