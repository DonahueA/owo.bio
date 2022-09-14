export interface ListingInfo{
    enabled: boolean;
    url: string;
    label: string;
}


export interface Theme{
    textColor: string;
    bgColor: string;
    linkBgColor: string;
    hoverColor?: string;
    borderColor?: string;
}

export interface PageInfo {
    name: string;
    profile_url?: string;
    listingData?: [ListingInfo]
    theme: Theme
}
