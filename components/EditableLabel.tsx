import React, { ChangeEventHandler } from "react";
export default function EditableLabel (name: string, label: string, onChange: ChangeEventHandler<HTMLInputElement>) {


    return (<input
    type="text"
    name={name}
    value={label}
    onChange={onChange}
    />);

}