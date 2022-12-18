import React from "react"

export default class PhotoSelect extends React.Component<{name: string, gotNewImage:(e: React.ChangeEvent<HTMLInputElement>) => void, changeImage:(url: string) =>void, profile_url?: string}, {profile_url: string}>{

    constructor(props : any) {
        super(props);
        // Don't call this.setState() here!
        if(this.props.profile_url){
            this.state = { profile_url: this.props.profile_url };
        }else{
            this.state = { profile_url: "https://owo.sfo3.digitaloceanspaces.com/profile-images/default.webp" };
        }
        

      }

    
    render(): React.ReactNode {
        const fileInputStyle = {
            opacity: 0,
            zIndex: '2',
            position: 'absolute' as 'absolute',
            width: 100,
            height: 100,
            display: "block",
            cursor:"pointer"
        }

        return <div className="flex flex-row justify-center">
            <div className="relative" style={{width: "100px", height: "100px"}}>
                <input id="myfile" style={fileInputStyle} type="file" accept="image/*" onChange={this.props.gotNewImage} />
                <img style={{objectFit: "cover", borderRadius: "100px", margin: "auto"}} width={100} height={100} src={this.props.profile_url}/>
                <div className="absolute bg-gray-200" style={{top: "76px", left: "76px", width: "20px", height:"20px", borderRadius:"10px", display:"flex" }}>
                <img  className="m-auto opacity-70" src="/photo-plus.svg"  width={16} height={16} />
                </div>
                
            </div>
            <div className="flex flex-col justify-center ml-6 text-center">
                <label htmlFor="myfile" className="rounded-full bg-primary-pink text-white py-1 px-24 mb-1 font-semibold hover:bg-hovered-pink">Choose Image</label>
                <button className="rounded-full border-2 border-solid text-gray-400 py-1 px-24 font-normal" onClick={()=>{fetch("/api/users/upload", {method: 'DELETE'}); this.props.changeImage('https://owo.sfo3.digitaloceanspaces.com/profile-images/default.webp')}}>Delete</button>
            </div>
            </div>
    } 
}