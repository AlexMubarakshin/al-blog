import * as React from "react";
import { Dispatch } from "redux";
import { connect } from "react-redux";
import { Link, RouteComponentProps } from "react-router-dom";

import { Container } from "src/components/container";

import { IApplicationStore, IAuthStore } from "src/types/store";
import { register } from "src/store/auth/authActions";

const mapStateToProps = (state: IApplicationStore) => ({ 
    authStore: state.authStore
});

interface IRegisterProps extends RouteComponentProps<any> { 
    dispatch: Dispatch<any>;

    authStore: IAuthStore;
}

interface IRegisterState {}

@(connect as any)(mapStateToProps)
export class Register extends React.Component<IRegisterProps, IRegisterState> {
    private nameInputRef: HTMLInputElement;
    private emailInputRef: HTMLInputElement;
    private passwordInputRef: HTMLInputElement;
    
    private onRegisterClick = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        e.stopPropagation();
        console.log(e);

        const tempName = this.nameInputRef.value;
        const tempLogin =this.emailInputRef.value;
        const tempPass = this.passwordInputRef.value;
        this.props.dispatch(register(tempName, tempLogin, tempPass, this.onRegisterSuccess));
    }

    private onRegisterSuccess = () => {
        this.props.history.push("/auth/login");
    }

    render() {
        const errMessage = this.props.authStore.registerError && this.props.authStore.registerError[0].messages[0];
        return (
            <Container>
                <form onSubmit={this.onRegisterClick}>
                    <fieldset>
                        <h1>Register</h1>

                        <label htmlFor="auth-name">Name</label>
                        <input ref={ref => this.nameInputRef = ref!!} placeholder="Name" id="auth-name" type="text" autoComplete="off"></input>

                        <label htmlFor="auth-email">Email</label>
                        <input ref={ref => this.emailInputRef = ref!!} placeholder="Email" id="auth-email" type="email" autoComplete="off"></input>

                        <label htmlFor="auth-password">Password</label>
                        <input ref={ref => this.passwordInputRef = ref!!} placeholder="Password" id="auth-password" type="password" autoComplete="off"></input>
                        
                        <p>{errMessage || ""}</p>

                        <div>
                            <div className="float-left">
                                <p>Already have account? <Link to="/auth/login">Sign in</Link></p>
                            </div>
                            <div className="float-right">
                                <button type="submit">Register</button>
                            </div>
                        </div>
                        
                    </fieldset>
                </form>
            </Container>
        );
    }
}