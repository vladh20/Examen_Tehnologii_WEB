import { useEffect, useState } from "react";
import BookList from "./BookList";

export const Book = () => {
  const [books, setBooks] = useState([]);
  const [book, setBook] = useState({
    id: -1,
    titlu: "",
    genLiterar: "",
    url: "",
  });

  const [titlu, setTitlu] = useState("");
  const [genLiterar, setGenLiterar] = useState("");
  const [url, setUrl] = useState("");
  const [virtualShelf, setVirtualShelf] = useState([]);

  useEffect(() => {
    getBooks();
    getVirtualShelfs();
  }, [book]);

  const getVirtualShelfs = () => {
    const req = `http://localhost:8080/virtualshelf`;
    fetch(req).then((response) => {
      if (response.status === 200) {
        response.json().then((json) => {
          setVirtualShelf(json);
        });
      } else {
        setVirtualShelf([]);
      }
    });
  };

  const getBooks = () => {
    const req = `http://localhost:8080/book`;
    fetch(req).then((response) => {
      if (response.status === 200) {
        response.json().then((json) => {
          setBooks(json);
        });
      } else {
        setBooks([]);
      }
    });
  };

  const createBook = (e) => {
    e.preventDefault();

    const titlu = e.target.titlu.value;
    const genLiterar = e.target.genLiterar.value;
    const url = e.target.url.value;
    const shelf = e.target.virtualShelf.value;

    if (titlu.length > 0) {
      const req = `http://localhost:8080/book`;
      fetch(req, {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
        },
        body: JSON.stringify({
          titlu: titlu,
          genLiterar: genLiterar,
          url: url,
          VirtualShelfId: shelf,
        }),
      }).then((response) => {
        if (response.status === 201) {
          console.log("Book was inserted");
          getBooks();
        } else if (response.status === 500) {
          console.log("Book was not inserted");
        }
      });
    }
  };

  const deleteBook = (id) => {
    const req = `http://localhost:8080/book/${id}/`;
    fetch(req, {
      method: "DELETE",
      mode: "cors",
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
    }).then((response) => {
      console.log(response);
      if (response.status === 201) {
        console.log("Book was deleted");
      } else if (response.status === 500) {
        console.log("Book was not deleted");
      } else if (response.status === 204) {
        getBooks();
        console.log("Book was deleted");
      }
    });
  };

  const fetchData = (id) => {
    const req = `http://localhost:8080/book/${id}`;
    fetch(req).then((response) => {
      if (response.status === 200) {
        response.json().then((json) => {
          setBook(json);
          setTitlu(json.titlu);
          setGenLiterar(json.genLiterar);
          setUrl(json.url);
        });
      }
    });
  };

  const editBook = (e) => {
    const titlu2 = e.target.modificaTitlu.value;
    const genLiterar2 = e.target.modificaGenLiterar.value;
    const url2 = e.target.modificaUrl.value;

    const req = `http://localhost:8080/book/${book.id}/`;
    fetch(req, {
      method: "PUT",
      mode: "cors",
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify({
        titlu: titlu2,
        genLiterar: genLiterar2,
        url: url2,
      }),
    }).then((response) => {
      if (response.status === 201) {
        console.log("Book was modified");
        getBooks();
      } else if (response.status === 500) {
        console.log("Book was not modified");
      }
    });
  };

  return (
    <div>
      <div className="left">
        <form className="form" onSubmit={createBook}>
          <label class="field field_v1">
            <input
              type="text"
              name="titlu"
              placeholder="titlu"
              className="field__input"
            />
            <span class="field__label-wrap">
              <span class="field__label">Titlu</span>
            </span>
          </label>
          <label class="field field_v1">
            <input
              type="url"
              name="url"
              placeholder="url"
              className="field__input"
            />
            <span class="field__label-wrap">
              <span class="field__label">URL</span>
            </span>
          </label>

          <select id="genLiterar" name="genLiterar">
            <option value={"comedy"}>comedy</option>
            <option value={"horror"}>horror</option>
            <option value={"tragedy"}>tragedy</option>
          </select>

          <select id="virtualShelf" name="virtualShelf">
            {virtualShelf.map((shelf) => (
              <option value={shelf.id} key={shelf.id}>
                {shelf.descriere}
              </option>
            ))}
          </select>
          <button className="button-33">Adauga carte</button>
        </form>

        <form className="form2" onSubmit={editBook}>
          <label class="field field_v1">
            <input
              type="text"
              name="modificaTitlu"
              placeholder="titlu"
              value={titlu}
              onChange={(e) => setTitlu(e.target.value)}
              className="field__input"
            />
            <span class="field__label-wrap">
              <span class="field__label">Titlu</span>
            </span>
          </label>

          <label class="field field_v1">
            <input
              type="url"
              name="modificaUrl"
              placeholder="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="field__input"
            />
            <span class="field__label-wrap">
              <span class="field__label">URL</span>
            </span>
          </label>
          <select id="genLiterar" name="modificaGenLiterar">
            <option>{genLiterar}</option>
            <option value={"comedy"}>comedy</option>
            <option value={"horror"}>horror</option>
            <option value={"tragedy"}>tragedy</option>
          </select>
          <button className="button-33">Modifica carte</button>
        </form>
      </div>

      <div className="right">
        <BookList
          books={books}
          handleDelete={deleteBook}
          editBooks={fetchData}
          all={false}
        />
      </div>
    </div>
  );
};
