import './App.css';
import { Component } from 'react';
import { CardList } from './components/card-list/card-list.component';
import { SearchBox } from './components/search-box/search-box.component';

class App extends Component {

  constructor(props) {
    super(props);
    
    this.state = {
      monsters: [],
      searchField: '',
    };

    // * binding this to the function
    // this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(resp => resp.json())
      .then(users => this.setState({monsters: users}))
  } 

  // * in order to use this here we need to bind it in constructor
  // handleChange(e) {
  //   this.setState({ searchField: e.target.value });
  // }

  // * arrow functions let us define this from where it was defined, context being App component
  handleChange = (e) => {
    this.setState({ searchField: e.target.value });
  }


  render() {

    const { monsters, searchField } = this.state;
    // === destructure ===
    // const monsters = this.state.monsters;
    // const searchField = this.state.searchField;

    const filteredMonsters = monsters.filter(monster =>
      monster.name.toLowerCase().includes(searchField.toLowerCase())
    );

    return (
      <div className="App">
        <h1>Monsters Rolodex</h1>
        <SearchBox 
          placeholder="Search Monsters" 
          handleChange={ this.handleChange }
        />
        <CardList monsters={filteredMonsters} />
      </div>
    );
  }
}

export default App;
