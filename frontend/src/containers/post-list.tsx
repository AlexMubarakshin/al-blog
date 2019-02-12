import * as React from "react";
import { connect } from "react-redux";

import { IApplicationStore, IPostStore } from "src/types/store";
import { Post } from "./post";

import { Container } from "src/components/container";

const mapStateToProps = (state: IApplicationStore) => ({
    postStore: state.postReducer
});

interface IPostListProps {
    postStore?: IPostStore;
}

interface IPostListState { }

@(connect as any)(mapStateToProps)
export class PostList extends React.Component<IPostListProps, IPostListState> {

    private renderPosts = () => (
        this.props.postStore && this.props.postStore.posts.map((value, key) => (
            <Post {...value} canEdit key={key}/>
        )))

    render() {
        return (
            <Container>
                <h3>Latest posts:</h3>
                {
                    !!this.props.postStore!!.posts.length ?
                        (
                            <div className="post-list">
                                {this.renderPosts()}
                            </div>
                        )
                        :
                        (
                            <p>No posts</p>
                        )
                        }
            </Container>
        );
    }
}