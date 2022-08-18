
import { LinkListingInfo } from "./Interfaces";
export default function LinkListing(info: LinkListingInfo) {
    
    if(!info.url.match(/https?:\/\/.+/i)){
        info.url = "https://" + info.url;
    }
    return (
    <div className="LinkContainer"><a className="LinkItem" href={info.url}>{info.label}</a></div>
    );
}