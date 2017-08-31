import React, { Component } from 'react'
import { Route } from 'react-router-dom';

import * as BooksAPI from './BooksAPI'
import BookShelf from './BookShelf';
import Search from './Search';
import Header from './Header';
import './App.css'

class BooksApp extends Component {
  componentDidMount() {
    BooksAPI.getAll().then(books => {
      this.props.bookShelf.map(shelf => this.filterBookShelf(books, shelf));
    });
  }

  state = {
    currentlyReading: [],
    wantToRead: [],
    read: []
  }
  
  filterBookShelf(books, shelf) {
    const filteredBooks = books
      .filter((book) => {return shelf === book.shelf})
      .map((book) => { return book });

    this.setState({ [shelf] : filteredBooks });
  }

  updateBooks = (book, shelf) => {
    BooksAPI.update(book, shelf).then(() => {
      BooksAPI.getAll().then((books) => {
        this.props.bookShelf.map(shelf => this.filterBookShelf(books, shelf));
      }); 
    });
  }

  render() {
    const { currentlyReading, wantToRead, read } = this.state;

    return (
      <div className="app">
        <Route path='/search' render={({ history }) => {
          return (
            <Search
              history={history}
              currentlyReadingShelf={currentlyReading}
              wantToReadShelf={wantToRead}
              readShelf={read}
              updateBooks={this.updateBooks} />
          )
        }} />
        <Route exact path='/' render={({ history }) => {
          return (
            <div>
              <Header />
              <BookShelf
                books={currentlyReading}
                title='Currently Reading'
                shelf='currentlyReading'
                history={history}
                updateBooks={this.updateBooks}
                onSearchNavigate={this.onSearchNavigate} />

              <BookShelf
                books={wantToRead}
                title='Want to Read'
                shelf='wantToRead'
                history={history}
                updateBooks={this.updateBooks}
                onSearchNavigate={this.onSearchNavigate} />

              <BookShelf
                books={read}
                title='Read'
                shelf='read'
                history={history}
                updateBooks={this.updateBooks}
                onSearchNavigate={this.onSearchNavigate} />
            </div>
          )
        }} />
      </div>
    )
  }
}

export default BooksApp
