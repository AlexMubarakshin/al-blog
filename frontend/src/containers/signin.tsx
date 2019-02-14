import * as React from "react";
import { Dispatch } from "redux";
import { connect } from "react-redux";
import { Link, RouteComponentProps } from "react-router-dom";

import { Container } from "src/components/container";

import { IApplicationStore, IAuthStore } from "src/types/store";

import { signIn } from "src/store/auth/authActions";

const mapStateToProps = (state: IApplicationStore) => ({
    authStore: state.authStore
});

interface ISignInProps extends RouteComponentProps<any> {
    dispatch: Dispatch<any>;

    authStore: IAuthStore;
}

interface ISignInState { }

@(connect as any)(mapStateToProps)
export class SignIn extends React.Component<ISignInProps, ISignInState> {

    private emailInputRef: HTMLInputElement;
    private passwordInputRef: HTMLInputElement;

    private onSignIn = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        e.stopPropagation();

        const email = this.emailInputRef.value;
        const password = this.passwordInputRef.value;
        this.props.dispatch(signIn(email, password, this.onSignInSuccess));
    }
    
    private onSignInSuccess = () => {
        this.props.history.push("/");
    }

    render() {
        const errMessage = this.props.authStore.authError && this.props.authStore.authError.message;

        return (
            <Container>
                <form onSubmit={this.onSignIn}>
                    <fieldset>
                        <h1>Sign in</h1>

                        <label htmlFor="auth-email">Email</label>
                        <input ref={ref => this.emailInputRef = ref!!}placeholder="Email" id="auth-email" type="email" autoComplete="off"></input>

                        <label htmlFor="auth-password">Password</label>
                        <input ref={ref => this.passwordInputRef = ref!!}placeholder="Password" id="auth-password" type="password" autoComplete="off"></input>
                        
                        <p>{errMessage || ""}</p>

                        <div>
                            <div className="float-left">
                                <p>No account? <Link to="/auth/register">Create one</Link></p>
                            </div>
                            <div className="float-right">
                                <button type="submit">Sign IN</button>
                            </div>
                        </div>

                    </fieldset>
                </form>
            </Container>
        );
    }
}