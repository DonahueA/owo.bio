import React from "react";
import PhotoSelect from "./EditLinkProfile";

import { PageInfo, UserTheme } from "./Interfaces";
import Preview from "./Preview";
import ThemePreview from "./ThemePreview";


export default class ThemeSelector extends React.Component<{pInfo: PageInfo}, {selected: number, profile_url: string}> {



    blueTheme: UserTheme = {
        linkItemStyle: {backgroundColor: "#c5d0eb", color:"white", borderWidth: "3px", borderColor: "white", borderRadius: "50px"},
        profileBioStyle: {color:"white"},
        profileImageStyle: undefined,
        backgroundStyle: {backgroundColor: "#c5d0eb"}
    };

    pinkTheme: UserTheme = {
        linkItemStyle: {backgroundColor: "#fadcdc", color:"white", borderWidth: "3px", borderColor: "white", borderRadius: "50px"},
        profileBioStyle: {color:"white"},
        profileImageStyle: undefined,
        backgroundStyle: {backgroundColor: "#fadcdc"}
    };

    purpleTheme: UserTheme = {
        linkItemStyle: {backgroundColor: "#cfbff8", color:"white", borderWidth: "3px", borderColor: "white", borderRadius: "50px"},
        profileBioStyle: {color:"white"},
        profileImageStyle: undefined,
        backgroundStyle: {backgroundColor: "#cfbff8"}
    };

    blackTheme: UserTheme = {
        linkItemStyle: {backgroundColor: "white", color:"black", borderWidth: "3px", borderColor: "black", borderRadius: "50px"},
        profileBioStyle: {color:"black"},
        profileImageStyle: undefined,
        backgroundStyle: {backgroundColor: "white"}
    };

    defaultBlue: UserTheme = {
        linkItemStyle: {backgroundColor: "#b9c4fc", color:"white", borderRadius: "50px"},
        profileBioStyle: {color:"white"},
        profileImageStyle: undefined,
        backgroundStyle: {backgroundColor: "#dce4fa"}
    };
    defaultPurple: UserTheme = {
        linkItemStyle: {backgroundColor: "#cfbff8", color:"white", borderRadius: "50px"},
        profileBioStyle: {color:"white"},
        profileImageStyle: undefined,
        backgroundStyle: {backgroundColor: "#e7e5fb"}
    };
    defaultPink: UserTheme = {
        linkItemStyle: {backgroundColor: "#f9bab3", color:"white", borderRadius: "50px"},
        profileBioStyle: {color:"white"},
        profileImageStyle: undefined,
        backgroundStyle: {backgroundColor: "#fadcdc"}
    };

    bgGrey: UserTheme = {
        linkItemStyle: {backgroundColor: "white", color:"#2b3235", borderRadius: "50px"},
        profileBioStyle: {color:"white"},
        profileImageStyle: undefined,
        backgroundStyle: {backgroundColor: "#2b3235"}
    };
    bgBlue: UserTheme = {
        linkItemStyle: {backgroundColor: "white", color:"#2b3235", borderRadius: "50px"},
        profileBioStyle: {color:"white"},
        profileImageStyle: undefined,
        backgroundStyle: {backgroundColor: "#dce4fa"}
    };
    bgPurple: UserTheme = {
        linkItemStyle: {backgroundColor: "white", color:"#2b3235", borderRadius: "50px"},
        profileBioStyle: {color:"white"},
        profileImageStyle: undefined,
        backgroundStyle: {backgroundColor: "#e7e5fb"}
    };
    bgPink: UserTheme = {
        linkItemStyle: {backgroundColor: "white", color:"#2b3235", borderRadius: "50px"},
        profileBioStyle: {color:"white"},
        profileImageStyle: undefined,
        backgroundStyle: {backgroundColor: "#fadcdc"}
    };


 
    themes: UserTheme[] = [this.blueTheme, this.pinkTheme, this.purpleTheme, this.blackTheme, this.defaultBlue, this.defaultPurple, this.defaultPink, this.bgGrey,
    this.bgBlue, this.bgPurple, this.bgPink]
    constructor(props: {pInfo: PageInfo}){
        super(props);
        this.themes.unshift(props.pInfo.theme);
        this.state = {selected: 0, profile_url: props.pInfo.profile_url ? props.pInfo.profile_url : "undefined" };
        this.sendTheme = this.sendTheme.bind(this);
        this.gotNewImage = this.gotNewImage.bind(this);
    }

    gotNewImage(e: React.ChangeEvent<HTMLInputElement>) {
        if(e.target.files?.length == 1){

            let test = URL.createObjectURL(e.target.files[0])
            this.setState({profile_url: URL.createObjectURL(e.target.files[0])})

            var data = new FormData()
            data.append('file', e.target.files[0])


            const config = {
                method: 'POST',
                body: data

            }

            fetch("/api/users/upload", config).then((res)=>console.log("res " + res))
        }
        
    }

    sendTheme(){
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(this.themes[this.state.selected])
        };

        //Should notify user for success/failure
        fetch("/api/users/updateTheme", requestOptions)
        .then(res => {
            if(res.status == 200){
                console.log("Success!")
            }else{
                console.log("Error State")
            }
        });
    
    }
    
    render(){
        let listings = this.themes.map((t:UserTheme, k: number) =>  {
            return <div key={k} onClick={()=>this.setState({selected: k})}><ThemePreview {...t} isSelected={k == this.state.selected}/></div>;
        })
        return <div>
            <div className="flex flex-row">
            <div className="flex-1 text-left mx-4">
                <div className="mx-auto mt-4">
                <div className="mb-12">
                    <div className="text-3xl font-bold mb-8">Profile</div>
                <PhotoSelect gotNewImage={this.gotNewImage} name={this.props.pInfo.name} profile_url={this.state.profile_url}/>
                </div>
                <div className="text-3xl font-bold mb-8">Themes</div>
                
                <div className="flex flex-row flex-wrap gap-4" >
                {listings}
                </div>
                <div className="text-center mt-8">
                <button onClick={()=>this.setState({selected: 0})} className="rounded-full border-2 border-solid text-gray-400 py-1 px-3 font-normal mr-4">Cancel</button>
                <button onClick={this.sendTheme} className="rounded-full bg-blue-500 text-white py-1 px-3 hover:bg-blue-600">Save Theme</button>
                </div>
                </div>
            </div>
            <div className="hidden mt-16 mx-8   md:block">
                <Preview profile_url={this.state.profile_url} name={this.props.pInfo.name} theme={this.themes[this.state.selected]} listingData={this.props.pInfo.listingData}></Preview>
            </div>
            
        </div>
        </div>
    }
}