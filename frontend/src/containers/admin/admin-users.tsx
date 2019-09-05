import * as React from "react";
import { Dispatch } from "redux";
import { connect } from "react-redux";

import { Container } from "src/components/container";

import { getUsersList, deleteUser } from "src/store/admin/users/usersActions";

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

    private onUserDelete = (e: React.MouseEvent<HTMLButtonElement>, userID: string) => {
        e.stopPropagation();
        e.preventDefault();

        this.props.dispatch(deleteUser(userID));
    }

    render() {
        const { users } = this.props.usersStore;
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
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users.map((user) => {
                                const onRemoveClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => this.onUserDelete(e, user._id);

                                return (
                                    <tr key={user._id}>
                                        <td>{user._id}</td>
                                        <td>{user.role}</td>
                                        <td>{user.name}</td>
                                        <td>{user.email}</td>
                                        <td>
                                            <div className="row">
                                                <div className="column column-40">
                                                    <button onClick={onRemoveClick}>Remove</button>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })
                        }
                    </tbody>
                </table>
            </Container>
        );
    }
}