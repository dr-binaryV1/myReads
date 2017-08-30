import React from 'react';
import Book from './Book';

function BookShelf(props) {
  const { books } = props;

  return (
    <div className="list-books">
    <div className="list-books-title">
      <h1>MyReads</h1>
    </div>
    <div className="list-books-content">
      <div>
        <div className="bookshelf">
          <h2 className="bookshelf-title">Currently Reading</h2>
          <div className="bookshelf-books">
            <ol className="books-grid">
              {books.filter((book) => {
                return book.shelf === 'currentlyReading'
              }).map((book) => {
                return <Book key={book.id} book={book} />
              })}
            </ol>
          </div>
        </div>
        <div className="bookshelf">
          <h2 className="bookshelf-title">Want to Read</h2>
          <div className="bookshelf-books">
            <ol className="books-grid">
              {books.filter((book) => {
                  return book.shelf === 'wantToRead'
                }).map((book) => {
                  return <Book key={book.id} book={book} />
                })}
            </ol>
          </div>
        </div>
        <div className="bookshelf">
          <h2 className="bookshelf-title">Read</h2>
          <div className="bookshelf-books">
            <ol className="books-grid">
              {books.filter((book) => {
                  return book.shelf === 'read'
                }).map((book) => {
                  return <Book key={book.id} book={book} />
                })}
            </ol>
          </div>
        </div>
      </div>
    </div>
    <div className="open-search">
      <a onClick={() => props.onSearchNavigate()}>Add a book</a>
    </div>
  </div>
  )
}

export default BookShelf;