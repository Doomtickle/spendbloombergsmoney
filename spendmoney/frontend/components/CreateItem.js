import React, { Component } from "react";
import Router from 'next/router';
import styled from 'styled-components';
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import Form from "./styles/Form";
import ErrorMessage from './ErrorMessage';

const Image = styled.div`
    padding: 2rem;
  img {
    max-width: 200px;
    box-shadow: ${props => props.theme.bs};
    height: auto;
    object-fit: contain;
  }
`;
const CREATE_ITEM_MUTATION = gql`
  mutation CREATE_ITEM_MUTATION(
    $title: String!
    $description: String!
    $image: String
    $largeImage: String
    $price: Int!
  ) {
    createItem(
      title: $title
      description: $description
      image: $image
      largeImage: $largeImage
      price: $price
    ) {
      id
    }
  }
`;

class CreateItem extends Component {
  state = {
    title: "",
    description: "",
    image: "",
    largeImage: "",
    price: 0
  };
  handleChange = e => {
    const { name, type, value } = e.target;
    const val = type == "number" ? parseFloat(value) : value;
    this.setState({ [name]: val });
  };
  uploadFiles = async e => {
    const files = e.target.files;
    const data = new FormData();
    data.append('file', files[0]);
    data.append('upload_preset', 'spendmoney');
    const res = await fetch('https://api.cloudinary.com/v1_1/du5extqte/image/upload', {
      method: 'POST',
      body: data
    });
    const file = await res.json();
    console.log(file);
    this.setState({
      image: file.secure_url,
      largeImage: file.eager[0].secure_url,
    });
  };
  render() {
    return (
      <Mutation mutation={CREATE_ITEM_MUTATION} variables={this.state}>
        {(createItem, { loading, error }) => (
          <Form
            onSubmit={async e => {
              e.preventDefault();
              const res = await createItem();
              Router.push({
                pathname: '/item',
                query: { id: res.data.createItem.id }
              })
            }}
          >
            <h2>Sell an item</h2>
            <ErrorMessage error={error} />
            <fieldset disabled={loading} aria-busy={loading}>
              <label htmlFor="file">
                Image
                <input
                  type="file"
                  name="file"
                  id="file"
                  placeholder="Upload a file..."
                  onChange={this.uploadFiles}
                  required
                />
                {this.state.image && (
                    <Image>
                        <img src={this.state.image} />
                    </Image>
                )}
              </label>
              <label htmlFor="title">
                Title
                <input
                  type="text"
                  name="title"
                  id="title"
                  placeholder="Title"
                  value={this.state.title}
                  onChange={this.handleChange}
                  required
                />
              </label>
              <label htmlFor="price">
                Price
                <input
                  type="number"
                  name="price"
                  id="price"
                  placeholder="price"
                  value={this.state.price}
                  onChange={this.handleChange}
                  required
                />
              </label>
              <label htmlFor="description">
                Description
                <textarea
                  name="description"
                  id="description"
                  placeholder="description"
                  value={this.state.description}
                  onChange={this.handleChange}
                  required
                />
              </label>
              <button type="submit">Submit</button>
            </fieldset>
          </Form>
        )}
      </Mutation>
    );
  }
}

export default CreateItem;
export { CREATE_ITEM_MUTATION };
