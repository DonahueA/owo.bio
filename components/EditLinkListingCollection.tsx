
import {LinkListingInfo} from "./Interfaces";
import EditLinkListing from "./EditLinkListing";
import React, { ChangeEvent, FormEvent, FormEventHandler } from "react";
import { assert } from "console";

export default class EditLinkListingCollection extends React.Component<{links: Array<LinkListingInfo>}, {links: Array<LinkListingInfo>}> {

    constructor(props : {links: Array<LinkListingInfo>}) {
        super(props);
        this.state = props;
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
        let listings = this.state.links.map((linkListing : LinkListingInfo, index:number )=> <div key={index}>{EditLinkListing(linkListing, this.handleChangeI(index), ()=>{this.deleteI(index)})} </div>)
        return (
            <div className="LinkCollection">
                <form onSubmit={this.handleSubmit}>
                {listings}

                <div className="EditLinkCollectionActions">
                <button id="add" type="button" onClick={this.addLink}>+</button>
                <button id="save" type="submit" value="Save">Save</button>
                </div>
                </form>
            </div>
            );
    }
}