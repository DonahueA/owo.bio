import React, { ChangeEventHandler } from "react";
export default function EditableLabel (name: string, label: string, onChange: ChangeEventHandler<HTMLInputElement>) {


    return (<input
    className="EditableLabel"
    type="text"
    name={name}
    value={label}
    onChange={onChange}
    />);

}