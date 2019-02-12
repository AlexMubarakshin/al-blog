import * as React from "react";
import { Container } from "./container";
import { Link } from "react-router-dom";

interface INavProps {
    siteName: string;
}

interface INavState {}

export class Nav extends React.Component<INavProps, INavState> {

    render() {
        return (
            <nav className="navigation">
                <Container>
                    <Link className="navigation-title" to="/"><h1 className="title">{this.props.siteName}</h1></Link>
                    <div className="float-right">
                        <Link className="navigation-title" to="/admin"><p>ADMIN</p></Link>
                    </div>
                </Container>
            </nav>
        );
    }
}