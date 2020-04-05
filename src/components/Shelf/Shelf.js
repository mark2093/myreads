import React, { Component } from 'react';
import PropTypes from 'prop-types';
import BookSelection from './BookSelection';

export class Shelf extends Component {
	static propTypes = {
		booksonshelf: PropTypes.array.isRequired,
		onChangeShelf: PropTypes.func.isRequired,
		books: PropTypes.array.isRequired,
		title: PropTypes.object.isRequired
	}

	onChange = (book,shelf) => {
		if(this.props.onChangeShelf)
			this.props.onChangeShelf(book, shelf);
	}

	render() {
		const {title, books, booksonshelf} = this.props;
		return (
			<div className="bookshelf">
				<h2 className="bookshelf-title">{title.display}</h2>
				<div className="bookshelf-books">
					<ol className="books-grid">
					{books.filter(book => book.shelf === title.value).map((book) => (					
						<li key={book.id}>
							<div className="book">
								<div className="book-top">
									<div className="book-cover" style={{ width: 128, height: 188, backgroundImage: `url(${book.imageLinks.smallThumbnail})` }}></div>
									<div className="book-shelf-changer">
										<BookSelection book={book} onChangeShelf={this.onChange} booksonshelf={booksonshelf} />
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

export default Shelf;