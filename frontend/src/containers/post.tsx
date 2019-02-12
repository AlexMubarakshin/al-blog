import * as React from "react";

interface IPostProps  { 
    title: string;
    content: string;
}

interface IPostState {}

export class Post extends React.PureComponent<IPostProps, IPostState> {

    render() {
        return (
            <div>
                <h2>{this.props.title}</h2>
                <p>{this.props.content}</p>
            </div>
        );
    }
}