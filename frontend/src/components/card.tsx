import * as React from "react";

interface ICardProps {
    raised?: boolean;
}

export class Card extends React.PureComponent<ICardProps> {

    render() {
        const classNames = ["card"];
        if (this.props.raised) {
            classNames.push("card--raised");
        }

        return (
            <div className={classNames.join(" ")}>
                <div className="card__content">
                    {this.props.children}
                </div>
            </div>
        );
    }
}