import * as React from "react";
import { Link } from "react-router-dom";

import { IPost } from "src/types/model";
import { Card } from "src/components/card";

interface IPostProps extends IPost {
    canEdit?: boolean;

    onRemoveClick?(postID: number): void;
}

interface IPostState { }

export class Post extends React.PureComponent<IPostProps, IPostState> {
    private onRemoveClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.stopPropagation();
        e.preventDefault();

        if (this.props.onRemoveClick) {
            this.props.onRemoveClick(this.props.id);
        }
    }

    private adminFeatures = () => {

        return (
            <div className="row">
                {
                    this.props.canEdit && (<div className="column column-20"><Link className="button" to={`/edit/post/${this.props.id}`}>Edit</Link></div>)
                }
                {
                    this.props.onRemoveClick && (<div className="column column-20"><button onClick={this.onRemoveClick}>Remove</button></div>)
                }
            </div>
        );
    }

    render() {
        const renderAdminFeatures = this.props.canEdit || !!this.props.onRemoveClick;
        return (
            <Card>
                <div className="row">
                    <div className="column column-70">
                        <h2>{this.props.title}</h2>
                    </div>
                </div>
                <div className="row">
                    <div className="column">
                        <p>{this.props.content}</p>
                    </div>
                </div>
                {
                    renderAdminFeatures && this.adminFeatures()
                }
            </Card>
        );
    }
}