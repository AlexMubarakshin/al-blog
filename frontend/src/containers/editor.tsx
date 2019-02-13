import * as React from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { RouteComponentProps } from "react-router-dom";

import { createPost, editPost } from "src/store/post/postActions";
import { IPost } from "src/types/model";
import { IApplicationStore, IPostStore } from "src/types/store";
import { Container } from "src/components/container";

import axios from "axios";
import { ROOT_API_URL } from "src/utils/constants";

const mapStateToProps = (state: IApplicationStore) => ({
    postStore: state.postReducer
});

interface IEditorProps extends RouteComponentProps<any> {
    dispatch?: Dispatch<any>;
    postStore: IPostStore;
}

interface IEditorState {
    editedPost?: IPost;
}

@(connect as any)(mapStateToProps)
export class Editor extends React.Component<IEditorProps, IEditorState> {

    private titleRef: HTMLInputElement | null;
    private editorRef: HTMLTextAreaElement | null;

    state: IEditorState = {
        editedPost: undefined
    };

    componentDidMount() {
        const editPostID = this.props.match.params.id;

        if (editPostID) {
            this.setEditMode(editPostID);
        }
    }

    private setEditMode = async (postId: string) => {
        // Search in redux store
        const editedPost = this.props.postStore.posts.find(post => post._id === postId);
        if (editedPost) {
            this.setEditPost(editedPost);
            return;
        }

        // Search at backend
        try {
            const response = await axios({
                method: "GET",
                url: `${ROOT_API_URL}/post/${postId}`,
                params: {
                    id: postId
                }
            });

            if (response.data) {
                this.setEditPost(response.data);
                return;
            }
        } catch (err) {
            console.error(err);
        }
    }

    private setEditPost = (post: IPost) => {
        this.titleRef!!.value = post.title;
        this.editorRef!!.value = post.content;

        this.setState({
            editedPost: post
        });
    }

    private onDone = () => {
        if (this.titleRef!!.value === "" || this.editorRef!!.value === "") {
            return;
        }

        const post: any = { title: this.titleRef!!.value, content: this.editorRef!!.value };

        if (this.state.editedPost) {
            post._id = this.state.editedPost._id;
            this.props.dispatch!!(editPost(post, this.onPostPosted));
        } else {
            this.props.dispatch!!(createPost(post, this.onPostPosted));
        }

    }

    private onPostPosted = (err?: any) => {
        if (!err) {
            (this.props as any).history.goBack();
        } else {
            console.warn(err);
        }

    }

    private onFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        e.stopPropagation();

        this.onDone();
    }

    render() {
        const title = !!this.state.editedPost ? "Edit post" : "Create new post";
        return (
            <div>
                <Container>
                    <form onSubmit={this.onFormSubmit}>
                        <fieldset>
                            <h1>{title}</h1>

                            <label htmlFor="post-title">Title</label>
                            <input ref={ref => this.titleRef = ref} placeholder="Title" id="post-title" type="text" autoComplete="off"></input>

                            <label htmlFor="post-content">Content</label>
                            <textarea ref={ref => this.editorRef = ref} id="post-content" placeholder="Content" />
                            <button type="submit">DONE</button>
                        </fieldset>
                    </form>
                </Container>
            </div>
        );
    }
}