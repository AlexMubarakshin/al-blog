import * as React from "react";
import { PostList } from "./post-list";
import { connect } from "react-redux";
import { IApplicationStore, ISiteConfigStore } from "src/types/store";

// Components
import { Header } from "src/components/header";

const mapStateToProps = (state: IApplicationStore) => ({
    siteConfig: state.siteStore
});

interface IHomeProps {
    siteConfig: ISiteConfigStore;
}

interface IHomeState { }

@(connect as any)(mapStateToProps)
export class Home extends React.Component<IHomeProps, IHomeState> {

    render() {
        const { siteName, siteDescription } = this.props.siteConfig;
        return (
            <>
                <Header
                    title={siteName}
                    description={siteDescription}
                />
                <PostList />
            </>
        );
    }
}