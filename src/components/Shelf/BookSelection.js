import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class BookSelection extends Component {
	static propTypes = {
		booksonshelf: PropTypes.array.isRequired,
		onChangeShelf: PropTypes.func.isRequired,
		book: PropTypes.object.isRequired
	}

	onChange = (book,event) => {
		const value =  event.target.value;
		if(this.props.onChangeShelf)
			this.props.onChangeShelf(book, value);
	}

	render() {
		const {book, booksonshelf} = this.props;
		return (
			<select value={book.shelf} onChange={(e) => this.onChange(book, e)}>
				<option value="" disabled>Shift to...</option>
				{booksonshelf.map(option => (
					<option value={option.value} key={option.value}>{option.display}</option>
				))}
			</select>
		);
	}
}

export default BookSelection;