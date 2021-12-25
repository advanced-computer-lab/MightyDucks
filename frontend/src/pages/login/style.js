import { makeStyles } from "@material-ui/core/styles";
export const useStyles = makeStyles((theme) =>({
    
    textField:{
        "& label.Mui-focused":{
            color: "#017A9B",
        },
        '& .MuiOutlinedInput-root': {
            
            '& fieldset': {
              borderRadius: "0.5em",
              border: "0.5px solid black",
              minHeight: "1em",
            },
            "&.Mui-focused fieldset":{
                borderColor: "#017A9B",
            },
            width: "22em",
            backgroundColor: "#F9F9F9",
          },
    },

    grid: {
        position: "absolute",
        border: "0.5px solid black",
        borderRadius: "0.5em",
        marginTop: "3.5em",
        padding: "2em",
        width: "70%",
        [theme.breakpoints.up("md")]: {
            width: "40%",
            left: "28%",
        },
        left: "12%",
        top: "5%"
    },

    image: {
        width: "12em",
        marginTop: "0.2em"
    },

    icons: {
        color: "#2E3D49",
        opacity:"45%"
    },

    typography:{
        position: "relative",
        bottom: "0.1em",
        left: "3em",
        color: "#017A9B" 
    },

}))
export default useStyles;