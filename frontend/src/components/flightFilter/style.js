//import { makeStyles } from '@mui/styles';
import { makeStyles } from "@material-ui/core/styles";
export const useStyles = makeStyles((theme) =>({
    row: {
        backgroundColor: "white"
    },
    textField: {
        maxWidth: "8.3em"
    },
    button: {
        backgroundColor: "#017A9B",
        color: "white",
    },
    grid: {
        backgroundColor: "white",
        border: "1px solid black",
        padding: "1em"
    },
    navLink: {
        textDecoration: 'none',
        color: "white"
    }

}))
export default useStyles;