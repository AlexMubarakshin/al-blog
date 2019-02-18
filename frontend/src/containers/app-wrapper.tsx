import * as React from "react";
import { Dispatch } from "redux";
import { connect } from "react-redux";

import { Footer } from "src/components/footer";

import { IApplicationStore, ISiteConfigStore, IGlobalStore, IProfileStore } from "src/types/store";
import { Nav } from "src/components/nav";
import { logout } from "src/store/auth/authActions";

const mapStateToProps = (state: IApplicationStore) => ({
    siteConfig: state.siteStore,
    globalStore: state.globalStore,
    profileStore: state.profileStore
});

interface IAppWrapperProps {
    siteConfig?: ISiteConfigStore;
    globalStore?: IGlobalStore;
    profileStore?: IProfileStore;

    dispatch?: Dispatch<any>;
}

interface IAppWrapperState { }

@(connect as any)(mapStateToProps)
export class AppWrapper extends React.Component<IAppWrapperProps, IAppWrapperState> {

    render() {
        const { siteConfig } = this.props;
        const links = [];
        if (this.props.globalStore && this.props.globalStore.token) {
            const user = this.props.profileStore && this.props.profileStore.user;

            const isAdmin = user && user.role === "admin";
            const userEmailTitle = user && user.email ? ` (${user.email})` : "";

            isAdmin && links.push({ title: "Admin", to: "/admin" });

            const logoutTitle = `Logout${userEmailTitle}`;
            links.push({ title: logoutTitle, onClick: () => this.props.dispatch!!(logout()) });
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