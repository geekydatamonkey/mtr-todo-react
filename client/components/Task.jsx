/* global TaskOwner:true */

Task = React.createClass({

  propTypes: {
    task: React.PropTypes.object.isRequired,
    loggedIn: React.PropTypes.bool,
  },

  deleteThisTask() {
    Meteor.call('removeTask', this.props.task._id);
  },

  toggleChecked() {
    // this.props.onToggleChecked(this.props.task);
    Meteor.call('setChecked',
      this.props.task._id,
      !this.props.task.checked
    );
  },

  togglePrivate() {
    Meteor.call('setPrivate',
      this.props.task._id,
      !this.props.task.private
    );
  },

  getClassName() {
    return this.props.task.checked ? 'checked' : '';
  },

  renderCheckbox() {
    // only show if logged in
    if (!this.props.loggedIn) {
      return '';
    }

    return (
      <input
        type="checkbox"
        readOnly={true}
        checked={this.props.task.checked}
        onChange={this.toggleChecked}
      />
    );
  },

  renderDeleteButton() {
    if (!this.props.loggedIn) {
      return '';
    }

    return (
      <button className="delete" onClick={this.deleteThisTask}>
        &times;
      </button>
    );
  },

  renderPrivateButton() {
    if (!this.props.loggedIn) {
      return '';
    }

    const buttonText = this.props.task.private ? 'Private' : 'Public';

    return (
      <button className="toggle-private" onClick={this.togglePrivate} >
        {buttonText}
      </button>
    );
  },

  render() {
    return (
      <li className={ this.getClassName() }>
        { this.renderDeleteButton() }
        { this.renderCheckbox() }
        { this.renderPrivateButton() }
        <span className="text">
          <TaskOwner task={this.props.task} />
          { this.props.task.text }
        </span>
      </li>
    );
  },

});
