import * as React from "react";

import axios from "axios";

import { IPost } from "src/types/model";
import { Card } from "src/components/card";

import * as ReactMarkdown from "react-markdown";
import { RouteComponentProps } from "react-router-dom";
import { ROOT_API_URL } from "src/utils/constants";
import { Container } from "src/components/container";

interface IPostProps extends RouteComponentProps<any> { }

interface IPostState {
    post?: IPost;
}


export class Post extends React.PureComponent<IPostProps, IPostState> {

    state: IPostState = {
        post: undefined
    };

    async componentDidMount() {
        const postID = this.props.match.params.id;

        try {
            const response = await axios({
                method: "GET",
                url: `${ROOT_API_URL}/post/${postID}`,
                params: {
                    id: postID
                }
            });

            if (response.data) {
                this.setState({
                    post: response.data
                });
                return;
            }
        } catch (err) {
            console.error(err);
        }
    }


    render() {
        return (
            <Container>
                <Card>
                    {
                        !this.state.post && (
                            <h2>Loading...</h2>
                        )
                    }
                    {
                        this.state.post && (
                            <>
                                <div className="row">
                                    <div className="column column-70">
                                        <h2>{this.state.post.title}</h2>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="column">
                                        <ReactMarkdown source={this.state.post.content} />
                                    </div>
                                </div>
                            </>
                        )
                    }
                </Card>
            </Container>
        );
    }
}