import * as React from "react";
import { Store } from "redux";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

// Styles
import "milligram";
import "./styles/App.css";

// Store
import { configureStore } from "./store/store";
import { IApplicationStore } from "./types/store";
import { getProfile } from "./store/profile/profileActions";
import { getSiteInfo } from "./store/site/siteActions";

// Routes
import { Register } from "src/containers/register";
import { SignIn } from "src/containers/signin";
import { AppWrapper } from "src/containers/app-wrapper";
import { Home } from "src/containers/home";
import { Post } from "src/containers/post";
import { Editor } from "src/containers/editor";

import { AdminHome } from "src/containers/admin/admin-home";
import { AdminPosts } from "src/containers/admin/admin-posts";
import { AdminUsers } from "src/containers/admin/admin-users";
import { AdminSite } from "src/containers/admin/admin-site";

import { PrivateRoute } from "./router/private-router";


interface IAppProps { }
interface IAppState {
    store: Store<IApplicationStore>;
    isLoading: boolean;
}

class App extends React.Component<IAppProps, IAppState> {

    constructor(props: IAppProps) {
        super(props);

        this.state = {
            isLoading: true,
            store: configureStore(this.onStoreConfigured)
        };
    }

    private onStoreConfigured = async () => {
        (this.state.store as any).dispatch(getProfile());
        (this.state.store as any).dispatch(getSiteInfo());

        this.setState({ isLoading: false });
    }

    render() {
        if (this.state.isLoading) {
            return (<h1>Loading...</h1>);
        }

        const { store } = this.state;
        return (
            <Provider store={store}>
                <Router>
                    <Switch>
                        <AppWrapper>
                            <Route exact path="/" component={Home} />
                            <Route exact path="/post/:id" component={Post} />
                            <Route exact path="/create/post" component={Editor} />
                            <Route exact path="/edit/post/:id" component={Editor} />

                            <Route exact path="/auth/login" component={SignIn} />
                            <Route exact path="/auth/register" component={Register} />

                            <PrivateRoute store={store} exact path="/admin" component={AdminHome} />
                            <PrivateRoute store={store} exact path="/admin/posts" component={AdminPosts} />
                            <PrivateRoute store={store} exact path="/admin/users" component={AdminUsers} />
                            <PrivateRoute store={store} exact path="/admin/site" component={AdminSite} />
                        </AppWrapper>
                    </Switch>
                </Router>
            </Provider>
        );
    }
}

export default App;
