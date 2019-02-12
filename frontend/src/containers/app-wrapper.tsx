import * as React from "react";
import { connect } from "react-redux";

import { Footer } from "src/components/footer";

import { IApplicationStore, ISiteConfigStore } from "src/types/store";
import { Nav } from "src/components/nav";

const mapStateToProps = (state: IApplicationStore) => ({
    siteConfig: state.siteReducer
});

interface IAppWrapperProps {
    siteConfig?: ISiteConfigStore;
}

interface IAppWrapperState { }

@(connect as any)(mapStateToProps)
export class AppWrapper extends React.Component<IAppWrapperProps, IAppWrapperState> {

    render() {
        const { siteConfig } = this.props;
        return (
            <main className="wrapper">
                <Nav siteName={siteConfig!!.siteName}/>

                {this.props.children}
                
                <Footer>
                    <p>{siteConfig!!.siteName} by <a href={siteConfig!!.ownerSiteURL} title={siteConfig!!.ownerName} target="_blank">{siteConfig!!.ownerName}</a>.</p>
                </Footer>
            </main>
        );
    }
}