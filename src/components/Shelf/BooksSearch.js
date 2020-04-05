import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import * as BooksAPI from './../../BooksAPI';
import BookSelection from './BookSelection';

export class SearchBooks extends Component {
	static propTypes = {
		onChangeShelf: PropTypes.func.isRequired,
		prebooks: PropTypes.array.isRequired,
		booksonshelf: PropTypes.array.isRequired
	}
	state = {
		query : '',
		maxResults : 20,
		books: []
	}

	updateQuery = (query) => {        		
		this.setState({query})
		if(query !== '')
		{
			const {prebooks} = this.props;
			BooksAPI.search(query,this.state.maxResults).then((books) => {
				if (!books || books.error) {
					this.setState({books:[]})
					return			
				}
			
				books.map((book) => 
				{					
					prebooks.filter((obj) => obj.id === book.id).map(obj => { return book.shelf = obj.shelf})
					return book
				}).map((obj) => {
					obj.shelf = !obj.shelf ? 'none' : obj.shelf;
					return obj
				})
				this.setState({books})
			})
		}
		else
		{
			this.setState({books:[]})
		}
    }

	handleChange = (book,shelf) => {
		if(this.props.onChangeShelf)
			this.props.onChangeShelf(book, shelf);
	}

	render() {
		const {query, books} = this.state;
		const {booksonshelf} = this.props;
		return (
			<div className="search-books">
				<div className="search-books-bar">
					<Link className="close-search" to="/" >
	                    Close
	                </Link>
	                <div className="search-books-input-wrapper">
	                	<input type="text" placeholder="Search by title or author" 
	                	value={query}
	                	onChange={(event) => this.updateQuery(event.target.value) } />
	                </div>
				</div>
				<div className="search-books-results">
              		<ol className="books-grid">
					{books.map((book) => (					
						<li key={book.id}>
							<div className="book">
								<div className="book-top">
									<div className="book-cover" style={{ width: 128, height: 188, backgroundImage: `url(${!!book.imageLinks ? book.imageLinks.smallThumbnail : ''})` }}></div>
									<div className="book-shelf-changer">
										<BookSelection book={book} onChangeShelf={this.handleChange} booksonshelf={booksonshelf} />
									</div>
								</div>
								<div className="book-title">
									{book.title}
								</div>
								<div className="book-authors">
									{!!book.authors ? book.authors.join(', ') : books.authors}
								</div>
							</div>
						</li>
					))}              		
              		</ol>
            	</div>
			</div>
		);
	}
}

export default SearchBooks;