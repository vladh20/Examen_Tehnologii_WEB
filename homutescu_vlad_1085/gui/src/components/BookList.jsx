const BookList = ({ books, handleDelete, editBooks, all }) => {
  return (
    <div className="book-list">
      {books.map((book) => (
        <div className="preview-book" key={book.id}>
          <div className="textHolder">
            <p>Titlu: {book.titlu}</p>
            <p>Gen Literar: {book.genLiterar}</p>
            <p>URL: {book.url}</p>
          </div>
          {!all && (
            <div className="buttonHolder">
              <button
                className="button-33"
                onClick={() => handleDelete(book.id)}
              >
                Sterge Carte
              </button>
              <button className="button-33" onClick={() => editBooks(book.id)}>
                Modifica carte
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default BookList;
