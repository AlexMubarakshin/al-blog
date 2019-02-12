import * as React from "react";
import { connect } from "react-redux";

import { IApplicationStore, IPostStore } from "src/types/store";
import { Post } from "./post";
import { Link } from "react-router-dom";

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
            <div key={key}>
                <Post
                    title={value.title}
                    content={value.content!!} />
                <Link to={{
                    pathname: `/edit/post/${value.id}`,
                    state: {
                        post: value
                    }
                }}>Edit</Link>
            </div>
        )))

    render() {
        return (
            <div>
                <h3>Latest posts:</h3>
                {
                    !!this.props.postStore!!.posts.length ?
                        (
                            this.renderPosts()
                        )
                        :
                        (
                            <p>No posts</p>
                        )
                }
            </div>
        );
    }
}