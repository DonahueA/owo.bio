import React from "react";
import PhotoSelect from "./EditLinkProfile";
import * as Slider from '@radix-ui/react-slider';
import { AllThemes, bgPink } from "../util/default-themes";
import { PageInfo, UserTheme } from "./Interfaces";
import Preview from "./Preview";
import ThemePreview from "./ThemePreview";
import { Dialog, DialogOverlay, DialogContent } from "@reach/dialog";
import "@reach/dialog/styles.css";
import { MinKey } from "mongodb";

export default class ThemeSelector extends React.Component<{pInfo: PageInfo}, {selected: number, profile_url: string,
     editingImage: boolean, new_profile_url: string, imageTranslate: {x: number, y: number}, imageDimensions : {width:number, height:number}, originalDimensions : {width:number, height:number}, imageScale: number}> {


 
    themes: UserTheme[] = AllThemes.slice(0);;

    constructor(props: {pInfo: PageInfo}){
        super(props);
        this.themes.unshift(props.pInfo.theme);
        this.state = {selected: 0, profile_url: props.pInfo.profile_url ? props.pInfo.profile_url : "undefined",
        new_profile_url: "none", editingImage : false , imageTranslate: {x: 0, y: 0}, imageDimensions: {width: 300, height: 300}, originalDimensions: {width: 300, height: 300}, imageScale: 1};
        this.sendTheme = this.sendTheme.bind(this);
        this.gotNewImage = this.gotNewImage.bind(this);
        this.updateTranslate = this.updateTranslate.bind(this);
        this.imageDiv = this.imageDiv.bind(this);
        this.sendImage = this.sendImage.bind(this);
        this.changeImage = this.changeImage.bind(this);
    }

    gotNewImage(e: React.ChangeEvent<HTMLInputElement>) {
        
        if(e.target.files?.length == 1){

            let test = URL.createObjectURL(e.target.files[0])
            this.setState({new_profile_url: URL.createObjectURL(e.target.files[0]), editingImage: true})

        }
    }

    changeImage(url: string){
        this.setState({profile_url: url});
    }
    async sendImage(){
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        // Set the canvas width and height to the desired crop size
        canvas.width = 300;
        canvas.height = 300;

        // Create an image element and set its src to the image blob
        const image = new Image();
        image.src = this.state.new_profile_url;

        // Draw the image to the canvas, starting at the top left corner (0, 0)
        // The image will be scaled to fit the canvas
        // drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight)
        let scaleFactor =  Math.max( 300/ this.state.originalDimensions.width,  300/this.state.originalDimensions.height);
        

        ctx!.drawImage(image, (-this.state.imageTranslate.x / this.state.imageScale) /  scaleFactor,
         (-this.state.imageTranslate.y/this.state.imageScale) / scaleFactor, (300 / this.state.imageScale) / scaleFactor,
          (300 / this.state.imageScale )/ scaleFactor, 0, 0, 300, 300);

        // Get the data URL of the canvas image
        const croppedImageDataURL = canvas.toDataURL();

        this.setState({profile_url: croppedImageDataURL});

        var data = new FormData()
            data.append('file',  await fetch(croppedImageDataURL)
            .then((res) => res.blob()));

            const config = {
                method: 'POST',
                body: data

            }
        
        fetch("/api/users/upload", config).then((res)=>console.log("res " + res))
        this.setState({editingImage: false, imageTranslate: {x: 0, y: 0}, imageDimensions: {width: 300, height: 300}, imageScale: 1})
    }

    updateTranslate(e: React.MouseEvent<HTMLImageElement, MouseEvent>) {
        if(e.buttons == 1){
            // Lowest translate can be 300-e.target.height, Heighest 0.
            let yTranslate = Math.min(0, Math.max(this.state.imageTranslate.y + e.movementY, 300-(e.target as HTMLImageElement).height));
            let xTranslate = Math.min(0, Math.max(this.state.imageTranslate.x + e.movementX, 300-(e.target as HTMLImageElement).width));

            this.setState({imageTranslate : {x: xTranslate, y: yTranslate }});
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

   
    imageDiv(e: any) {
        
        let scale = Math.max( 300/ e.target.naturalHeight,  300/e.target.naturalWidth);

        this.setState({imageDimensions: {width: e.target.naturalWidth * scale, height: e.target.naturalHeight * scale}, originalDimensions: {width: e.target.naturalWidth, height: e.target.naturalHeight}});

    }
    render(){
        let listings = this.themes.map((t:UserTheme, k: number) =>  {
            return <div key={k} onClick={()=>this.setState({selected: k})}><ThemePreview {...t} isSelected={k == this.state.selected}/></div>;
        })
        return <div>
            <Dialog className="overflow-hidden flex flex-col items-center" style={{width: "450px", borderRadius: "20px"}} isOpen={this.state.editingImage}>
                
                <div className="relative border-solid border-2 overflow-hidden" style={{width:'300px', height: '300px'}}>
                <img className={this.state.imageScale == 1 ? "" : "cursor-move"} onLoad={this.imageDiv} draggable={false} style={{ maxWidth: "revert",
                translate: this.state.imageTranslate.x +'px ' + this.state.imageTranslate.y + 'px',
                 width: this.state.imageDimensions.width * this.state.imageScale, height: this.state.imageDimensions.height * this.state.imageScale }}
                 onMouseMove={this.updateTranslate} src={this.state.new_profile_url} /> 
                <div className="absolute top-0 left-0 border-solid border-3 rounded-full w-full h-full pointer-events-none" style={{boxShadow: "0 0 0 9999px rgb(47 49 54 / 60%)"}} >

                </div>
                </div>
                <div className="my-2">
                <Slider.Root onValueChange={(e)=>this.setState({imageScale : 1 + e[0]/100 * 3, imageTranslate: {x: (this.state.imageTranslate.x-150) * ((1 + e[0]/100 * 3)/ this.state.imageScale) +150 , y: (this.state.imageTranslate.y-150) * ((1 + e[0]/100 * 3)/ this.state.imageScale) +150}})} className="SliderRoot" defaultValue={[0]} max={100} step={1} aria-label="Volume">
                <Slider.Track className="SliderTrack">
                    <Slider.Range className="SliderRange" />
                </Slider.Track>
                <Slider.Thumb className="SliderThumb" />
                </Slider.Root>
                </div>
                <div className="flex align-baseline">
                <button className="rounded-full cursor-pointer bg-primary-pink text-white py-1 px-3 hover:bg-focused-pink" onClick={this.sendImage} >Save</button>
                <button className="ml-8 rounded-full border-2 border-solid text-gray-400 py-1 px-3 font-normal mr-4" onClick={()=>this.setState({editingImage: false, imageTranslate: {x: 0, y: 0}, imageDimensions: {width: 300, height: 300}, imageScale: 1})} >Cancel</button>
                </div>
            </Dialog>
            <div className="flex flex-row">
            <div className="flex-1 text-left mx-4">
                <div className="mx-auto mt-4">
                <div className="mb-12">
                    <div className="text-3xl font-bold mb-8">Profile</div>
                <PhotoSelect gotNewImage={this.gotNewImage} name={this.props.pInfo.name} profile_url={this.state.profile_url} changeImage={this.changeImage}/>
                </div>
                <div className="text-3xl font-bold mb-8">Themes</div>
                
                <div className="flex flex-row flex-wrap gap-4" >
                {listings}
                </div>
                <div className="text-center py-2  bottom-0 sticky bg-white">
                <button onClick={()=>this.setState({selected: 0})} className="rounded-full border-2 border-solid text-gray-400 py-1 px-3 font-normal mr-4">Cancel</button>
                <button onClick={this.sendTheme} className="rounded-full cursor-pointer bg-primary-pink text-white py-1 px-3 hover:bg-focused-pink">Save Theme</button>
                </div>
                </div>
            </div>
            <div className="hidden mt-16 mx-8 md:block">
                <Preview profile_url={this.state.profile_url} name={this.props.pInfo.name} theme={this.themes[this.state.selected]} listingData={this.props.pInfo.listingData}></Preview>
            </div>
            
        </div>
        </div>
    }
}