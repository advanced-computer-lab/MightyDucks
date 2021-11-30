import { makeStyles } from "@material-ui/core/styles";
export const useStyles = makeStyles((theme) =>({
    main: {
        marginTop: "4em"
    },
    card: {
       width: "70%",
        [theme.breakpoints.up("md")]: {
            width: "30%"
        },
        [theme.breakpoints.only("xs")]: {
            width: "90%"
        },  
   },
    empty: {
      fontWeight: "bold"
    },
    tabs: {
      "& .MuiTabs-indicator": {
        backgroundColor: "#017A9B",
      },
      "& .MuiTab-root.Mui-selected": {
        color: '#017A9B'
      }
    }
  }))
export default useStyles;