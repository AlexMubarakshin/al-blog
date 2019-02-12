import * as React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { Container } from "src/components/container";

import { deletePost } from "src/store/post/postActions";
import { IApplicationStore, IPostStore } from "src/types/store";

const mapStateToProps = (state: IApplicationStore) => ({
    postStore: state.postReducer
});


interface IAdminPostsProps {
    postStore: IPostStore;
    dispatch: React.Dispatch<any>;
}

interface IAdminPostsState { }

@(connect as any)(mapStateToProps)
export class AdminPosts extends React.Component<IAdminPostsProps, IAdminPostsState> {

    private onRemovePost = (e: React.MouseEvent<HTMLButtonElement>, postID: number) => {
        e.stopPropagation();
        e.preventDefault();

        this.props.dispatch!!(deletePost(postID));
    }

    render() {
        return (
            <Container>
                <Link className="button" to={"/create/post"}>Create new post</Link>
                <table>
                    <thead>
                        <tr>
                            <th>Post ID</th>
                            <th>Title</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.props.postStore.posts.map((post) => (
                                <tr key={post.id}>
                                    <td>{post.id}</td>
                                    <td>{post.title}</td>
                                    <td>
                                        <div className="row">
                                            <div className="column column-40">
                                                <Link className="button" to={`/edit/post/${post.id}`}>Edit</Link>
                                            </div>
                                            <div className="column column-40">
                                                <button onClick={(e) => this.onRemovePost(e, post.id)}>Remove</button>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </Container>
        );
    }
}