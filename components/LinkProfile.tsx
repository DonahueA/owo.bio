import Image from 'next/image'

export default function LinkProfile(name: string, profile_url?: string) {

    console.log("YUP" + profile_url)
    return (
    <div className="NameContainer">
        <Image src={profile_url || "/default.webp"} width={100} height={100} style={{borderRadius: "100px"}}/>
        <h2>{name}</h2>
    </div>
    );
}