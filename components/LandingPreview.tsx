import { NextPage } from "next"
import { ListingInfo, PageInfo, UserTheme } from "../components/Interfaces";
import Preview from "../components/Preview"
import ThemePreview from "../components/ThemePreview"



const LandingPreview = ()=>{
    const bgPink: UserTheme = {
        linkItemStyle: {backgroundColor: "white", color:"#2b3235", borderRadius: "50px"},
        profileBioStyle: {color:"white"},
        profileImageStyle: undefined,
        backgroundStyle: {backgroundColor: "#fadcdc"}
    };

    const info: ListingInfo = {enabled: true, url: "reddit", label: "reddit"};
    
    const Example: PageInfo = {
        name: "strawburries",
        theme: bgPink,
        profile_url: "https://owo.sfo3.digitaloceanspaces.com/profile-images/bdea06c2-22a9-4732-b20e-3d72ec172c86.jpg"
    }

    const pinkTheme: UserTheme = {
        linkItemStyle: {backgroundColor: "#fadcdc", color:"white", borderWidth: "3px", borderColor: "white", borderRadius: "50px"},
        profileBioStyle: {color:"white"},
        profileImageStyle: undefined,
        backgroundStyle: {backgroundColor: "#fadcdc"}
    };

    const coolTheme: UserTheme = {
        linkItemStyle: {backgroundColorColor: "slategray", color:"white", borderWidth: "3px", borderColor: "white", borderRadius: "50px"},
        profileBioStyle: {color:"white"},
        profileImageStyle: undefined,
        backgroundStyle: {backgroundColor: "slategray"}
    };

    const coolTheme2: UserTheme  = {
        linkItemStyle: {backgroundColor: "white", color:"#2b3235", borderRadius: "50px"},
        profileBioStyle: {color:"white"},
        profileImageStyle: undefined,
        backgroundStyle: {backgroundColor: "#e7e5fb"}
    };

    //twitch youtube twitter discord
    const tempListing = [{enabled: true, url: "owo.bio/register", label: "♥ twitch ♥"}, {enabled: true, url: "owo.bio/register", label: "♥ youtube ♥"}, {enabled: true, url: "owo.bio/register", label: "♥ twitter ♥"}, {enabled: true, url: "owo.bio/register", label: "♥ discord ♥"}];
    return <div className="relative">
        <div className="previewRotate">
        <Preview name={Example.name} theme={coolTheme2} listingData={tempListing} profile_url={Example.profile_url}></Preview>
        </div>
        <div className="absolute previewRotate top-0 left-14">
        <Preview name={Example.name} theme={coolTheme} listingData={tempListing.slice(1,4)} profile_url={Example.profile_url}></Preview>
        </div>
        <div className="absolute previewRotate top-0 left-28">
        <Preview name={Example.name} theme={pinkTheme} listingData={tempListing} profile_url={Example.profile_url}></Preview>
        </div>
    </div>
} 
export default  LandingPreview 