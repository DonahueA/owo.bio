import React from "react"
import Image from 'next/image'

export default class PhotoSelect extends React.Component<{name: string, profile_url?: string}, {profile_url: string}>{

    constructor(props : any) {
        super(props);
        // Don't call this.setState() here!
        if(this.props.profile_url){
            this.state = { profile_url: this.props.profile_url };
        }else{
            this.state = { profile_url: "https://owo.sfo3.digitaloceanspaces.com/profile-images/default.webp" };
        }
        
        this.gotNewImage = this.gotNewImage.bind(this);
      }

    gotNewImage(e: React.ChangeEvent<HTMLInputElement>) {
        if(e.target.files?.length == 1){

            let test = URL.createObjectURL(e.target.files[0])
            this.setState({profile_url: URL.createObjectURL(e.target.files[0])})

            var data = new FormData()
            data.append('file', e.target.files[0])
            console.log(e.target.files[0].name)

            const config = {
                method: 'POST',
                body: data

            }

            console.log(config)
            fetch("/api/users/upload", config).then((res)=>console.log("res " + res))
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

        return <div>
            <div className="relative" style={{width: "100px", height: "100px", margin: "auto"}}>
                <input style={fileInputStyle} type="file" accept="image/*" onChange={this.gotNewImage} />
                <img style={{objectFit: "cover", borderRadius: "100px", margin: "auto"}} width={100} height={100} src={this.state.profile_url}/>
                <div className="absolute bg-gray-200" style={{top: "76px", left: "76px", width: "20px", height:"20px", borderRadius:"10px", display:"flex" }}>
                <img  className="m-auto opacity-70" src="/photo-plus.svg"  width={16} height={16} />
                </div>
                
            </div>
        <h2 className="text-2xl mt-2 mb-8 font-semibold">{this.props.name}</h2></div>
    } 
}