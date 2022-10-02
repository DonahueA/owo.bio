
import { ListingInfo } from "./Interfaces";
export default function LinkListing(info: ListingInfo) {


    if(!info.url.match(/https?:\/\/.+/i)){
        info.url = "https://" + info.url;
    }
    return (
    <div className="LinkContainer"><a className="LinkItem" href={info.url}>{info.label}</a></div>
    );
}