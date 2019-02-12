import * as React from "react";
import { Container } from "./container";

export class Footer extends React.PureComponent {

    render() {
        return (
            <footer>
                <Container>
                    {this.props.children}
                </Container>
            </footer>
        );
    }
}