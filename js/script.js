const url = "https://crudcrud.com/api/b1473c93d4d74d889acc72aeadf42e28/users";

const textInput = document.getElementById("textInput");
const dateInput = document.getElementById("dateInput");
const addButtons = document.getElementById("add");
// const deleteButtons = document.getElementById("delete");

const postUsers = async () => {
	const user = {
		text: textInput.value,
		date: dateInput.value,
		completeds: false,
	};
	try {
		await fetch(url, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(user),
		});
		getUsers();
		renderUsers();
	} catch (e) {
		console.error(e);
	}
};

const getUsers = async () => {
	try {
		const res = await fetch(url);
		const data = await res.json();
		renderUsers(data);
	} catch (e) {
		console.error(e);
	}
};

const renderUsers = async () => {
	try {
    const result = await getUsers();
		const resultList = await result.map((item, index) => {
			return `
				<div class="list">
					<p>${item.text}</p>
					<p>${item.date}</p>
					<button onclick="completedsUsers(() => ${item._id})">COMPLETEDS</button>
					<button onclick="deleteUsers(${item._id}, ${index})">Delete</button>
				</div>
			`;
		});
		const getHtml =  document.getElementById("todoList");
		getHtml.innerHTML = await resultList.join("");
	} catch (e) {
		console.error(e);
	}
	// postUsers();
};


renderUsers();

const completedsUsers = async (id) => {
  try {
    await fetch(`${url}/${id}`, {
      method: 'PUT',
      headers: {
        "Content-type" : "application/json",
      },
      body: JSON.stringify({completeds: true}), 
    })
  } catch(e) {
    console.error(e);
  }
  renderUsers()
}

// ...

// renderUsers([]); // Добавьте пустой массив при инициализации

// const deleteUsers = async (id) => {
// 	try {
//     const response = await getUsers();
//     const filterUsers = await response.find((item) => item.id === id);
// 		await fetch(`${url}/${filterUsers._id}`, {
// 			// Исправьте _id на id
// 			method: "DELETE",
// 			headers: {
// 				"Content-Type": "application/json",
// 			},
// 		});
// 	} catch (e) {
//     console.error(e);
// 	}
//   renderUsers();
// };

// deleteUsers()

// ...

const deleteUsers = async (id) => {
  try {
    await fetch(`${url}/${id}`, {
      method: 'DELETE',
      headers: {
        "Content-Type": "application/json",
      },
    });
    // renderUsers();
		getUsers();
  } catch(e) {
    console.error(e);
  }
}
// deleteUsers();

addButtons.addEventListener("click", () => postUsers());
