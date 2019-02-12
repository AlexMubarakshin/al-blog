import * as React from "react";

import { Container } from "./container";

interface IHeaderProps {
    siteName: string;
}

interface IHeaderState {}

export class Header extends React.Component<IHeaderProps, IHeaderState> {

    render() {
        return (
            <header className="header">
                <Container>
                    <h1 className="title">{this.props.siteName}</h1>
                </Container>
            </header>
        );
    }
}