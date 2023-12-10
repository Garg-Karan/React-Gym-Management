import React, { Component , useRef} from 'react'
import {IdleTimerProvider} from 'react-idle-timer'

 class IdleTimerComponent extends Component {
  constructor(props){
    super(props)
  }
  onIdle=()=>{
    console.log("Hello")
  }
  render() {
    return (
      <div>
        <IdleTimerProvider timeout = {5*1000} onIdle={this.onIdle}></IdleTimerProvider>
      </div>
    )
  }
}

export default IdleTimerComponent
