const fs = require('fs');

const dbPath = `${__dirname}/../../db/cat.json`;

const getRandomInt = () => Math.floor(Math.random() * Math.floor(100000));

class Cat {
  constructor(cat) {
    this.id = cat.id;
    this.name = cat.name;
    this.age = cat.age;
  }

  static findAll() {
    return new Promise((resolve, reject) => {
      fs.readFile(dbPath, 'utf8', (err, data) => {
        if (err) {
          console.error(`Error from Cat Model : ${err}`);
          return reject(err);
        }
        const res = JSON.parse(data);
        return resolve(res);
      });
    });
  }

  static findById(id) {
    return new Promise((resolve, reject) => {
      fs.readFile(dbPath, 'utf8', (err, data) => {
        if (err) {
          console.error(`Error from Cat Model : ${err}`);
          return reject(err);
        }
        const res = JSON.parse(data);
        const el = res.find((r) => r.id === id);
        if (!el) {
          return resolve({});
        }
        return resolve(el);
      });
    });
  }

  static create(newCat) {
    return new Promise((resolve, reject) => {
      fs.readFile(dbPath, 'utf8', (err, data) => {
        if (err) {
          console.error(`Error from Cat Model : ${err}`);
          return reject(err);
        }

        const db = JSON.parse(data);
        let randomId = getRandomInt();
        let el = db.find((r) => r.id === randomId);

        while (el) {
          randomId = getRandomInt();
          el = db.find((r) => r.id === randomId);
        }
        newCat.id = randomId;
        db.push(newCat);
        return fs.writeFile(dbPath, JSON.stringify(db, null, 4), 'utf8', (err2) => {
          if (err2) {
            console.error(`Error from Cat Model : ${err2}`);
            return reject(err2);
          }
          return resolve(newCat);
        });
      });
    });
  }

  static updateById(id, updateCat) {
    return new Promise((resolve, reject) => {
      fs.readFile(dbPath, 'utf8', (err, data) => {
        if (err) {
          console.error(`Error from Cat Model : ${err}`);
          return reject(err);
        }
        const db = JSON.parse(data);
        const el = db.findIndex((r) => r.id === id);
        if (el === -1) {
          console.error(`Cat not found from Cat Model with ID : ${id}`);
          return reject(err);
        }
        const catId = db[el].id;

        const newCat = updateCat;
        newCat.id = catId;
        db.splice(el, 1, newCat);
        return fs.writeFile(dbPath, JSON.stringify(db, null, 4), 'utf8', (err2) => {
          if (err2) {
            console.error(`Error from Cat Model : ${err2}`);
            return reject(err2);
          }
          return resolve(newCat);
        });
      });
    });
  }

  static remove(id) {
    return new Promise((resolve, reject) => {
      fs.readFile(dbPath, 'utf8', (err, data) => {
        if (err) {
          console.error(`Error from Cat Model : ${err}`);
          return reject(err);
        }
        const db = JSON.parse(data);
        const el = db.findIndex((r) => r.id === id);
        if (el === -1) {
          console.error(`Cat not found from Cat Model with ID : ${id}`);
          return reject(err);
        }

        db.splice(el, 1);
        return fs.writeFile(dbPath, JSON.stringify(db, null, 4), 'utf8', (err2) => {
          if (err2) {
            console.error(`Error from Cat Model : ${err2}`);
            return reject(err2);
          }
          return resolve({ deleteId: id });
        });
      });
    });
  }
}

module.exports = Cat;
