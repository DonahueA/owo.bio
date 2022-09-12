
import {ListingInfo} from "./Interfaces";

export default function LinkListing(info: ListingInfo) {
    return (
    <div className="LinkContainer"><a className="LinkItem" href={info.url}>{info.label}</a></div>
    );
}