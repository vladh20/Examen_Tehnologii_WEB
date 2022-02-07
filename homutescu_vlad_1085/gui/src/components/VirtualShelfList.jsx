const VirtualShelfList = ({
  virtualShelfs,
  handleDelete,
  editVirtualShelf,
  viewBooks,
}) => {
  return (
    <div className="virtualShelf-list">
      {virtualShelfs.map((virtualShelf) => (
        <div className="preview-book" key={virtualShelf.id}>
          <div className="textHolder">
            <p>VirtualShelf ID: {virtualShelf.id}</p>
            <p>Descriere: {virtualShelf.descriere}</p>
            <p>Data si ora creeari: {virtualShelf.createdAt}</p>
          </div>
          <div className="buttonHolder">
            <button
              className="button-33"
              onClick={() => handleDelete(virtualShelf.id)}
            >
              Sterge virtual shelf
            </button>
            <button
              className="button-33"
              onClick={() => editVirtualShelf(virtualShelf.id)}
            >
              Modifica virtual shelf
            </button>
            <button
              className="button-33"
              onClick={() => viewBooks(virtualShelf.id)}
            >
              Vezi cartile din shelf
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default VirtualShelfList;
