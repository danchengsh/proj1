import React, { Component } from 'react';
import { CardList } from './components/card-list/card-list.component';
import { SearchBox } from './components/search-box/search-box.component';
// import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      monsters: [
      ],
      searchField: ''
    };

    // this.handleChange = this.handleChange.bind(this); //.bind is a method on any function that returns a NEW FUNCTION where the context of "this" is set to whatever we passed to it. in our case, the context of "this" in handleChange() is the "this" keyword that is now defined inside our constructor, which knows that the context is our App class.
    //^if we dont use arrow function => {} for handleChange, then we need to BIND. 
  } 

  componentDidMount() {
    //fetch() is Javascript's native method. used to fetch data frm the url specified, make an API request to the url
    fetch('https://jsonplaceholder.typicode.com/users').then(response => response.json()).then(users => this.setState({monsters: users}));  
    //we need to do response.json() cos the response's body might nt be in JSON format or a format that our JS understands, so we 
    //invoke .json() that converts the response object into JSON format.
  }

  // handleChange(event) {
  //   this.setState({ searchField: event.target.value },         //becos handleChange() is being done without => {}, we need to bind it in the constructor
  //     () => console.log(this.state));
  // }

  handleChange = (event) => {
    this.setState({ searchField: event.target.value },        //now handleChange is being declared with arrow => {}, so we dont need to bind it to "this" in the constructor
      () => console.log(this.state));
  }

  render() {
    const { monsters, searchField } = this.state;   /*this is called destructuring. essentially, we're doing const monsters = this.state.monsters; const searchField = this.state.searchField;*/
    const filteredMonsters = monsters.filter(monster => 
      monster.name.toLowerCase().includes(searchField.toLowerCase())
    )
 
    return (
      <div className="App">
        <h1> Monsters Rolodex </h1>
        <SearchBox placeholder="search monster" handleChange={ this.handleChange }></SearchBox>{/*.target returns the HTML element that fired the onChange attribute's function, ergo .target.value just returns the string inside the search box*/}
        
        <CardList monsters={filteredMonsters}></CardList> {/* we're now passing in "monsters" as a prop from our App.state into the CardList 
                                                  Component since we want it to handle creating and organising Card elements. */}
        {/* we need a unqiue key cos React needs to know what element it needs to update if ONLY ONE OF THOSE ELEMENTS in the 
        monsters array changes value. Helps cos then React knows which element changes n just changes n re-renders it n doesnt have 
        to re-render every other element, which saves runtime n improves perf esp if the list is HUGE.*/}
      </div>
    )
  };
}

export default App;
