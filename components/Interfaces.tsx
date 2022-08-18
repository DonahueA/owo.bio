export interface ListingInfo{
    enabled: boolean;
}

export interface ValListingInfo extends ListingInfo{
    username: string;
    tag: string;
    rank: string;
    gamesWon: string;
    gamesLost: string;
    rr: number;
    url: string;
}

export interface LinkListingInfo extends ListingInfo{
    url: string;
    label: string;
}