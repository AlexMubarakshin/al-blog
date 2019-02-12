import * as React from "react";

export class Container extends React.PureComponent {

    render() {
        return (
            <section className="container">
                {this.props.children}
            </section>
        );
    }
}