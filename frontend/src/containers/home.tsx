import * as React from "react";
import { PostList } from "./post-list";
import { connect } from "react-redux";
import { IApplicationStore, ISiteConfigStore } from "src/types/store";
import { Link } from "react-router-dom";

// Components
import { Header } from "src/components/header";
import { Container } from "src/components/container";

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
            <>
                <Header siteName={this.props.siteConfig!!.siteName}/>
                <PostList />

                <Container>
                    <Link className="button" to={"/create/post"}>Create new post</Link>
                </Container>
            </>
        );
    }
}