import * as React from "react";
import { Link } from "react-router-dom";

import { IPost } from "src/types/model";

interface IPostProps extends IPost {

    canEdit?: boolean;
}

interface IPostState { }

export class Post extends React.PureComponent<IPostProps, IPostState> {

    render() {
        return (
            <div className="post">
                <div className="row">
                    <div className="column column-90">
                        <h2>{this.props.title}</h2>
                    </div>
                    {
                        this.props.canEdit && (
                            <div className="column">
                                <Link to={`/edit/post/${this.props.id}`}>Edit</Link>
                            </div>
                        )
                    }
                </div>
                <div className="row">
                    <div className="column">
                        <p>{this.props.content}</p>
                    </div>
                </div>
            </div>
        );
    }
}