import * as React from "react";
import { Dispatch } from "redux";
import { connect } from "react-redux";

import { deletePost, getPosts } from "src/store/post/postActions";

import { IApplicationStore, IPostStore, IGlobalStore } from "src/types/store";
import { Post } from "./post";

import { Container } from "src/components/container";

const mapStateToProps = (state: IApplicationStore) => ({
    postStore: state.postReducer,
    globalStore: state.globalReducer
});

interface IPostListProps {
    postStore?: IPostStore;
    globalStore?: IGlobalStore;
    dispatch?: Dispatch<any>;
}

interface IPostListState { }

@(connect as any)(mapStateToProps)
export class PostList extends React.Component<IPostListProps, IPostListState> {

    componentDidMount() {
        this.props.dispatch!!(getPosts());
    }

    private onRemovePost = (postID: string) => {
        this.props.dispatch!!(deletePost(postID));
    }

    private renderPosts = () => {
        const canEdit = !!this.props.globalStore!!.token;

        return this.props.postStore && this.props.postStore.posts.map((value) => (
            <Post
                key={value._id}
                canEdit={canEdit}
                onRemoveClick={this.onRemovePost}
                {...value} />
        ));
    }

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