import React, { Component } from 'react';
import escapeRegExp from 'escape-string-regexp';

import Book from './Book';
import * as BooksAPI from './BooksAPI'

class Search extends Component {
  state = {
    query: ''
  }

  onInputChange = (e) => {
    this.setState({ query: e.target.value });
  }

  render() {
    let showingBooks;
    const { books, onBookShelfNavigate } = this.props;
    const { query } = this.state;

    if(query) {
      const match = new RegExp(escapeRegExp(query), 'i');
      showingBooks = books.filter((book) => match.test(book.title) || match.test(book.authors));
    } else {
        showingBooks = books;
    }

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <a className="close-search" onClick={() => onBookShelfNavigate()}>Close</a>
          <div className="search-books-input-wrapper">
            {/* 
              NOTES: The search from BooksAPI is limited to a particular set of search terms.
              You can find these search terms here:
              https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md
              
              However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
              you don't find a specific author or title. Every search is limited by search terms.
            */}
            <input 
              onChange={this.onInputChange} 
              type="text" 
              value={this.state.query}
              placeholder="Search by title or author"/>
            
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {showingBooks.map((book) => { return <Book key={book.id} book={book} />  })}
          </ol>
        </div>
      </div>
    )
  }
}

export default Search;