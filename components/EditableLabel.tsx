import React, { ChangeEventHandler } from "react";
export default function EditableLabel (name: string, label: string, onChange: ChangeEventHandler<HTMLInputElement>) {


    return (<input
    className="EditableLabel"
    style={{ color: "inherit",  fontSize: "1.2em"}}
    type="text"
    name={name}
    value={label}
    onChange={onChange}
    />);

}