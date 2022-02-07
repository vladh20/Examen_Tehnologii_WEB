import express from "express";
import { VirtualShelf, Book } from "./entities.js";

const router = express.Router();

router
  .route("/book")
  .post(async (req, res) => postRecords(Book, req, res))
  .get(async (req, res) => getRecords(Book, req, res))
  .delete(async (req, res) => deleteRecords(Book, req, res));

router
  .route("/book/sort")
  .get(async (req, res) => getRecordsSorted(Book, req, res));

router
  .route("/book/pagination")
  .get(async (req, res) => getRecordsPagination(Book, req, res));

router
  .route("/book/filter")
  .get(async (req, res) => getRecordsFiltered(Book, req, res));

router
  .route("/book/:id")
  .get(async (req, res) => getRecord(Book, req, res))
  .delete(async (req, res) => deleteRecord(Book, req, res))
  .put(async (req, res) => putRecord(Book, req, res));

router
  .route("/book/virtualshelf/:id")
  .get(async (req, res) => getBooks(Book, req, res));

router
  .route("/virtualshelf")
  .post(async (req, res) => postRecords(VirtualShelf, req, res))
  .get(async (req, res) => getRecords(VirtualShelf, req, res))
  .delete(async (req, res) => deleteRecords(VirtualShelf, req, res));

router
  .route("/virtualshelf/:id")
  .get(async (req, res) => getRecord(VirtualShelf, req, res))
  .delete(async (req, res) => deleteRecord(VirtualShelf, req, res))
  .put(async (req, res) => putRecord(VirtualShelf, req, res));

async function postRecords(Model, req, res) {
  try {
    let record = await Model.create(req.body);
    res
      .status(201)
      .location(
        `http://${req.headers.host}${req.baseUrl}${req.url}/${record.id}`
      )
      .send();
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
}

async function getRecords(Model, req, res) {
  try {
    let records = await Model.findAll();
    if (records.length > 0) {
      res.status(200).json(records);
    } else {
      res.status(204).send();
    }
  } catch (error) {
    console.log("error: " + error);
    res.status(500).json(error);
  }
}

async function getRecordsSorted(Model, req, res) {
  try {
    let records = await Model.findAll({
      order: [["titlu", "DESC"]],
    });
    if (records.length > 0) {
      res.status(200).json(records);
    } else {
      res.status(204).send();
    }
  } catch (error) {
    console.log("error: " + error);
    res.status(500).json(error);
  }
}

async function getRecordsPagination(Model, req, res) {
  try {
    let records = await Model.findAll({
      offset: 2,
      limit: 3,
    });
    if (records.length > 0) {
      res.status(200).json(records);
    } else {
      res.status(204).send();
    }
  } catch (error) {
    console.log("error: " + error);
    res.status(500).json(error);
  }
}

async function getRecordsFiltered(Model, req, res) {
  try {
    let records = await Model.findAll({
      where: {
        titlu: "Haarap-Alb",
      },
    });
    if (records.length > 0) {
      res.status(200).json(records);
    } else {
      res.status(204).send();
    }
  } catch (error) {
    console.log("error: " + error);
    res.status(500).json(error);
  }
}

async function deleteRecords(Model, req, res) {
  try {
    await Model.truncate();
    res.status(204).send();
  } catch (error) {
    res.status(500).json(error);
  }
}

async function getRecord(Model, req, res) {
  try {
    let record = await Model.findByPk(req.params.id);
    if (record) {
      res.status(200).json(record);
    } else {
      res.status(404).send();
    }
  } catch (error) {
    res.status(500).json(error);
  }
}

async function getBooks(Model, req, res) {
  try {
    let record = await Model.findAll({
      where: { VirtualShelfID: req.params.id },
    });
    if (record) {
      res.status(200).json(record);
    } else {
      res.status(404).send();
    }
  } catch (error) {
    res.status(500).json(error);
  }
}

async function putRecord(Model, req, res) {
  try {
    let record = await Model.findByPk(req.params.id);
    if (record) {
      await record.update(req.body);
      res.status(204).send();
    } else {
      res.status(404).send();
    }
  } catch (error) {
    res.status(500).json(error);
  }
}

async function deleteRecord(Model, req, res) {
  try {
    let record = await Model.findByPk(req.params.id);
    if (record) {
      await record.destroy();
      res.status(204).send();
    } else {
      res.status(404).send();
    }
  } catch (error) {
    res.status(500).json(error);
  }
}

export default router;
