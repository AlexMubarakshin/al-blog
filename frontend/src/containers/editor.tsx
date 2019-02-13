import * as React from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { RouteComponentProps } from "react-router-dom";

import { createPost, editPost } from "src/store/post/postActions";
import { IPost } from "src/types/model";
import { IApplicationStore, IPostStore } from "src/types/store";
import { Container } from "src/components/container";
import { Card } from "src/components/card";

import * as ReactMarkdown from "react-markdown";

import axios from "axios";
import { ROOT_API_URL } from "src/utils/constants";
import { Tabs } from "src/components/tabs";

enum EditorMode {
    EDITOR = "EDITOR",
    PREVIEW = "PREVIEW"
}

const mapStateToProps = (state: IApplicationStore) => ({
    postStore: state.postReducer
});

interface IEditorProps extends RouteComponentProps<any> {
    dispatch?: Dispatch<any>;
    postStore: IPostStore;
}

interface IEditorState {
    editorMode: EditorMode;

    title: string;
    subtitle: string;
    content: string;
}

@(connect as any)(mapStateToProps)
export class Editor extends React.Component<IEditorProps, IEditorState> {

    state: IEditorState = {
        editorMode: EditorMode.EDITOR,
        title: "",
        subtitle: "",
        content: ""
    };

    componentDidMount() {
        const editPostID = this.props.match.params.id;

        if (editPostID) {
            this.setEditMode(editPostID);
        }
    }

    private setEditMode = async (postId: string) => {
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
        this.setState({
            title: post.title,
            content: post.content,
            subtitle: post.subtitle
        });
    }

    private onDone = () => {
        if (this.state.title === "" || this.state.subtitle === "" || this.state.content === "") {
            return;
        }

        const post: any = { title: this.state.title, content: this.state.content, subtitle: this.state.subtitle };

        const editPostID = this.props.match.params.id;

        if (editPostID) {
            post._id = editPostID;
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

    private setMode = (editorMode: EditorMode) => {
        this.setState({
            editorMode
        });
    }

    private tabs = [
        { title: "Editor", onClick: () => this.setMode(EditorMode.EDITOR) },
        { title: "Preview", onClick: () => this.setMode(EditorMode.PREVIEW) }
    ];

    render() {
        const editPostID = this.props.match.params.id;
        const title = !!editPostID ? "Edit post" : "Create new post";

        return (
            <div>
                <Container>
                    <Tabs tabs={this.tabs} />
                    {
                        this.state.editorMode === EditorMode.EDITOR ?
                            (
                                <Card>
                                    <form onSubmit={this.onFormSubmit}>
                                        <fieldset>
                                            <h1>{title}</h1>

                                            <label htmlFor="post-title">Title</label>
                                            <input
                                                value={this.state.title}
                                                onChange={e => this.setState({ title: e.target.value })}
                                                placeholder="Title"
                                                id="post-title"
                                                type="text"
                                                autoComplete="off">
                                            </input>

                                            <label htmlFor="post-subtitle">Subtitle</label>
                                            <input
                                                value={this.state.subtitle}
                                                onChange={e => this.setState({ subtitle: e.target.value })}
                                                placeholder="Subtitle"
                                                id="post-subtitle"
                                                type="text"
                                                autoComplete="off">
                                            </input>

                                            <label htmlFor="post-content">Content</label>
                                            <textarea
                                                style={{ maxWidth: "714px", resize: "vertical", height: "512px" }}
                                                rows={555}
                                                value={this.state.content}
                                                onChange={e => this.setState({ content: e.target.value })}
                                                id="post-content"
                                                placeholder="Content" />
                                            <button className="float-right" type="submit">DONE</button>
                                        </fieldset>
                                    </form>
                                </Card>
                            )
                            :
                            (
                                <>
                                    <Card>
                                        <h2>{this.state.title}</h2>
                                        <ReactMarkdown source={this.state.content} />
                                    </Card>
                                </>
                            )
                    }
                </Container>
            </div>
        );
    }
}