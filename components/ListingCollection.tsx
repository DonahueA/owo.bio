
import {ListingInfo} from "./Interfaces";
import LinkListing from "./LinkListing";

export default function ItemCollection(sites : Array<ListingInfo>) {

    return (
    <div className="LinkCollection">
        {sites.map(listItem => LinkListing(listItem))}

    </div>
    );
}