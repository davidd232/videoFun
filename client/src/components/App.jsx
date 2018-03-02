import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { SketchPicker } from 'react-color';

class App extends Component {
  constructor() {
    super()
    this.state = {
      isDrawing: false,
      lastX: 0,
      lastY: 0,
      canvas: '',
      ctx: '',
      hue: '#000'
    }
  }
  componentDidMount() {
    const canvas = this.refs.myCanvas;
    const ctx = canvas.getContext('2d');
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    ctx.lineJoin = 'round';
    ctx.lineCap = 'round';
    ctx.lineWidth = 5;

    this.setState({
      canvas,
      ctx
    })
    var webrtc = new SimpleWebRTC({
      // the id/element dom element that will hold "our" video
      localVideoEl: 'localVideo',
      // immediately ask for camera access
      autoRequestMedia: true
    });
    webrtc.on('readyToCall', function () {
      webrtc.joinRoom('lickEm');
    });
  }
  mouseMove(e) {
    this.draw(e);
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
  }
  mouseDown(e) {

    this.setState({
      isDrawing: true,
      lastX: e.nativeEvent.offsetX,
      lastY: e.nativeEvent.offsetY,
    });
  }
  draw(e) {
    if (!this.state.isDrawing) {
      return;
    }
    this.state.ctx.beginPath();
    this.state.ctx.moveTo(this.state.lastX, this.state.lastY);
    this.state.ctx.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
    this.state.ctx.strokeStyle = this.state.hue;
    this.state.ctx.stroke();
    this.setState({
      lastX: e.nativeEvent.offsetX,
      lastY: e.nativeEvent.offsetY
    })
  }
  handleClick() {
    console.log(this.state);
    this.state.ctx.save();
    this.state.ctx.setTransform(1, 0, 0, 1, 0, 0);
    // Will always clear the right space
    this.state.ctx.clearRect(0, 0, this.state.canvas.width, this.state.canvas.height);
    this.state.ctx.restore()
  }
  handleChangeComplete(color) {
    this.setState({
      hue: color.hex
    });
  };
  render() {
    let style = {
      color: this.state.hue
    }
    return (
      <div className='row'>
        <div className='column1'>
          <button className='clearBtn' onClick={this.handleClick.bind(this)}>Clear Drawing</button>
          <button className='screenShot' >Take Picture</button>
          <SketchPicker
            color={this.state.hue}
            onChangeComplete={this.handleChangeComplete.bind(this)}
          />
          <h1 style={style}>Draw on your face, bozo!</h1>
        </div>
        <div className='column2'>
          <video className='video' id='localVideo'></video>
          <canvas
            className='canvas'
            onMouseMove={this.mouseMove.bind(this)}
            onMouseOut={this.mouseOut.bind(this)}
            onMouseDown={this.mouseDown.bind(this)}
            onMouseUp={this.mouseUp.bind(this)}
            ref="myCanvas"
            id="draw"
          >
          </canvas>
        </div>
      </div>
    );
  }
}

export default App;