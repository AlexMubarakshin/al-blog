import * as React from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";

import { Container } from "src/components/container";

import { IApplicationStore, ISiteConfigStore } from "src/types/store";
import { getSiteInfo, updateSiteInfo } from "src/store/site/siteActions";
import { ISiteConfig } from "src/types/model";

const mapStateToProps = (state: IApplicationStore) => ({
    siteStore: state.siteStore
});

interface IAdminSiteProps {
    siteStore: ISiteConfigStore;
    dispatch: Dispatch<any>;
}

interface IAdminSiteState extends ISiteConfig { }

@(connect as any)(mapStateToProps)
export class AdminSite extends React.Component<IAdminSiteProps, IAdminSiteState> {

    constructor(props: IAdminSiteProps) {
        super(props);
        const { siteStore } = props;

        this.state = {
            siteName: siteStore.siteName || "",
            siteDescription: siteStore.siteDescription || "",
            ownerName: siteStore.ownerName || "",
            ownerSiteURL: siteStore.ownerSiteURL || "",
        };
    }

    async componentDidMount() {
        this.props.dispatch(getSiteInfo());
    }

    componentDidUpdate(prevProps: IAdminSiteProps) {
        const { siteStore } = this.props;
        if (
            prevProps.siteStore.ownerName !== siteStore.ownerName ||
            prevProps.siteStore.ownerSiteURL !== siteStore.ownerSiteURL ||
            prevProps.siteStore.siteDescription !== siteStore.siteDescription ||
            prevProps.siteStore.siteName !== siteStore.siteName
        ) {
            this.setState({
                ownerName: siteStore.ownerName,
                ownerSiteURL: siteStore.ownerSiteURL,
                siteDescription: siteStore.siteDescription,
                siteName: siteStore.siteName,
            });
        }
    }

    private onFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        e.stopPropagation();

        this.props.dispatch(updateSiteInfo(this.state, this.onFormSubmited));
    }

    private onFormSubmited = (err: Error, data: ISiteConfig) => {
        if (err) {
            return console.error(err);
        }
    }

    render() {
        const errMessage = this.props.siteStore.infoError && this.props.siteStore.infoError.message;
        return (
            <Container>
                <form onSubmit={this.onFormSubmit}>
                    <fieldset>
                        <h1>Site configuration</h1>

                        <label htmlFor="site-name">Site name</label>
                        <input
                            value={this.state.siteName}
                            onChange={e => this.setState({ siteName: e.target.value })}
                            placeholder="Site name"
                            id="site-name"
                            type="text"
                            autoComplete="off">
                        </input>

                        <label htmlFor="site-description">Site description</label>
                        <input
                            value={this.state.siteDescription}
                            onChange={e => this.setState({ siteDescription: e.target.value })}
                            placeholder="Site description"
                            id="site-description"
                            type="text"
                            autoComplete="off">
                        </input>

                        <label htmlFor="owner-name">Owner name</label>
                        <input
                            value={this.state.ownerName}
                            onChange={e => this.setState({ ownerName: e.target.value })}
                            placeholder="Owner name"
                            id="owner-name"
                            type="text"
                            autoComplete="off">
                        </input>

                        <label htmlFor="owner-site-url">Owner site url</label>
                        <input
                            value={this.state.ownerSiteURL}
                            onChange={e => this.setState({ ownerSiteURL: e.target.value })}
                            placeholder="Owner site url"
                            id="owner-site-url"
                            type="text"
                            autoComplete="off">
                        </input>

                        <p>{errMessage || ""}</p>

                        <button className="float-right" type="submit">DONE</button>
                    </fieldset>
                </form>
            </Container>
        );
    }
}