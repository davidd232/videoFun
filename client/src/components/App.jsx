import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class App extends Component {
  constructor() {
    super()
    this.state = {
      isDrawing: false,
      lastX: 0,
      lastY: 0, 
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
  }
  mouseMove() {
    console.log('mouse moving');
  }
  mouseOut() {
    console.log('mouse out');
    // this.setState({
    //   isDrawing: false
    // })
  }
  mouseUp() {
    console.log('mouse up');
    // this.setState({
    //   isDrawing: false
    // })
  }
  mouseDown(e) {
    console.log('mouse down');
    // this.setState({
    //   isDrawing: true,
    //   lastX: e.offsetX,
    //   lastY: e.offsetY
    // })
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
          width={800} height={800}
        >
        </canvas>
      </div>
    );
  }
}

export default App;