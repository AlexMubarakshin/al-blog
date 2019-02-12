import * as React from "react";
import { PostList } from "./post-list";
import { connect } from "react-redux";
import { IApplicationStore, ISiteConfigStore } from "src/types/store";
import { Link } from "react-router-dom";

const mapStateToProps = (state: IApplicationStore) => ({
    siteConfig: state.siteReducer
});

interface IHomeProps {
    siteConfig?: ISiteConfigStore;
}

interface IHomeState {}

@(connect as any)(mapStateToProps)
export class Home extends React.Component<IHomeProps, IHomeState> {

    render() {
        return (
            <div>
                <h1>{this.props.siteConfig && this.props.siteConfig.siteName}</h1>
                <PostList />

                <Link to={"/create/post"}>CREATE NEW</Link>
            </div>
        );
    }
}