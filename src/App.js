import React from 'react'
import * as BooksAPI from './BooksAPI'
import BookShelf from './BookShelf';
import Search from './Search';
import './App.css'

class BooksApp extends React.Component {
  componentDidMount() {
    BooksAPI.getAll().then(books => {
      this.setState({ books });
      console.log(books);
    });
  }

  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    showSearchPage: true,
    currentlyReading: [],
    read: [],
    wantToRead: [],
    books: []
  }

  onSearchNavigate = () => {
    this.setState({ showSearchPage: true });
  }

  onBookShelfNavigate = () => {
    this.setState({ showSearchPage: false });
  }

  updateCurrentlyReading = (arr) => {
    this.setState({ currentlyReading: arr })
  }

  render() {
    const { books } = this.state;

    return (
      <div className="app">
        {this.state.showSearchPage ? (
          <Search
            books={books} 
            onBookShelfNavigate={this.onBookShelfNavigate} />
        ) : (
          <BookShelf
            books={books}
            updateCurrentlyReading={this.updateCurrentlyReading}
            onSearchNavigate={this.onSearchNavigate} />
        )}
      </div>
    )
  }
}

export default BooksApp
