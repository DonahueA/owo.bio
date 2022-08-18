
import {LinkListingInfo} from "./Interfaces";
import EditLinkListing from "./EditLinkListing";
import React, { ChangeEvent, FormEvent, FormEventHandler } from "react";

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
            const value = target.type === 'checkbox' ? target.checked : target.value;
            current_links[i][target.name] = value;
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
        fetch("http://localhost:3000/api/users/update", requestOptions)
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
                <button type="button" onClick={this.addLink}>Add new link</button>
                <button type="submit" value="Save" onClick={this.postData}>Save</button>
                
                </form>
            </div>
            );
    }
}