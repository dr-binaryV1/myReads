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

  render() {
    const { onBookShelfNavigate, updateBooks } = this.props;
    const { query, queriedBooks } = this.state;

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
              value={query}
              placeholder="Search by title or author"/>
            
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {queriedBooks.length > 0 ? queriedBooks.map((book) => { return <Book key={book.id} book={book} updateBooks={updateBooks} />  }) : ''}
          </ol>
        </div>
      </div>
    )
  }
}

export default Search;