let products = [
  {
    id: 1,
    name: "Laptop Dell XPS 13",
    price: 2850000,
    stock: 12,
  },
  {
    id: 2,
    name: "Chuột Logitech MX Master",
    price: 1850000,
    stock: 12,
  },
  {
    id: 3,
    name: "Bàn phím Keychron K2",
    price: 2200000,
    stock: 12,
  },
  {
    id: 4,
    name: "Áo thun Basic Uniqlo",
    price: 390000,
    stock: 12,
  },
  {
    id: 5,
    name: "Cà phê rang xay 500g",
    price: 185000,
    stock: 12,
  },
];

let saveData = () => {
  localStorage.setItem("product", JSON.stringify(products));
};

let getData = () => {
  let data = localStorage.getItem("product");
  if (data) {
    products = JSON.parse(data);
  }
};

let renderData = () => {
  let listProduct = document.getElementById("tbody");
  getData();
  listProduct.innerHTML = "";

  products.forEach((product, index) => {
    let tr = document.createElement("tr");
    tr.innerHTML = `
        <td>${index + 1}</td>
        <td>${product.name}</td>
        <td>${product.price}</td>
        <td>${product.stock}</td>
        <td>
            <button class="btn-edit btn-sm btn" onclick="findUpdate(${product.id})">Sửa</button>
            <button class="btn-del btn-sm btn" onclick="deleteData(${product.id})">Xóa</button>
        </td>
    `;

    listProduct.appendChild(tr);
  });

  saveData();
};

renderData();
let btnSubmit = document.getElementById("btnSubmit");
let inputName = document.getElementById("iName");
let inputPrice = document.getElementById("iPrice");
let inputStock = document.getElementById("iStock");

let createData = () => {
  btnSubmit.addEventListener("click", () => {
    let name = inputName.value.trim();
    if (name == "") {
      alert("Vui lòng nhập tên sản phẩm");
      return;
    }
    if (products.some((p) => p.name.toLowerCase() === name.toLowerCase())) {
      return alert("Sản phẩm đã tồn tại");
    }

    let price = inputPrice.value.trim();

    if (price <= 0) {
      alert("Giá sản phẩm phải là số dương lớn hơn 0");
      return;
    }
    let stock = inputStock.value;

    if (stock < 0) {
      alert("Tồn kho phải là số nguyên lớn hơn hoặc bằng 0");
      return;
    }

    if (stock == "") {
      stock = 0;
    }

    let newProduct = {
      id: Date.now(),
      name: name,
      price: price,
      stock: stock,
    };

    products.push(newProduct);

    saveData();
    renderData();

    inputName.value = "";
    inputPrice.value = "";
    inputStock.value = "";

    alert("Đã thêm sản phẩm thành công");
    return;
  });
};

createData();

let editId = null;
let btnUpdate = document.getElementById("btn-update");
let btnCancel = document.getElementById("btn-cancel");

let findUpdate = (id) => {
  btnSubmit.style.display = "none";
  btnUpdate.style.display = "inline-block";
  btnCancel.style.display = "inline-block";

  let findId = products.find((product) => {
    return product.id == id;
  });

  inputName.value = findId.name;
  inputPrice.value = findId.price;
  inputStock.value = findId.stock;

  editId = id;
};

let updateData = () => {
  let indexPro = products.findIndex((product) => {
    return product.id == editId;
  });

  products[indexPro].name = inputName.value;
  products[indexPro].price = inputPrice.value;
  products[indexPro].stock = inputStock.value;

  saveData();
  renderData();

  inputName.value = "";
  inputPrice.value = "";
  inputStock.value = "";

  btnSubmit.style.display = "inline-block";
  btnUpdate.style.display = "none";
  btnCancel.style.display = "none";

  editId = null;
};

btnCancel.addEventListener("click", () => {
  inputName.value = "";
  inputPrice.value = "";
  inputStock.value = "";

  btnSubmit.style.display = "inline-block";
  btnUpdate.style.display = "none";
  btnCancel.style.display = "none";
});
btnUpdate.addEventListener("click", updateData);

const deleteData = (id) => {
  if (confirm("Bạn có chắc chắn muốn xóa?")) {
    products = products.filter((p) => p.id !== id);
    saveData();
    renderData();
  }
};

let searchName = document.getElementById("searchInput");

let searchProductByName = () => {
  let searchTerm = searchName.value.toLowerCase().trim();

  products = products.filter((pro) => {
    return pro.name.toLowerCase().trim().includes(searchTerm);
  });
  renderData();
};

searchName.addEventListener("keyup", searchProductByName);

let sortSelect = document.getElementById("sortSelect");

let sortBy = () => {
  if (sortSelect.value == "name_asc") {
    let sort = products.sort();
    console.log(sort);
    saveData();
    renderData();
  } else if (sortSelect.value == "price_asc") {
    let sort = products.sort((a, b) => {
      return a.price - b.price;
    });
    console.log(sort);
    saveData();
    renderData();
  } else if (sortSelect.value == "price_desc") {
    let sort = products.sort((a, b) => {
      return b.price - a.price;
    });
    console.log(sort);
    saveData();
    renderData();
  } else if (sortSelect.value == "name_desc") {
    let sort = products.sort().reverse();
    console.log(sort);
    saveData();
    renderData();
  }
};

sortSelect.addEventListener("change", sortBy);
