
import { ChangeEventHandler, FormEvent } from "react";
import { LinkListingInfo } from "./Interfaces";

import EditableLabel from "./EditableLabel";
export default function EditLinkListing(info: LinkListingInfo, handleChange : ChangeEventHandler<HTMLInputElement>, deleteSelf : ()=>void ) {

    return (
    <div className="LinkContainer">
        <div>
            {EditableLabel("label", info.label, handleChange)}
            {EditableLabel("url", info.url, handleChange)}

            <input type="checkbox" id="enabled" name="enabled" checked={info.enabled} onChange={handleChange} />
            <button type="button" onClick={deleteSelf}>Delete</button>
        </div></div>
    );
}