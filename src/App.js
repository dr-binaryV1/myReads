import React from 'react'
import * as BooksAPI from './BooksAPI'
import BookShelf from './BookShelf';
import Search from './Search';
import Header from './Header';
import './App.css'

class BooksApp extends React.Component {
  componentDidMount() {
    const bookShelf = ['currentlyReading', 'wantToRead', 'read'];

    BooksAPI.getAll().then(books => {
      bookShelf.map(shelf => this.filterBookShelf(books, shelf));
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
    wantToRead: [],
    read: []
  }

  onSearchNavigate = () => {
    this.setState({ showSearchPage: true });
  }

  onBookShelfNavigate = () => {
    this.setState({ showSearchPage: false });
  }
  
  filterBookShelf(books, shelf) {
    const filteredBooks = books
      .filter((book) => {return shelf === book.shelf})
      .map((book) => { return book });

    this.setState({ [shelf] : filteredBooks });
  }

  updateBooks = (book, shelf) => {
    BooksAPI.update(book, shelf).then((books) => {
      console.log(books);
       Object.keys(books).map(key => this.filterBookShelf(books[key], key));
    });
  }

  render() {
    const { currentlyReading, wantToRead, read } = this.state;

    return (
      <div className="app">
        {this.state.showSearchPage ? (
          <Search
            updateBooks={this.updateBooks}
            onBookShelfNavigate={this.onBookShelfNavigate} />
        ) : (
          <div>
            <Header />
            <BookShelf
              books={currentlyReading}
              title='Currently Reading'
              shelf='currentlyReading'
              updateBooks={this.updateBooks}
              onSearchNavigate={this.onSearchNavigate} />

            <BookShelf
              books={wantToRead}
              title='Want to Read'
              shelf='wantToRead'
              updateBooks={this.updateBooks}
              onSearchNavigate={this.onSearchNavigate} />

            <BookShelf
              books={read}
              title='Read'
              shelf='read'
              updateBooks={this.updateBooks}
              onSearchNavigate={this.onSearchNavigate} />
          </div>
        )}
      </div>
    )
  }
}

export default BooksApp
