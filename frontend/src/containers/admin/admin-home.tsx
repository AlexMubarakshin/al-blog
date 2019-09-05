import * as React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { Dispatch } from "redux";

import { Container } from "src/components/container";

import { getUsersList } from "src/store/admin/users/usersActions";
import { getPosts } from "src/store/post/postActions";

interface IAdminHomeProps {
    dispatch: Dispatch<any>;
}

interface IAdminHomeState { }

@(connect as any)()
export class AdminHome extends React.Component<IAdminHomeProps, IAdminHomeState> {

    componentDidMount() {
        this.props.dispatch(getUsersList());
        this.props.dispatch(getPosts());
    }

    render() {
        return (
            <Container>
                <h1>Admin panel</h1>
                <ul>
                    <li>
                        <Link to="/admin/posts">Posts panel</Link>
                    </li>
                    <li>
                        <Link to="/admin/users">Users panel</Link>
                    </li>
                    <li>
                        <Link to="/admin/site">Site info</Link>
                    </li>
                </ul>
            </Container>
        );
    }
}