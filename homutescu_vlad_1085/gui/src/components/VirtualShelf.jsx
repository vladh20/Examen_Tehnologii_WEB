import { useEffect, useState } from "react";
import BookList from "./BookList";
import VirtualShelfList from "./VirtualShelfList";

export const VirtualShelf = () => {
  const [virtualShelfs, setVirtualShelfs] = useState([]);
  const [virtualShelf, setVirtualShelf] = useState({
    id: -1,
    descriere: "",
  });

  const [descriere, setDescriere] = useState("");
  const [books, setBooks] = useState([]);
  useEffect(() => {
    getVirtualShelfs();
  }, [virtualShelf]);

  const getVirtualShelfs = () => {
    const req = `http://localhost:8080/virtualshelf`;
    fetch(req).then((response) => {
      if (response.status === 200) {
        response.json().then((json) => {
          setVirtualShelfs(json);
        });
      } else {
        setVirtualShelfs([]);
      }
    });
  };

  const createVirtualShelf = (e) => {
    e.preventDefault();
    const descriere = e.target.descriere.value;
    if (descriere.length > 0) {
      const req = `http://localhost:8080/virtualshelf`;
      fetch(req, {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
        },
        body: JSON.stringify({
          descriere: descriere,
        }),
      }).then((response) => {
        if (response.status === 201) {
          console.log("virtualShelf was inserted");
          getVirtualShelfs();
        } else if (response.status === 500) {
          console.log("virtualShelf was not inserted");
        }
      });
    }
  };

  const deleteVirtualShelf = (id) => {
    const req = `http://localhost:8080/virtualshelf/${id}/`;
    fetch(req, {
      method: "DELETE",
      mode: "cors",
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
    }).then((response) => {
      if (response.status === 201) {
        console.log("virtualshelf was deleted");
      } else if (response.status === 500) {
        console.log("virtualshelf was not deleted");
      } else if (response.status === 204) {
        console.log("virtualshelf was deleted");
        getVirtualShelfs();
      }
    });
  };

  const fetchData = (id) => {
    const req = `http://localhost:8080/virtualshelf/${id}`;
    fetch(req).then((response) => {
      if (response.status === 200) {
        response.json().then((json) => {
          setVirtualShelf(json);
          setDescriere(json.descriere);
        });
      }
    });
  };

  const editVirtualShelf = (e) => {
    const descriere2 = e.target.modificaDescriere.value;

    const req = `http://localhost:8080/virtualshelf/${virtualShelf.id}/`;
    fetch(req, {
      method: "PUT",
      mode: "cors",
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify({
        descriere: descriere2,
      }),
    }).then((response) => {
      if (response.status === 201) {
        console.log("virtualShelf was modified");
        getVirtualShelfs();
      } else if (response.status === 500) {
        console.log("virtualShelf was not modified");
      }
    });
  };

  const handleView = (id) => {
    const req = `http://localhost:8080/book/virtualshelf/${id}`;
    fetch(req).then((response) => {
      if (response.status === 200) {
        response.json().then((json) => {
          setBooks(json);
        });
      }
    });
  };

  return (
    <div>
      <div className="left">
        <form className="form" onSubmit={createVirtualShelf}>
          <label class="field field_v1">
            <input
              type="text"
              name="descriere"
              placeholder="Descriere"
              className="field__input"
            />
            <span class="field__label-wrap">
              <span class="field__label">Descriere</span>
            </span>
          </label>
          <button className="button-33">Create Virtual Shelf</button>
        </form>
        <form className="form2" onSubmit={editVirtualShelf}>
          <label class="field field_v1">
            <input
              type="text"
              name="modificaDescriere"
              placeholder="descriere"
              value={descriere}
              onChange={(e) => setDescriere(e.target.value)}
              className="field__input"
            />
            <span class="field__label-wrap">
              <span class="field__label">Modifica Descrierea</span>
            </span>
          </label>
          <button className="button-33">Modifica Virtual Shelf</button>
        </form>
      </div>
      <div className="right">
        <VirtualShelfList
          virtualShelfs={virtualShelfs}
          handleDelete={deleteVirtualShelf}
          editVirtualShelf={fetchData}
          viewBooks={handleView}
        />
      </div>
      <div className="right">
        <BookList books={books} all={true} />
      </div>
    </div>
  );
};
