import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Timestamp from "react-timestamp";
import {
  fetchPosts,
  fetchCategories,
  fetchComments,
  fetchDeletePost
  //fetchAddPost
} from "../actions";
import { List, Header, Grid, Button, Segment, Icon } from "semantic-ui-react";

class HomePage extends Component {
  componentDidMount() {
    this.props.getData();
    this.props.fetchPost();
  }

  deletePost = postId => {
    this.props.deletePost(postId);
  };

  editPost = e => {
    console.log("The user clicked  edit button");
  };

  addPost = e => {
    console.log("The user clicked  add button");
    //this.props.addedPost();
  };

  render() {
    return (
      <div className="header-section">
        <div>
          <div>
            <Header textAlign="center" color="teal" as="h1">
              Git Talks
            </Header>
          </div>
          <div className="categories">
            <Grid columns={4}>
              {this.props.categories.length > 0 &&
                this.props.categories.map(category => (
                  <Grid.Column key={category.path}>
                    <Link to={`/${category.name}`}>
                      <Button size="tiny" compact basic color="teal">
                        {category.name}
                      </Button>
                    </Link>
                  </Grid.Column>
                ))}
            </Grid>
          </div>
        </div>

        {this.props.posts.length > 0 &&
          this.props.posts.filter(post => !post.deleted).map(post => (
            <List key={post.id} divided relaxed>
              <Segment color="teal" raised>
                <List.Item>
                  <List.Content>
                    <Link to={`/posts/${post.id}`}>
                      <List.Header>{post.title}</List.Header>
                    </Link>
                    <List.Content className="author">
                      <Icon name="user" color="teal" size="large" />
                      {post.author}
                    </List.Content>
                    <List.Content className="time">
                      <Icon name="clock" color="teal" size="large" />
                      <Timestamp time={post.timestamp / 1000} format="full" />
                    </List.Content>
                    <List.Content className="votes">
                      votes: {post.voteScore}
                    </List.Content>
                    <List.Content className="comments" key={post.Id}>
                      <Icon name="comment outline" color="teal" size="large" />
                      comments: ({this.props.comments &&
                        this.props.comments.length})
                    </List.Content>
                  </List.Content>
                </List.Item>

                <Button
                  onClick={() => this.deletePost(post.id)}
                  compact
                  basic
                  color="red"
                  size="tiny"
                  floated="right"
                >
                  <Icon name="trash" />
                  delete post
                </Button>

                <Link to="/editpost">
                  <Button
                    onClick={this.editPost}
                    compact
                    basic
                    color="teal"
                    size="tiny"
                    floated="right"
                  >
                    <Icon name="edit" />
                    Edit post
                  </Button>
                </Link>
              </Segment>
            </List>
          ))}
        <div className="btn-add">
          <Link to="/addpost">
            <Button onClick={this.addPost} compact color="teal" size="large">
              <Icon name="plus circle" />
              Add Post
            </Button>
          </Link>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    posts: state.receivePosts,
    categories: state.receiveCategories,
    comments: state.comments
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getData: () =>
      dispatch(fetchPosts()).then(() => dispatch(fetchCategories())),
    fetchPost: postId => dispatch(fetchComments(postId)),
    deletePost: postId => dispatch(fetchDeletePost(postId))
    //addedPost: posts => dispatch(fetchAddPost(posts))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
