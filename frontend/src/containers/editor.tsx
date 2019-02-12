import * as React from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";

import { createPost, editPost } from "src/store/post/postActions";
import { IPost } from "src/types/model";

interface IEditorProps {
    dispatch?: Dispatch<any>;
}

interface IEditorState {
    editMode?: boolean;
}

@(connect as any)()
export class Editor extends React.Component<IEditorProps, IEditorState> {

    private titleRef: HTMLInputElement | null;
    private editorRef: HTMLTextAreaElement | null;

    state: IEditorState = {
        editMode: false
    };

    componentDidMount() {
        const postProp: IPost | undefined = (this.props as any).location.state && (this.props as any).location.state.post;
        this.setState({
            editMode: !!postProp
        });

        if (!!postProp) {
            this.titleRef!!.value = postProp.title;
            this.editorRef!!.value = postProp.content!!;
        }
    }

    private onDone = () => {
        if (this.titleRef!!.value === "" && this.editorRef!!.value === "") {
            return;
        }

        const post: IPost = { title: this.titleRef!!.value, content: this.editorRef!!.value, id: 1};
        
        if (this.state.editMode) {
            this.props.dispatch!!(editPost(post));
        } else {
            this.props.dispatch!!(createPost(post));
        }

        (this.props as any).history.goBack();
    }

    render() {
        return (
            <div>
                <h1>Editor</h1>
                <input ref={ref => this.titleRef = ref} placeholder={"Title"}></input>
                <textarea ref={ref => this.editorRef = ref} />
                <button onClick={this.onDone}>DONE</button>
            </div>
        );
    }
}