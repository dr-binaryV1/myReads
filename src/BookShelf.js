import React from 'react';
import Book from './Book';

function BookShelf(props) {
  const { books, updateBooks } = props;

  return (
    <div className="list-books">
      <div className="list-books-content">
        <div>
          <div className="bookshelf">
            <h2 className="bookshelf-title">{props.title}</h2>
            <div className="bookshelf-books">
              <ol className="books-grid">
                {books.filter((book) => {
                  return book.shelf === props.shelf
                }).map((book) => {
                  return <Book updateBooks={updateBooks} key={book.id} book={book} />
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