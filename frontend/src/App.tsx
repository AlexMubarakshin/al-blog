import * as React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";

// Styles
import "milligram";
import "./styles/App.css";

// Routes
import { AppWrapper } from "./containers/app-wrapper";
import { Home } from "./containers/home";
import { Post } from "./containers/post";
import { Editor } from "./containers/editor";

// Store
import { store } from "./store/store";

class App extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <AppWrapper>
                    <Router>
                        <Switch>
                            <Route exact path="/" component={Home} />
                            <Route exact path="/post/:id" component={Post} />
                            <Route exact path="/create/post" component={Editor} />
                            <Route exact path="/edit/post/:id" component={Editor} />
                        </Switch>
                    </Router>
                </AppWrapper>
            </Provider>
        );
    }
}

export default App;
