
import {ListingInfo, ValListingInfo, LinkListingInfo } from "./Interfaces";

export default function LinkListing(info: LinkListingInfo) {
    return (
    <div className="LinkContainer"><a className="LinkItem" href={info.url}>{info.label}</a></div>
    );
}