
import { ChangeEventHandler, FormEvent } from "react";
import { ListingInfo } from "./Interfaces";
import Image from 'next/image'
import EditableLabel from "./EditableLabel";
export default function EditLinkListing(info: ListingInfo, handleChange : ChangeEventHandler<HTMLInputElement>, deleteSelf : ()=>void ) {

    return (
    <div className="EditLinkContainer">
        <div className="EditTextInputs">
            {EditableLabel("label", info.label, handleChange)}
            {EditableLabel("url", info.url, handleChange)}
        </div>
        <div className="EditLinkOptionsContainer">
            <input type="checkbox" className="switch_1" name="enabled" checked={info.enabled} onChange={handleChange} />
            <Image  width={25} height={25} onClick={deleteSelf} src="/icons8-trash-25-white.png" />
        </div></div>
    );
}