export default function LinkProfile(name: string, profile_url?: string, profileImageStyle?: any, profileBioStyle?: any) {

    if(!profile_url){
        profile_url = "https://owo.sfo3.digitaloceanspaces.com/profile-images/default.webp"
    }
    return (
    <div className="text-center">
        <img style={{borderRadius: "100px", width: "100px", height: "100px", margin: "auto"}} src={profile_url} />
        <h2 className="text-2xl" style={{...profileBioStyle}}>{name}</h2>
    </div>
    );
}