import * as React from "react";
import { Link } from "react-router-dom";

import { Card } from "./card";

interface IPostMinProps {
    id: string;
    title: string;
    subtitle: string;
}

export const PostMin: React.FC<IPostMinProps> = ({ id, title, subtitle }) => (
    <Card>
        <div className="row">
            <div className="column column-70">
                <Link to={`/post/${id}`}>
                    <h4>{title}</h4>
                </Link>
            </div>
        </div>
        <div className="row">
            <div className="column">
                <p>{subtitle}</p>
            </div>
        </div>
    </Card>
);
