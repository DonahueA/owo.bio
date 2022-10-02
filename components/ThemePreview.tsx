import { UserTheme } from "./Interfaces";

export default function ThemePreview(theme: UserTheme & {isSelected: boolean}) {
    
    let selectedBorder = theme.isSelected ? {borderWidth: "2px", borderStyle: "solid", borderColor: "#5c9fbf", borderRadius: "15px"} : {borderRadius: "15px", borderWidth: "2px", borderStyle: "solid", borderColor: "grey"};
    return (

        
        
    <div className="drop-shadow-lg" style={selectedBorder}>
    <div style={{ borderRadius:"15px", textAlign: "center", display: "flex", flexDirection: "column",justifyContent:"center", alignItems:"center", width: "144px", height: "192px", ...theme.backgroundStyle}}>
        <div style={{...theme.linkItemStyle, width: "80%", marginBottom: "10px", borderRadius: "10px"}}>...</div>
        <div style={{...theme.linkItemStyle, width: "80%", marginBottom: "10px", borderRadius: "10px"}}>...</div>
        <div style={{...theme.linkItemStyle, width: "80%", marginBottom: "10px", borderRadius: "10px"}}>...</div>     
    </div>
    </div>
    );
}