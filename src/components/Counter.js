import React, {Component} from 'react'

class Counter extends Component {
  constructor(props){
    super(props)
    this.state ={
      value: null
    }
  }

  async componentDidMount(){
    const counter = this.props.contract;
    const initialValue = await counter.methods.value().call();
    this.setState({ value: initialValue })
  }

  increaseCounter(){
    const counter = this.props.contract;
    return counter.methods.increase().send();
  }

  render(){
    const { value } = this.state;
    console.log(value)
    if(!value) return "Loading";
    
    return(
      <div>
        <div>Counter value: {value.toString()}</div>
        <buton onClick={() => this.increaseCounter()}>
          Increase
        </buton>
      </div>
    )
  }
}

export default Counter