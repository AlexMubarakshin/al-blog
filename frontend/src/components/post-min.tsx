import * as React from "react";
import { Link } from "react-router-dom";

import { Card } from "./card";

interface IPostMinProps {
    id: string;
    title: string;
    subtitle: string;
}

export class PostMin extends React.PureComponent<IPostMinProps> {

    render() {
        return (
            <Card>
                <div className="row">
                    <div className="column column-70">
                        <Link to={`/post/${this.props.id}`}>
                            <h4>{this.props.title}</h4>
                        </Link>
                    </div>
                </div>
                <div className="row">
                    <div className="column">
                        <p>{this.props.subtitle}</p>
                    </div>
                </div>
            </Card>
        );
    }
}