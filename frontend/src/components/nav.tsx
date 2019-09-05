import * as React from "react";
import { Container } from "./container";
import { Link } from "react-router-dom";

interface INavLink {
    title: string;
    to?: string;

    onClick?(): void;
}

interface INavProps {
    siteName: string;
    links?: INavLink[];
}

export const Nav: React.FC<INavProps> = ({ siteName, links }) => (
    <nav className="navigation">
        <Container>
            <Link className="navigation-title" to="/"><h1 className="title">{siteName}</h1></Link>
            {
                !!links && (
                    <div className="float-right">
                        <div className="navigation-links">
                            {
                                links.map(navLink => (
                                    <div key={navLink.title + navLink.to} className="navigation-link--wrapper">
                                        {
                                            navLink.to ?
                                                <Link className="navigation-link" to={navLink.to}><p>{navLink.title}</p></Link>
                                                :
                                                <a
                                                    className="navigation-link"
                                                    href="/"
                                                    onClick={(e) => { e.preventDefault(); navLink.onClick!!(); }}
                                                >
                                                    <p>{navLink.title}</p>
                                                </a>
                                        }
                                    </div>
                                ))}
                        </div>
                    </div>
                )
            }
        </Container>
    </nav>
);
