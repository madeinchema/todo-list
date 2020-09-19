import React from 'react';

export default class Hover extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      hovering: false,
    }

    this.mouseOver = this.mouseOver.bind(this);
    this.mouseLeave = this.mouseLeave.bind(this);
  }
  mouseOver() {
    this.setState({ hovering: true })
  }
  mouseLeave() {
    this.setState({ hovering: false })
  }
  render() {
    return (
      <div
        onMouseOver={this.mouseOver}
        onMouseLeave={this.mouseLeave}
      >
        {this.props.children(this.state.hovering)}
      </div>
    )
  }
}
