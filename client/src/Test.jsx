import React, {Component} from "react";
import axios from 'axios';
class Test extends Component {
  state = {
    contacts: []
  }
  componentDidMount(){
    
    axios.get('https://jsonplaceholder.typicode.com/users')
    .then(response => this.setState({
      contacts: response.data
    }) );
  };
 
  render(){ 
    console.log(this.state.contacts);
    return <div>test</div>
  }
  
}

export default Test;
