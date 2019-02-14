import * as React from "react";
import { Dispatch } from "redux";
import { connect } from "react-redux";

import { Container } from "src/components/container";

import { getUsersList } from "src/store/admin/users/usersActions";

import { IApplicationStore, IAdminUserStore } from "src/types/store";

const mapStateToProps = (state: IApplicationStore) => ({
    usersStore: state.adminStore.usersStore
});

interface IAdminUsersProps {
    dispatch: Dispatch<any>;
    usersStore: IAdminUserStore;
}

interface IAdminUsersState { }

@(connect as any)(mapStateToProps)
export class AdminUsers extends React.Component<IAdminUsersProps, IAdminUsersState> {

    componentDidMount() {
        this.props.dispatch(getUsersList());
    }

    render() {
        return (
            <Container>
                <h1>User control</h1>
                <table>
                    <thead>
                        <tr>
                            <th>User ID</th>
                            <th>Role</th>
                            <th>Name</th>
                            <th>Email</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.props.usersStore.users.map((user) => (
                                <tr key={user._id}>
                                    <td>{user._id}</td>
                                    <td>{user.role}</td>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </Container>
        );
    }
}