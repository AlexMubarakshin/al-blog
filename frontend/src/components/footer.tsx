import * as React from "react";
import { Container } from "./container";

export const Footer: React.FC = ({ children }) => (
    <footer>
        <Container>
            {children}
        </Container>
    </footer>
);