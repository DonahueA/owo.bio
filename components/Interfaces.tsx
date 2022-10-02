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
    //bio/username color
    //Font
    //Gradient
    //
}

export interface PageInfo {
    name: string;
    profile_url?: string;
    listingData?: Array<ListingInfo>
    theme: UserTheme
}


export interface UserTheme {
    linkItemStyle: any;
    profileBioStyle: any;
    profileImageStyle: any;
    backgroundStyle: any;
}