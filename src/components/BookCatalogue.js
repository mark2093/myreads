import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import Shelf from './Shelf/Shelf';

export class BookCatalogue extends Component {
	static propTypes = {
		books: PropTypes.array.isRequired,
		onChangeShelf: PropTypes.func.isRequired,
		booksonshelf: PropTypes.array.isRequired
	}

	handleChange = (book,shelf) => {
		if(this.props.onChangeShelf)
			this.props.onChangeShelf(book, shelf);
	}

	render() {
		const {books, booksonshelf} = this.props;
		
		return (
			<div className="list-books">
				<div className="list-books-title">
					<h1>MyReads</h1>
				</div>
				<div className="list-books-content">
					<div>
						{booksonshelf.filter(title => title.isBookonShelf === true).map((title) => (
                            <Shelf key={title.value} 
                            booksonshelf={booksonshelf} 
                            title={title} books={books} 
                            onChangeShelf={this.handleChange} />	
						))}
										
					</div>
				</div>
				<div className="open-search">
					<Link to="/search">
	                        Add a book
	                </Link> 
				</div>	
			</div>
			
		);
	}
}

export default BookCatalogue;