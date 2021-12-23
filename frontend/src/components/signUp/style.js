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
            width: "25em",
            backgroundColor: "#F9F9F9"
          },
    },

    textFieldRow:{
        
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
            width: "11.5em",
            backgroundColor: "#F9F9F9"
          },
    },

    textFieldRow2:{
        
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
            width: "8em",
            backgroundColor: "#F9F9F9"
          },
    },

    textFieldRow3:{  
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
            width: "15em",
            backgroundColor: "#F9F9F9"
          },
    },

    typography:{
        position: "relative",
        bottom: "0.7em",
        left: "4.8em",
        color: "#017A9B" 
    },

    relativity:{
        position: "absolute",
    },

    grid: {
        position: "absolute",
        border: "0.5px solid black",
        borderRadius: "1em",
        marginTop: "3.5em",
        padding: "2em",
        width: "70%",
        [theme.breakpoints.up("md")]: {
            width: "40%",
            left: "28%",
        },
        left: "12%",
        top: "5%"
    }

}))
export default useStyles;