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

interface INavState { }

export class Nav extends React.Component<INavProps, INavState> {

    render() {
        return (
            <nav className="navigation">
                <Container>
                    <Link className="navigation-title" to="/"><h1 className="title">{this.props.siteName}</h1></Link>
                    {
                        !!this.props.links && (
                            <div className="float-right">
                                <div className="navigation-links">
                                    {this.props.links.map(navLink => (
                                        <div key={navLink.title + navLink.to} className="navigation-link--wrapper">
                                            {
                                                navLink.to ?
                                                    <Link className="navigation-link" to={navLink.to}><p>{navLink.title}</p></Link>
                                                    :
                                                    <a className="navigation-link" href="/" onClick={(e) => { e.preventDefault(); navLink.onClick!!(); }}><p>{navLink.title}</p></a>
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
    }
}