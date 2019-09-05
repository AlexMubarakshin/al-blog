import * as React from "react";

import { Container } from "./container";

interface IHeaderProps {
    title: string;
    description: string;
}

export const Header: React.FC<IHeaderProps> = ({ title, description }) => (
    <header className="header">
        <Container>
            <h1 className="title">{title}</h1>
            <h3 className="subtitle">{description}</h3>
        </Container>
    </header>
);
