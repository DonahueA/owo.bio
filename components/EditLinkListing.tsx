
import { ChangeEventHandler, FormEvent } from "react";
import { LinkListingInfo } from "./Interfaces";

import EditableLabel from "./EditableLabel";
export default function EditLinkListing(info: LinkListingInfo, handleChange : ChangeEventHandler<HTMLInputElement>, deleteSelf : ()=>void ) {

    return (
    <div className="EditLinkContainer">
        <div className="EditTextInputs">
            {EditableLabel("label", info.label, handleChange)}
            {EditableLabel("url", info.url, handleChange)}
        </div>
        <div className="EditLinkOptionsContainer">
            <input type="checkbox" className="switch_1" name="enabled" checked={info.enabled} onChange={handleChange} />
            <img  onClick={deleteSelf} src="./icons8-trash-25-white.png" />
        </div></div>
    );
}