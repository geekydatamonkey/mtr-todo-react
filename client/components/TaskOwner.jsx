TaskOwner = React.createClass({

  propTypes: {
    task: React.PropTypes.object.isRequired,
  },

  render() {
    return (
      <span className="task-owner">
        { this.props.task.username }
      </span>
    );
  },
});
