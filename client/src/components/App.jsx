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
      hue: '#000',
      webrtc: null,
      bc: null,
      disco: false
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
    ctx.lineWidth = 20;

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
    this.setState({
      webrtc
    })
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
  pause() {
    this.state.webrtc.pauseVideo();
  }
  play() {
    this.state.webrtc.resumeVideo();
  }
  handleChangeComplete(color) {
    this.setState({
      hue: color.hex
    });
  };
  // discoPlay() {
  //   console.log('heyo');
  //   let r = 80;
  //   let g = 125;
  //   let b = 255;
  //   if (this.state.disco === false) {
  //     this.setState({
  //       disco: true
  //     })
  //   } else {
  //     this.setState({
  //       disco: false
  //     })
  //   }
  //   let inter;
  //   if (this.state.disco === true) {
  //     inter = () => {
  //       setInterval(() => {
  //         if (r < 0 || r > 255) {
  //           r = 0;
  //         }
  //         if (g < 0 || g > 255) {
  //           g = 0;
  //         }
  //         if (b < 0 || b > 255) {
  //           b = 0;
  //         }
  //         r += 10;
  //         g -= 30;
  //         b += 50;
  //         this.setState({
  //           bg: `rgba(${r},${g},${b},0.5)`
  //         })
  //       }, 100);
  //     }
  //     inter();
  //   } else {
  //     let stop = (() => {
  //       console.log('ugh');
  //       clearInterval(inter);
  //     })()
  //     this.setState({
  //       bg: ''
  //     })
  //   }
  //   console.log(this.state.disco);
  // }
  render() {
    let style = {
      color: this.state.hue
    }
    let bg = {
      backgroundColor: this.state.bg
    }
    return (
      <div className='row'>
        <div className='column1'>
          <button className='clearBtn' onClick={this.handleClick.bind(this)}>Clear Drawing</button>
          <button className='screenShot' onClick={this.pause.bind(this)}>Stop Video</button>
          <button className='screenShot' onClick={this.play.bind(this)}>Resume Video</button>
          {/* <button className='disco' onClick={this.discoPlay.bind(this)}>Disco Time!</button> */}
          <SketchPicker
            color={this.state.hue}
            onChangeComplete={this.handleChangeComplete.bind(this)}
          />
          <h1 style={style}>Draw on your face, bozo!</h1>
        </div>
        <div className='column2'>
          <video className='video' id='localVideo'></video>
          <canvas
            style={bg}
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