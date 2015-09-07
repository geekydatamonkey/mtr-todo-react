// wrap AccountUI Blaze component

AccountsUI = React.createClass({
  componentDidMount() {
    // Use Meteor Blaze to render login buttons
    this.view = Blaze.render(
      Template.loginButtons,
      React.findDOMNode(this.refs.container)
    );
  },

  componentWillUnmount() {
    // clean up Blaze
    Blaze.remove(this.view);
  },

  render() {
    return (
      <span ref="container"/>
    );
  },
});
