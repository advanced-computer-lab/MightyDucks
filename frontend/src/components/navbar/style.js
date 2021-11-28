//import { makeStyles } from '@mui/styles';
import { makeStyles } from "@material-ui/core/styles";
export const useStyles = makeStyles((theme) =>({
    fields: {
    fontSize: "16px",
    marginLeft: "75px",
    marginBottom: "8px",
    fontStyle: "italic",
    color: "#087c9c",
    },
    text: {
        marginLeft: "75px",
        marginBottom: "15px",
        fontWeight: "500",
    },
    paper: {
        textAlign: "center",
        marginTop: "30px",
        padding: "15px",
    },
    list: {
        marginLeft: "20px",
        marginBottom: "10px",
        fontSize: "18px",
        display:"inline-flex",
        marginTop: "20px",
    },
    stylesEdited: {
        marginLeft: "20px",
    },
    drawer: {
        color: "white",
    },
    drawerLoc: {
        marginTop:"0.7em !important"
    },
    appBar: {
        boxShadow: "none !important",
        backgroundColor: "#017A9B !important",
        borderBottomLeftRadius: "0.4em",
        borderBottomRightRadius: "0.4em"
    },
    image: {
        width: "3.5em",
        marginTop: "0.2em"
    },
    grid2: {
        minWidth: "max-content"
    },
    barTitle: {
        color: "white",
        marginTop: "0.75em",
        fontWeight: "400",
        fontSize:"1.3em",
    },
    barText: {
        color: "white",
        fontSize:"1em",
    },
    barButtons: {
        color: "white",
        fontSize:"1em",
        cursor: "pointer"
    },
    divider: {
        color: "white",
        fontSize:"1.5em",
        margin: "-0.25em",
    },
    button: {
        color: "#2E3D49 !important",
        width: "7.5em !important",
        backgroundColor: "white !important",
        borderRadius: "0.95em !important",
    },
    navLink: {
        textDecoration: 'none',
        color: "white"
    }
}))
export default useStyles;