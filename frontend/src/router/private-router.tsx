import * as React from "react";
import { Store } from "redux";
import { Redirect, Route, RouteProps } from "react-router-dom";

import { IApplicationStore } from "src/types/store";

interface IPrivateRouterProps extends RouteProps {
    store: Store<IApplicationStore>;
}

interface IPrivateRouterState { }

export class PrivateRoute extends React.Component<IPrivateRouterProps, IPrivateRouterState> {

    render() {
        const { store, component: Komponent, ...rest } = this.props as any;
        const { token } = (store.getState() as IApplicationStore).globalStore;
        return (
            <Route
                {...rest}
                render={props => !!token ?
                    (
                        <Komponent {...props} />
                    )
                    :
                    (
                        <Redirect to={{ pathname: "/auth/login", state: { from: props.location } }} />
                    )
                }
            >
            </Route>
        );
    }
}