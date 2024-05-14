import { UseTheme } from "./ThemeContext";

function colorPallete() {
    const darkTheme = UseTheme();
    
    const ThemeStyles = darkTheme === true ? {
        bg: "#141414",
        color: "#e0e0e0",
        color2:'#33658a',
        color3:"#666666",
        color4:"#252525"
    } : {
        bg: "#e0e0e0",
        color: "#141414",
    };
    
       

    return ThemeStyles;
}

export default colorPallete;
