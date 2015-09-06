HideCompleted = React.createClass({

  propTypes: {
    hideCompleted: React.PropTypes.bool.isRequired,
    onToggle: React.PropTypes.func.isRequired,
  },

  toggleHideCompleted() {
    this.props.onToggle();
  },

  render() {
    return (
      <label className="hide-completed" forName="hide-completed">
        <input
          name="hide-completed"
          type="checkbox"
          checked={this.props.hideCompleted}
          onChange={this.toggleHideCompleted}
        /> Hide Completed Tasks
      </label>
    );
  },

});
