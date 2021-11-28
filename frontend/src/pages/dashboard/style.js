//import { makeStyles } from '@mui/styles';
import { makeStyles } from "@material-ui/core/styles";
import wallpaper from "../../assets/Images/wallpaper.png"

export const useStyles = makeStyles((theme) =>({
    filter: {
        top:"10em",
        width: "38%",
        left:"8em",
        backgroundColor: "white",
        position: "relative",
        [theme.breakpoints.down("md")]: {
            width: "92%",
            left:"1.5em",
        },
    },
    wallpaper: {
        width: "100%",
        position: "absolute",
        zIndex: "0"
    },
    main: {
        backgroundImage: `url(${wallpaper})`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        width: '100vw',
        height: '100vh'
    },
    title: {
        position: "absolute",
        color: "#017A9B",
        fontSize: "1.3em",
        top:"0.5em"
    },
}))
export default useStyles;