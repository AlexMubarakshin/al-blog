import * as React from "react";
import { Container } from "./container";

interface INavProps {
    siteName: string;
}

interface INavState {}

export class Nav extends React.Component<INavProps, INavState> {

    render() {
        return (
            <nav className="navigation">
                <Container>
                    <a className="navigation-title" href="/"><h1 className="title">{this.props.siteName}</h1></a>
                </Container>
            </nav>
        );
    }
}