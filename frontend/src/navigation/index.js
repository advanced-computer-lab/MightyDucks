import { BrowserRouter as Router,Route,Switch } from "react-router-dom";
import FlightModal from "../components/flightModal";
import Flight from "../pages/flight";

const RouterConfig =()=>{
    return(
    <Router>
        <Switch>
            <Route exact path ="/flight" component={Flight}/>
        </Switch>
    </Router>
    )
}
export default RouterConfig;