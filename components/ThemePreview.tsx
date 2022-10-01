import { Theme } from "./Interfaces";

export default function ThemePreview(theme: Theme & {isSelected: boolean}) {
    
    let selectedBorder = theme.isSelected ? {borderWidth: "2px", borderStyle: "solid", borderColor: "red"} : {};
    return (

    <div style={selectedBorder}>
    <div style={{ borderRadius:"15px", textAlign: "center", display: "flex", flexDirection: "column",justifyContent:"center", alignItems:"center", width: "144px", height: "192px", backgroundColor: theme.bgColor, color: theme.textColor}}>
        <div style={{background:theme.linkBgColor, width: "80%", marginBottom: "10px", borderRadius: "10px"}}>...</div>
        <div style={{background:theme.linkBgColor, width: "80%", marginBottom: "10px", borderRadius: "10px"}}>...</div>
        <div style={{background:theme.linkBgColor, width: "80%", marginBottom: "10px", borderRadius: "10px"}}>...</div>     
    </div>
    </div>
    );
}