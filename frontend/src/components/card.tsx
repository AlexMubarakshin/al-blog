import * as React from "react";

interface ICardProps {
    raised?: boolean;
}

export const Card: React.FC<ICardProps> = ({ raised, children }) => {

    const classNames = ["card"];
    if (raised) {
        classNames.push("card--raised");
    }

    return (
        <div className={classNames.join(" ")}>
            <div className="card__content">
                {children}
            </div>
        </div>
    );
};
