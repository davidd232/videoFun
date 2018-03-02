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
      hue: '#095'
    }
  }
  componentDidMount() {
    const canvas = this.refs.myCanvas;
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    // ctx.strokeStyle = '#0af';
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
      // you can name it anything
      webrtc.joinRoom('your awesome room name');
    });
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
    return (
      <div >
        <div>
          <button className='clearBtn' onClick={this.handleClick.bind(this)}>Clear Drawing</button>
          <SketchPicker 
            color={this.state.hue}
            onChangeComplete={this.handleChangeComplete.bind(this)}
          />
        </div>
        <div className='container'>
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