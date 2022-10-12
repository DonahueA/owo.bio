
import {ListingInfo, PageInfo, Theme} from "./Interfaces";
import EditLinkListing from "./EditLinkListing";
import React, { ChangeEvent, FormEvent } from "react";
import Preview from "./Preview";
export default class EditLinkListingCollection extends React.Component<{pInfo: PageInfo}, {links: Array<ListingInfo>}> {

    constructor(props : {pInfo: PageInfo}) {
        super(props);
        this.state = {links: props.pInfo.listingData ? props.pInfo.listingData : []};
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChangeI = this.handleChangeI.bind(this);
        this.addLink = this.addLink.bind(this);
        this.deleteI = this.deleteI.bind(this);
      }
    
    handleChangeI(i: number){
        let handleChange = (e: ChangeEvent<HTMLInputElement>)=>{
            let current_links = this.state.links;
            const target = e.target;

            switch(target.name){
                case "url":
                    current_links[i].url= target.value;
                    break;
                case "enabled":
                    current_links[i].enabled = target.checked;
                    break;
                case "label":
                    current_links[i].label = target.value;
            }

            this.setState({links: current_links});
        }
        handleChange.bind(this);
        return handleChange;
    }

    deleteI(i:number){
        const links = this.state.links;
        links.splice(i, 1);
        this.setState({links: links});
    }
    handleSubmit(event: FormEvent<HTMLFormElement>) {
        //Send to API
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(this.state.links)
        };

        //Should notify user for success/failure
        fetch("/api/users/update", requestOptions)
        .then(res => {
            if(res.status == 200){
                console.log("Success!")
            }else{
                console.log("Error State")
            }
        });
        
        event.preventDefault();
    }
    
    addLink(){
        this.setState({links: [...this.state.links, {label: "Title", url:"Url", enabled: false}]})
    }


    render() {
        let pinkTheme : Theme = {textColor: '#FFFFFF', bgColor: '#fadcdc', linkBgColor: '#f9bab3', hoverColor: '#f9bab3'};
        
        let listings = this.state.links.map((linkListing : ListingInfo, index:number )=> <div key={index}>{EditLinkListing(linkListing, this.handleChangeI(index), ()=>{this.deleteI(index)})} </div>)
        return (
            <div className="flex flex-row">
                <div className="flex-1">
                    <div className="mx-2 md:mx-auto mt-4 lg:w-3/5">
                        <div className="text-3xl font-bold mb-8">Links</div>
                        <form onSubmit={this.handleSubmit}>
                        {listings}

                        <div style={{textAlign: "center"}}>
                        <button className="rounded-full bg-blue-500 text-white py-1 px-3 mr-4 hover:bg-blue-600" type="button" onClick={this.addLink}>Add New Link</button>
                        <button className="rounded-full bg-blue-500 text-white py-1 px-3 hover:bg-blue-600" type="submit" value="Save">Save Changes</button>
                        </div>
                        </form>
                    </div>
                </div>
            <div className="hidden mt-16 mx-8   md:block">
            <Preview profile_url={this.props.pInfo.profile_url} name={this.props.pInfo.name} theme={this.props.pInfo.theme} listingData={this.state.links}></Preview>
            </div>
            </div>
            );
    }
}