import React, {Component} from 'react';
import axios from 'axios';

class App extends Component{
    componentWillMount(){
        axios.get('/api/users')
        .then(response =>{
            console.log(response.data)
        })

        axios.get('/api/voits')
        .then(response=>{
            console.log(response.data)
        })
    }
    render(){
        return (
            <div>
                test de app
            </div>
        );
    }
};
export default App;