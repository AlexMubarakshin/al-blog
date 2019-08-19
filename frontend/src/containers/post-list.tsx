import * as React from "react";
import { Dispatch } from "redux";
import { connect } from "react-redux";

import { getPosts, loadMorePosts } from "src/store/post/postActions";

import { IApplicationStore, IPostStore, IGlobalStore } from "src/types/store";

import { Container } from "src/components/container";
import { PostMin } from "src/components/post-min";

const mapStateToProps = (state: IApplicationStore) => ({
    postStore: state.postStore,
    globalStore: state.globalStore
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

    private renderPosts = () => (
        this.props.postStore && this.props.postStore.posts.map((value) => (
            <PostMin
                key={value._id}
                id={value._id}
                title={value.title}
                subtitle={value.subtitle} />
        ))
    )

    private onLoadMoreClick = () => {
        this.props.dispatch!(loadMorePosts());
    }

    render() {
        const isLoadMoreBtnVisible = this.props.postStore!.totalLength !== this.props.postStore!.posts.length;
        const { isLoading, posts } = this.props.postStore!;
        const isEmpty = !posts.length;

        const isClearLoading = isEmpty && isLoading;
        const ifFullyEmpty = !isLoading && isEmpty;

        return (
            <Container>
                {
                    isClearLoading && (<h2>Loading...</h2>)
                }
                {
                    !isEmpty && (
                        <div className="post-list">
                            {this.renderPosts()}

                            <div>
                                {isLoadMoreBtnVisible && (<button onClick={this.onLoadMoreClick}>More</button>)}
                            </div>
                        </div>
                    )
                }
                {
                    ifFullyEmpty && (
                        <p>No posts</p>
                    )
                }
            </Container>
        );
    }
}