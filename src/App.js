import React, { Component } from "react";
import "./App.css";
import contacts from "./contacts.json";

class App extends Component {
  state = {
    contacts: contacts.slice(0, 5),
    sort: true
  };

  showcontacts = () => {
    // console.log(this.state.contacts)
    return this.state.contacts.map((eachContact, index) => {
      return (
        <tr key={index}>
          <td>
            <img
              src={eachContact.pictureUrl}
              style={{ height: "150px" }}
              alt={eachContact.name}
            />
          </td>
          <td>{eachContact.name}</td>
          <td>{eachContact.popularity}</td>
          <td>
            <button onClick={() => this.deleteContact(index)}>Delete</button>
          </td>
        </tr>
      );
    });
  };

  addActor = () => {
    // Select a random number between 0 and 1
    let randomNumber = Math.random();
    // get the length of the contacts array
    let lengthOfContacts = contacts.length;
    // get the random element from array
    let randomContact = Math.floor(randomNumber * lengthOfContacts);
    // create a copy of the contacts array from state
    let copyOfContactsFromState = [...this.state.contacts];
    copyOfContactsFromState.push(contacts[randomContact]);
    // set state with setState method(you should never set state directly)
    this.setState({
      contacts: copyOfContactsFromState
    });
  };

  sortContactsByName = () => {
    let contactsCopy = [...this.state.contacts];
    contactsCopy.sort((a, b) => {
      if (this.state.sort === true) {
        return a.name.localeCompare(b.name);
      } else {
        return b.name.localeCompare(a.name);
      }
    });

    this.setState({
      contacts: contactsCopy,
      // sort: this.state.sort === 'ascending' ? 'descending' : 'ascending'
      sort: !this.state.sort
    });
    console.log(this.state);
  };

  sortContactsByPopularity = () => {
    let contactsCopy = [...this.state.contacts];
    contactsCopy.sort((b, a) => a.popularity - b.popularity);
    this.setState({
      contacts: contactsCopy
    });
  };

  deleteContact = i => {
    let deletedContactArray = [...this.state.contacts];
    deletedContactArray.splice(i, 1);
    this.setState({
      contacts: deletedContactArray
    });
  };

  render() {
    console.log("Render App.js");
    console.log(this.state.contacts);
    return (
      <div className="App">
        <h1>IronContacts</h1>
        <div id="btn">
          <button id="add" onClick={() => this.addActor()}>
            Add Random Actor
          </button>
          <button id="sort" onClick={this.sortContactsByName}>
            Sort Actors By Name
          </button>
          <button id="popular" onClick={() => this.sortContactsByPopularity()}>
            Sort Actors By Popularity
          </button>
        </div>
        <table>
          <thead>
            <tr>
              <th>Picture</th>
              <th>Name</th>
              <th>Popularity</th>
            </tr>
          </thead>
          <tbody>{this.showcontacts()}</tbody>
        </table>
      </div>
    );
  }
}

export default App;
