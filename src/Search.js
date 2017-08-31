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

  //Check BookShelf to crosscheck whether a book retrieved from search is already on the shelf
  checkShelf(book) {
    const { 
      currentlyReadingShelf,
      wantToReadShelf,
      readShelf
    } = this.props;

    var shelf = currentlyReadingShelf.filter((b) => {return b.id === book.id});
    
    if(shelf.length < 1) {
      shelf = wantToReadShelf.filter((b) => {return b.id === book.id});
    }

    if(shelf.length < 1) {
      shelf = readShelf.filter((b) => {return b.id === book.id});
    }

    // If the shelf array is greater than 0 then map over the element and return the book that in the shelf else return undefined
    shelf.length > 0 ? shelf.map((book) => {return shelf = book.shelf}) : shelf = undefined;
    return shelf;
  }

  render() {
    const { 
      updateBooks,
      history
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
                const shelf = this.checkShelf(book);
                return (
                  <Book key={book.id} shelf={shelf} book={book} updateBooks={updateBooks} />  
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