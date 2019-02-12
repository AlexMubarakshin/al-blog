import * as React from "react";
import { Container } from "src/components/container";
import { Link } from "react-router-dom";

interface IAdminHomeProps {}

interface IAdminHomeState {}

export class AdminHome extends React.Component<IAdminHomeProps, IAdminHomeState> {

    render() {
        return (
            <Container>
                <h1>Admin panel</h1>

                <Link to="/admin/posts">Post panel</Link>
            </Container>
        );
    }
}