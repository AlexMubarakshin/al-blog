import * as React from "react";
import { Dispatch } from "redux";
import { connect } from "react-redux";

import { Footer } from "src/components/footer";

import { IApplicationStore, ISiteConfigStore, IGlobalStore } from "src/types/store";
import { Nav } from "src/components/nav";
import { logout } from "src/store/auth/authActions";

const mapStateToProps = (state: IApplicationStore) => ({
    siteConfig: state.siteReducer,
    global: state.globalReducer
});

interface IAppWrapperProps {
    siteConfig?: ISiteConfigStore;
    global?: IGlobalStore;

    dispatch?: Dispatch<any>;
}

interface IAppWrapperState { }

@(connect as any)(mapStateToProps)
export class AppWrapper extends React.Component<IAppWrapperProps, IAppWrapperState> {

    render() {
        const { siteConfig } = this.props;
        const links = [];
        if (this.props.global!!.token) {
            links.push({ title: "Admin", to: "/admin" });
            links.push({ title: "Logout", onClick: () => this.props.dispatch!!(logout()) });
        } else {
            links.push({ title: "Login", to: "/auth/login" });
        }

        return (
            <main className="wrapper">
                <Nav
                    siteName={siteConfig!!.siteName}
                    links={links} />

                {this.props.children}

                <Footer>
                    <p>{siteConfig!!.siteName} by <a href={siteConfig!!.ownerSiteURL} title={siteConfig!!.ownerName} target="_blank">{siteConfig!!.ownerName}</a>.</p>
                </Footer>
            </main>
        );
    }
}