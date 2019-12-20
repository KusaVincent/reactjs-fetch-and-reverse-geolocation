import React, { Component } from "react";

class Fetch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: [],
      isLoaded: false
    };
  }

  componentDidMount() {
    fetch("https://jsonplaceholder.typicode.com/Users") //dummy data api
      .then(response => response.json())
      .then(json => {
        this.setState({
          isLoaded: true,
          value: json
        });
      });
  }

  render() {
    let { isLoaded, value } = this.state;

    if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <div>
          <ul>
            {" "}
            {value.map(item => (
              <li key={item.id}>username: {item.username}</li>
            ))}
            
          </ul>
        </div>
      );
    }
  }
}
export default Fetch;
