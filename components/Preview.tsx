import { PageInfo } from "./Interfaces";
import LinkProfile from "./LinkProfile";
import ItemCollection from "./ListingCollection";

export default function Preview(pInfo : PageInfo) {

    
    return (<div>
                        <style >{`

            h2 {
                margin-top: 8px;
                margin-bottom: 30px;
                font-weight: 600;
                color: ${pInfo.theme.textColor};
            }
            .LinkItem{
                color: ${pInfo.theme.textColor};

            }
            .LinkContainer:hover{
                transform: scale(1.04);
                background-color: ${'hoverColor' in pInfo.theme ? pInfo.theme.hoverColor : ''}
                
            }

            .LinkContainer{
                width: 90%;
                margin: auto;
                transition: all .2s ease-in-out; 
                background-color: ${pInfo.theme.linkBgColor};
                border: ${'borderColor' in pInfo.theme ?  '3px ' + pInfo.theme.borderColor + ' solid' : '0' } ;
            }
            
        `}</style>
        <div className="border-4 rounded-3xl border-black w-80" style={{height: "600px", backgroundColor: pInfo.theme.bgColor, color: pInfo.theme.textColor}}>
        {LinkProfile(pInfo.name, pInfo.profile_url)}
        {ItemCollection(pInfo.listingData)}
        </div>
        </div>)
}

/*
                <style >{`

            h2 {
                margin-top: 8px;
                margin-bottom: 30px;
                font-weight: 600;
                color: ${pInfo.theme.textColor};
            }
            .LinkItem{
                color: ${pInfo.theme.textColor};
            }
            .LinkContainer:hover{
                transform: scale(1.04);
                background-color: ${'hoverColor' in pInfo.theme ? pInfo.theme.hoverColor : ''}
                
            }

            .LinkContainer{
                transition: all .2s ease-in-out; 
                background-color: ${pInfo.theme.linkBgColor};
                border: ${'borderColor' in pInfo.theme ?  '3px ' + pInfo.theme.borderColor + ' solid' : '0' } ;
            }
            
        `}</style>
*/