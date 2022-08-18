
import {ValListingInfo, LinkListingInfo, ListingInfo} from "./Interfaces";
import LinkListing from "./LinkListing";
import ValListing from "./ValListing";

export default function ItemCollection(sites : Array<ListingInfo>) {

    return (
    <div className="LinkCollection">
        {sites.map(listItem => {
            
            if (listItem.hasOwnProperty("gamesWon")) {
                return ValListing(listItem as ValListingInfo)
            }else{
                return LinkListing(listItem as LinkListingInfo)
            }
            
        })}

    </div>
    );
}