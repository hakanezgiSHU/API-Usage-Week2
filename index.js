import React, { Component } from 'react';
import { render } from 'react-dom';
import './style.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      name: 'React',
      isSubmitted: false,
      age: -1,
      gender: "",
      nation: ""
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    
  }

  handleChange(event) {
    this.setState({name: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();

    const query_name = this.state.name;
    var test_var = -1;

    function getAge(qn) {
      return fetch("https://api.agify.io/?name=" + qn)
        .then((response) => response.json())
    }

    function getGender(qn) {
      return fetch("https://api.genderize.io/?name=" + qn)
        .then((response) => response.json())
    }

    function getNation(qn) {
      return fetch("https://api.nationalize.io/?name=" + qn)
        .then((response) => response.json())
    }
    //this.setState({age: data.age, isSubmitted: true}

    Promise.all([getAge(query_name), getGender(query_name), getNation(query_name)])
      .then(([ageResponse, genderResponse, nationResponse]) => {this.setState({age: ageResponse.age, gender: genderResponse.gender, nation: nationResponse.country[0].country_id, isSubmitted: true});});

  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
      <div>
        Enter in a your name:
        <input type="text"  onChange={this.handleChange} />
        <button type="submit"> Submit </button>
        <br />
        {
          this.state.isSubmitted ? "Hello " + this.state.name + ". I think you are " + this.state.gender + " and " + this.state.age + " years old, from " + this.state.nation +"." : ""
        }
      </div>
      </form>
    );
  }
}

render(<App />, document.getElementById('root'));
