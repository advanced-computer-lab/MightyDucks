import { makeStyles } from "@material-ui/core/styles";
import wallpaper from "./../../assets/Images/card.jpg"
export const useStyles = makeStyles((theme) =>({
    grid: {
        background: `url(${wallpaper})`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        border: "1px solid black",
        padding: "0.5em"
    },
    dates: {
        color: "white",
        textShadow: "1.5px 1.5px black"
    },
    terminals: {
        color: "white",
        textShadow: "1.5px 1.5px black",
        fontSize: "4em",
        [theme.breakpoints.only("xs")]: {
            fontSize: "3em"
        },
    },
    button: {
        backgroundColor: "#017A9B",
        color: "white",
        borderRadius: "1em",
        marginBottom: "0.5em",
        "&:hover": {
        backgroundColor: "#0090B8",
        },
  
    },
    
}))
export default useStyles;