import * as React from "react";

export const Container: React.FC = ({ children }) => (
    <section className="container">
        {children}
    </section>
);