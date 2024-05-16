import { UseTheme } from "./ThemeContext";

function colorPallete() {
    const darkTheme = UseTheme();
    
    const ThemeStyles = darkTheme === true ? {
        bg: "#141414",
        bg2:'#202020',
        color: "#e0e0e0",
        color2:'#33658a',
        color3:"#212121",
        color4:"#181818",
        color5:"#16161a"
    } : {
        bg: "#e0e0e0",
        color: "#141414",
        color3:'#e1e1e1',
        color4:"#e1e1e1",
        color5:"#33658a"
    };
    
       

    return ThemeStyles;
}

export default colorPallete;
