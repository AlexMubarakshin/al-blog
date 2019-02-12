import * as React from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { RouteComponentProps } from "react-router-dom";

import { createPost, editPost } from "src/store/post/postActions";
import { IPost } from "src/types/model";
import { IApplicationStore, IPostStore } from "src/types/store";
import { Container } from "src/components/container";

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
        const editedPost = editPostID && this.props.postStore.posts.find(post => post.id === +editPostID);

        this.setState({
            editedPost
        });

        if (!!editedPost) {
            this.titleRef!!.value = editedPost.title;
            this.editorRef!!.value = editedPost.content!!;
        }
    }

    private onDone = () => {
        if (this.titleRef!!.value === "" || this.editorRef!!.value === "") {
            return;
        }

        const postID = (this.state.editedPost && this.state.editedPost.id) || this.props.postStore.posts.length + 1;
        const post: IPost = { title: this.titleRef!!.value, content: this.editorRef!!.value, id: postID };

        if (this.state.editedPost) {
            this.props.dispatch!!(editPost(post));
        } else {
            this.props.dispatch!!(createPost(post));
        }

        (this.props as any).history.goBack();
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
                            <input ref={ref => this.titleRef = ref} placeholder="Title" id="post-title" type="text"></input>

                            <label htmlFor="post-content">Content</label>
                            <textarea ref={ref => this.editorRef = ref} id="post-content" placeholder="Content"/>
                            <button type="submit">DONE</button>
                        </fieldset>
                    </form>
                </Container>
            </div>
        );
    }
}