const apiUrl = 'http://localhost:3000/api';

window.onload = () => {
  getAllCat();
};

const getAllCat = async () => {
  const res = await fetch(`${apiUrl}/cat`);
  const json = await res.json();

  const tbody = document.querySelector('tbody');
  tbody.innerHTML = '';
  json.forEach((element) => {
    const tr = document.createElement('tr');
    const id = document.createElement('th');
    const name = document.createElement('td');
    const age = document.createElement('td');

    id.textContent = element.id;
    name.textContent = element.name;
    age.textContent = element.age;
    const button = document.createElement('td');
    button.innerHTML += `<button onclick="setForm(${element.id})" type="button" class="btn btn-success mr-2">Edit</button>`;
    button.innerHTML += `<button onclick="deleteCat(${element.id})" type="button" class="btn btn-danger">Delete</button>`;

    tr.appendChild(id);
    tr.appendChild(name);
    tr.appendChild(age);
    tr.appendChild(button);
    tr.id = `C${element.id}`;

    tbody.appendChild(tr);
  });
  if (document.querySelector('#modif')) {
    document.querySelector('#modif').outerHTML = `<button id="submit" type="button" class="btn btn-primary">Envoi</button>`;
  }

  document.querySelector('#submit')
    .addEventListener('click', postChat);
};

const postChat = async () => {
  const name = document.querySelector('#name').value;
  const age = document.querySelector('#age').value;

  if (name !== '' && age !== '' && +age > 0) {
    const cat = {
      name,
      age
    };
    const options = {
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      method: 'POST',
      body: JSON.stringify(cat),
    };
    const res = await fetch(`${apiUrl}/cat`, options);
    getAllCat();
  }
};

const editChat = async (id) => {
  const name = document.querySelector('#name').value;
  const age = document.querySelector('#age').value;
  if (name !== '' && age !== '' && +age > 0) {
    const cat = {
      id,
      name,
      age
    };
    const options = {
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      method: 'PUT',
      body: JSON.stringify(cat),
    };
    const res = await fetch(`${apiUrl}/cat/${id}`, options);
    document.querySelector('#name').value = '';
    document.querySelector('#age').value = '';
    getAllCat();
  }
};

const deleteCat = async (id) => {
  const options = {
    method: 'DELETE'
  };
  const res = await fetch(`${apiUrl}/cat/${id}`, options);
  getAllCat();
};

const setForm = (id) => {
  const cat = document.querySelector(`#C${id}`);
  document.querySelector('#name').value = cat.childNodes[1].textContent;
  document.querySelector('#age').value = cat.childNodes[2].textContent;
  document.querySelector('#submit').outerHTML = `<button onclick="editChat(${id})" id="modif" type="button" class="btn btn-primary">Modifier</button>`;
};
