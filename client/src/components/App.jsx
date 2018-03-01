import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class App extends Component {
  constructor() {
    super()
    this.state = {
      isDrawing: false,
      lastX: 0,
      lastY: 0,
      canvas: '',
      ctx: '',
      hue: `hsl(85%, 100%, 50%)`
    }
  }
  componentDidMount() {
    const canvas = this.refs.myCanvas;
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    ctx.strokeStyle = '#0af';
    ctx.lineJoin = 'round';
    ctx.lineCap = 'round';
    ctx.lineWidth = 5;

    this.setState({
      canvas,
      ctx
    })
  }
  mouseMove(e) {
    this.draw(e);
    console.log('mouse move');
  }
  mouseOut() {
    console.log('mouse out');
    this.setState({
      isDrawing: false
    })
  }
  mouseUp() {
    this.setState({
      isDrawing: false
    })
    console.log('mouse up');
  }
  mouseDown(e) {

    this.setState({
      isDrawing: true,
      lastX: e.nativeEvent.offsetX,
      lastY: e.nativeEvent.offsetY,
    });
    console.log('mouse down');
  }
  draw(e) {
    if (!this.state.isDrawing) {
      return;
    }
    this.state.ctx.beginPath();
    this.state.ctx.moveTo(this.state.lastX, this.state.lastY);
    this.state.ctx.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
    this.state.ctx.strokeStyle = '#000';
    this.state.ctx.stroke();
    this.setState({
      lastX: e.nativeEvent.offsetX,
      lastY: e.nativeEvent.offsetY
    })
  }

  render() {
    return (
      <div>
        {/* <video></video> */}
        <canvas
          onMouseMove={this.mouseMove.bind(this)}
          onMouseOut={this.mouseOut.bind(this)}
          onMouseDown={this.mouseDown.bind(this)}
          onMouseUp={this.mouseUp.bind(this)}
          ref="myCanvas"
          id="draw"
        >
        </canvas>
      </div>
    );
  }
}

export default App;