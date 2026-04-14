let passwords = JSON.parse(localStorage.getItem("passwords")) || [];

// Load on refresh
displayPasswords();

function addPassword() {
  let title = document.getElementById("title").value;
  let password = document.getElementById("password").value;

  if (title === "" || password === "") {
    alert("Please fill all fields");
    return;
  }

  passwords.push({ title, password });
  saveToLocal();
  displayPasswords();

  document.getElementById("title").value = "";
  document.getElementById("password").value = "";
}

function displayPasswords(data = passwords) {
  let list = document.getElementById("list");
  list.innerHTML = "";

  data.forEach((item, index) => {
    list.innerHTML += `
      <div class="item">
        <span>${item.title}: ${item.password}</span>
        <div>
          <button onclick="editPassword(${index})">Edit</button>
          <button onclick="deletePassword(${index})">Delete</button>
        </div>
      </div>
    `;
  });
}

function deletePassword(index) {
  passwords.splice(index, 1);
  saveToLocal();
  displayPasswords();
}

function editPassword(index) {
  let newTitle = prompt("Enter new title", passwords[index].title);
  let newPassword = prompt("Enter new password", passwords[index].password);

  if (newTitle && newPassword) {
    passwords[index] = { title: newTitle, password: newPassword };
    saveToLocal();
    displayPasswords();
  }
}

function searchPassword() {
  let query = document.getElementById("search").value.toLowerCase();

  let filtered = passwords.filter(item =>
    item.title.toLowerCase().includes(query)
  );

  displayPasswords(filtered);
}

function saveToLocal() {
  localStorage.setItem("passwords", JSON.stringify(passwords));
}