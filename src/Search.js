import React, { Component } from 'react';

import Book from './Book';
import * as BooksAPI from './BooksAPI'

class Search extends Component {
  state = {
    query: '',
    queriedBooks: []
  }

  onInputChange = (e) => {
    const { query } = this.state;
    this.setState({ query: e.target.value });

    if(query) {
      BooksAPI.search(query, 30).then((books) => this.setState({ queriedBooks: books }));
    }
  }

  checkShelf(book) {
    const { 
      currentlyReadingShelf,
      wantToReadShelf,
      readShelf
    } = this.props;

    var filteredBook = currentlyReadingShelf.filter((b) => {return b.id === book.id});
    
    if(filteredBook.length < 1) {
      filteredBook = wantToReadShelf.filter((b) => {return b.id === book.id});
    }

    if(filteredBook.length < 1) {
      filteredBook = readShelf.filter((b) => {return b.id === book.id});
    }

    filteredBook.length > 0 ? filteredBook.map((filtered_book) => {return book = filtered_book}) : book;
    return book;
  }

  render() {
    const { 
      updateBooks,
      history,
      currentlyReadingShelf,
      wantToReadShelf,
      readShelf
    } = this.props;

    const { query, queriedBooks } = this.state;

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <a className="close-search" onClick={() => history.push('/')}>Close</a>
          <div className="search-books-input-wrapper">
            <input 
              onChange={this.onInputChange} 
              type="text" 
              value={query}
              placeholder="Search by title or author"/>
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {queriedBooks.length > 0 ? 
              queriedBooks.map((book) => {
                book = this.checkShelf(book);
                return (
                  <Book key={book.id} book={book} updateBooks={updateBooks} />  
                  )})
              : 
              ''
            }
          </ol>
        </div>
      </div>
    )
  }
}

export default Search;