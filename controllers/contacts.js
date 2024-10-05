const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
  //#swagger.tags=['Contacts']
  const result = await mongodb.getDb().db().collection('contacts').find();
  result.toArray((err, contacts) => {
    if (err) {
      res.status(400).json({ message: err });
    }
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(contacts);
  });
};

const getSingle = async (req, res) => {
  //#swagger.tags=['Contacts']
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Invalid id entered. Check your contact id to find a contact.');
  }
  const contactId = new ObjectId(req.params.id);
  const result = await mongodb.getDb().db().collection('contacts').find({ _id: contactId });
  result.toArray((err, contacts) => {
    if (err) {
      res.status(400).json({ message: err });
    }
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(contacts[0]);
  });
};

const createContact = async (req, res) => {
  //#swagger.tags=['Contacts']
  const contact = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    birthday: req.body.birthday,
    email: req.body.email,
    favFood: req.body.favFood,
  };
  const response = await mongodb.getDb().db().collection('contacts').insertOne(contact);
  if (response.acknowledged > 0) {
    res.status(204).send();
  } else {
    res
      .status(500)
      .json(response.error || 'Some error occurred while updating the contact');
  }
};

const updateContact = async (req, res) => {
  //#swagger.tags=['Contacts']
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Invalid id entered. Check your contact id to update a contact.');
  }
  const contactId = new ObjectId(req.params.id);
  const contact = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    birthday: req.body.birthday,
    email: req.body.email,
    favFood: req.body.favFood,
  };
  const response = await mongodb.getDb().db().collection('contacts').replaceOne({ _id: contactId }, contact);
  if (response.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res
      .status(500)
      .json(response.error || 'Some error occurred while updating the contact');
  }
};

const deleteContact = async (req, res) => {
  //#swagger.tags=['Contacts']
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Invalid id entered. Check your contact id to delete a contact.');
  }
  const contactId = new ObjectId(req.params.id);
  const response = await mongodb.getDb().db().collection('contacts').deleteOne({ _id: contactId }, true);
  if (response.deletedCount > 0) {
    res.status(204).send();
  } else {
    res
      .status(500)
      .json(response.error || 'Some error occurred while updating the contact');
  }
};

module.exports = {
  getAll,
  getSingle,
  createContact,
  updateContact,
  deleteContact,
};
