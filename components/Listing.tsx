
import {ListingInfo} from "./Interfaces";

export default function LinkListing(info: ListingInfo, style: any) {

    if(!info.enabled){
        return <></>
    }
    if(!info.url.match(/https?:\/\/.+/i)){
        info.url = "https://" + info.url;
    }
    return (
    <div className="LinkContainer" style={style}>
        <a className="LinkItem" href={info.url}>{info.label}
        </a>
    </div>
    );
}