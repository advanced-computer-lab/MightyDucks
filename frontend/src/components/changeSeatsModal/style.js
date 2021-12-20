//import { makeStyles } from '@mui/styles';
import { makeStyles } from "@material-ui/core/styles";
export const useStyles = makeStyles((theme) =>({
    box1:{
        backgroundColor: "white"
    },
    box2:{
        backgroundColor: "#F9F9F9",
    },
    text1:{
        color: "#2E3D49",
        position:"relative",
        left: "2em",
        top:"0.53em",
    },
    text2:{
        color: "#2E3D49",
        marginTop: "1em",
        fontSize:"1.3em",
        textAlign: "center"
    },
    help: {
        position:"absolute",
        top:"0.35em",
        left:"0.2em"
     },
     row: {
         marginBottom: "1em"
     },
     button: {
        backgroundColor: "#F9F9F9",
        borderRadius: "1em",
        border: "0px",
        "&:hover": {
        backgroundColor: "#F2F2F2",
        },
    },
    modal: {
        width:"75%",
        [theme.breakpoints.down("sm")]: {
            width: "100%"
        },
         borderRadius: "0.5em"
    },
    alignment: {
        position: 'absolute',
        top: "20%",
        left: "12%",
        [theme.breakpoints.only("xs")]: {
            left: "0%"
        },
        [theme.breakpoints.only("sm")]: {
            left: "17%"
        },
        [theme.breakpoints.only("lg")]: {
            left: "40%"
        },
        [theme.breakpoints.up("xl")]: {
            left: "46%"
        }
    }
}))
export default useStyles;