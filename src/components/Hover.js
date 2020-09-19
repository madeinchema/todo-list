import React from 'react';

export default class Hover extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      hovering: true,
    }

    this.mouseEnter = this.mouseEnter.bind(this);
    this.mouseLeave = this.mouseLeave.bind(this);
  }
  mouseEnter() {
    this.setState({ hovering: true })
  }
  mouseLeave() {
    this.setState({ hovering: true })
  }
  render() {
    return (
      <div
        onMouseEnter={this.mouseEnter}
        onMouseLeave={this.mouseLeave}
      >
        {this.props.children(this.state.hovering)}
      </div>
    )
  }
}