import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { fetchPost, deletePost } from '../actions';

class PostsShow extends Component {
  constructor(props) {
    super(props);
    this.onClickDelete = this.onClickDelete.bind(this);
  }

  static propTypes = {
    fetchPost: PropTypes.func,
    match: PropTypes.obj,
    post: PropTypes.obj,
    deletePost: PropTypes.func,
    history: PropTypes.func
  }

  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.fetchPost(id);
  }

  onClickDelete() {
    const { id } = this.props.match.params;
    this.props.deletePost(id, () => {
    this.props.history.push('/');
    });
  }

  render() {
    const { post } = this.props;

    if (!post) {
      return <div>Loading</div>;
    }

    return (
      <div>
        <Link to="/">Back To Index</Link>
        <button
          className="btn btn-danger pull-xs-right"
          onClick={this.onClickDelete}
        >
          DeletPost
        </button>
        <h3>{post.title}</h3>
        <h6>Catagories: {post.catagories}</h6>
        <p>{post.content}</p>
      </div>
    );
  }
}
// Big Posts
function mapStateToProps({ posts }, ownProps) {
  return { post: posts[ownProps.match.params.id] };
}
export default connect(mapStateToProps, { fetchPost, deletePost })(PostsShow);
