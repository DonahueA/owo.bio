
import {ListingInfo} from "./Interfaces";
import LinkListing from "./Listing";

export default function ItemCollection(sites : Array<ListingInfo> | undefined, linkItemStyle: any) {

    if(!sites){
        return <div className="LinkCollection"></div>
    }
    return (
    <div className="LinkCollection">
        {sites.map(listItem => LinkListing(listItem, linkItemStyle))}

    </div>
    );
}