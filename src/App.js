import React, { Component } from 'react';
import {Route} from 'react-router-dom';
import './App.css';
import BookCatalogue from './components/BookCatalogue';
import * as BooksAPI from './BooksAPI';
import BooksSearch from './components/Shelf/BooksSearch';
import sortBy from 'sort-by';

class App extends Component {
  state = 
	{
		books : [],
		booksonshelf : [
		{value:'currentlyReading', display:'Reading Now', isBookonShelf:true},
		{value:'wantToRead', display:'Want to Read', isBookonShelf:true},
		{value:'read', display:'Read', isBookonShelf:true},
		{value:'none', display:'None', isBookonShelf:false}
		]
  }
  componentDidMount(){
		BooksAPI.getAll().then((books) =>{
			books.sort(sortBy('title'))
			this.setState({books})
		})
  }
  
  updateShelf = (book, newshelf) => {
		BooksAPI.update(book,newshelf).then(() => {
			book.shelf = newshelf;
			this.setState((state) => ({
		      books:state.books.filter((c)=> c.id !== book.id).concat([book]).sort(sortBy('title'))
		    }))
		})
	}
  render() {
  	const {books, booksonshelf} = this.state;
  return (
    <div className="app">
      	<Route exact path="/" render={() =>
      		(
      			<BookCatalogue books={books} onChangeShelf={this.updateShelf} booksonshelf={booksonshelf} />
      		)
      	} />
      	<Route path="/search" render={() => 
      		(
      			<BooksSearch onChangeShelf={this.updateShelf} prebooks={books} booksonshelf={booksonshelf} />
      		)
      	} />
      </div>
    );
  }
}

export default App;