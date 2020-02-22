import React, { Component } from 'react'
import Header from '../components/Header';
import Meta from '../components/Meta';
import styled from '/styled'

const MyButton = styled.button`
    background: red;
    font-size: 40px;
`;

export default class Page extends Component {
    render() {
        return (
            <div>
                <Meta />
                <Header />
                <MyButton>Clicky</MyButton>
                {this.props.children}
            </div>
        )
    }
}
