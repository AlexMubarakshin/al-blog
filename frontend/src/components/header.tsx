import * as React from "react";

import { Container } from "./container";

interface IHeaderProps {
    title: string;
    description: string;
}

interface IHeaderState { }

export class Header extends React.Component<IHeaderProps, IHeaderState> {

    render() {
        return (
            <header className="header">
                <Container>
                    <h1 className="title">{this.props.title}</h1>
                    <h3 className="subtitle">{this.props.description}</h3>
                </Container>
            </header>
        );
    }
}