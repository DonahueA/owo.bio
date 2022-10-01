import React from "react";

import { PageInfo, Theme } from "./Interfaces";
import Preview from "./Preview";
import ThemePreview from "./ThemePreview";


export default class ThemeSelector extends React.Component<{pInfo: PageInfo}, {selected: number}> {

    blueTheme : Theme = {textColor: '#FFFFFF', bgColor: '#dce4fa', linkBgColor: '#b9c4fc', hoverColor: '#b9c4fc'};
    purpleTheme : Theme = {textColor: '#FFFFFF', bgColor: '#e7e5fb', linkBgColor: '#cfbff8', hoverColor: '#cfbff8'};
    pinkTheme: Theme = {textColor: '#FFFFFF', bgColor: '#fadcdc', linkBgColor: '#f9bab3', hoverColor: '#f9bab3'};
    blueTheme2: Theme = {textColor: '#FFFFFF', bgColor: '#fadcdc', linkBgColor: '#f9bab3', hoverColor: '#f9bab3'};
    whiteAndBlack: Theme = {textColor: '#FFFFFF', bgColor: '#FFFFFF', linkBgColor: '#000000', hoverColor: '#000000'};
    themes: Theme[] = [this.blueTheme, this.purpleTheme, this.pinkTheme, this.blueTheme2, this.whiteAndBlack, this.blueTheme, this.purpleTheme, this.pinkTheme, this.blueTheme2, this.whiteAndBlack]
    constructor(props: {pInfo: PageInfo}){
        super(props);
        this.state = {selected: 0};
        
    }

    
    render(){
        let listings = this.themes.map((t:Theme, k: number) =>  {
            return <div onClick={()=>this.setState({selected: k})}><ThemePreview {...t} isSelected={k == this.state.selected}/></div>;
        })
        return <div>
            <div className="flex flex-row">
            <div className="w-3/5 md:background-red-900">
            <div className="flex flex-row flex-wrap gap-4">
            {listings}
            </div>
            <button>Submit</button>
            </div>
            <div>
            <Preview name={"xonas"} theme={this.themes[this.state.selected]} listingData={this.props.pInfo.listingData}></Preview>
            </div>
            
        </div>
        </div>
    }
}