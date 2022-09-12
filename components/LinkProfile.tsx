import Image from 'next/image'
import { profile } from 'node:console';

export default function LinkProfile(name: string, profile_url?: string) {

    if(!profile_url){
        profile_url = "https://owo.sfo3.digitaloceanspaces.com/profile-images/default.webp"
    }
    return (
    <div className="NameContainer">
        <img style={{borderRadius: "100px", width: "100px", height: "100px"}} src={profile_url} />
        <h2>{name}</h2>
    </div>
    );
}