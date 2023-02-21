let title = document.getElementById('title');
let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let ads = document.getElementById('ads');
let total = document.getElementById('total');
let discount = document.getElementById('discount');
let count = document.getElementById('count');
let category = document.getElementById('category');
let submit = document.getElementById('submit');
let mood = 'create';
let temp;

// get total
function getTotal(){
    if(price.value != '' && taxes.value != '' && ads.value != ''){
        let result = (+price.value + +taxes.value + +ads.value) 
        - +discount.value;
        total.innerHTML = result;
    }else{
        total.innerHTML = '';
    }
}


  // create product
  let productData;
  if(localStorage.products != null){
    productData = JSON.parse(localStorage.products)
  }else{
    productData = [];
  }

  submit.onclick = function(){
    let newProduct = {
        title: title.value.toLowerCase(),
        price: price.value,
        taxes: taxes.value,
        ads: ads.value,
        discount: discount.value,
        total: total.innerHTML,
        count: count.value,
        category: category.value.toLowerCase(),
    }

    // create data
    if(title.value != '' && price.value != '' 
    && category.value != '' && newProduct.count < 100){
      if(mood === 'create'){
            if(newProduct.count > 1){
              for(let i = 0; i < newProduct.count; i++){
                productData.push(newProduct);
              }
              }else{
                productData.push(newProduct);
              }
      }else{
          productData[temp] = newProduct;
          mood = 'create';
          submit.innerHTML = 'Create'
          count.style.display = 'block'
      }
    clearData()
    }   

  



    // save data to local storage
    localStorage.setItem('products', JSON.stringify(productData))

    showData()
  }


  // clear inputs
  function clearData(){
    title.value = '';
    price.value = '';
    taxes.value = '';
    ads.value = '';
    discount.value = '';
    count.value = '';
    category.value = '';
    total.innerHTML = '';

  }


  // read data
  function showData(){
    getTotal()
    let table = '';   
    for(let i = 0; i < productData.length; i++){
        table += `
        <tr>
            <td>${i + 1}</td>
            <td>${productData[i].title}</td>
            <td>${productData[i].price}</td>
            <td>${productData[i].taxes}</td>
            <td>${productData[i].ads}</td>
            <td>${productData[i].discount}</td>
            <td>${productData[i].total}</td>
            <td>${productData[i].category}</td>
            <td><button onclick="updateData(${i})" id="update">Update</button></td>
            <td><button onclick="deleteData(${i})" id="delete">Delete</button></td>
        </tr>
        `;
  }

  document.getElementById('tbody').innerHTML = table; 
  let deleteBtn = document.getElementById('deletedata');
  if(productData.length > 0){
    deleteBtn.innerHTML = `
    <button onclick="deleteAll()">Delete All (${productData.length})</button>
    `
  }else{
    deleteBtn.innerHTML = '';
  }

}
showData()




// delete data
function deleteData(i){
    productData.splice(i, 1);
    localStorage.products = JSON.stringify(productData);
    showData()
}


function deleteAll(){
  localStorage.clear()
  productData.splice(0)
  showData()
}




// update data
function updateData(i){
  title.value = productData[i].title;
  price.value = productData[i].price;
  taxes.value = productData[i].taxes;
  discount.value = productData[i].discount;
  category.value = productData[i].category;
  ads.value = productData[i].ads;
  count.style.display = 'none';
  submit.innerHTML = 'Update';
  mood = 'update'
  temp = i;
  getTotal()

  scroll({
    top:0,
    behavior: 'smooth',
  })

}




// search
let searchMood = 'title';

function getSearchMood(id){
  let search = document.getElementById('search');
  if(id == 'searchTitle'){
    searchMood = 'title';

  }else{
    searchMood = 'category';
  }
  search.placeholder = 'Search by '+ searchMood;
  search.focus()
  search.value = '';
  showData()
}


function searchData(value){
  let table = '';
  for(let i = 0; i < productData.length; i++ ){

    if(searchMood == 'title'){
            if(productData[i].title.includes(value.toLowerCase())){
              table += 
                  `<tr>
                      <td>${i}</td>
                      <td>${productData[i].title}</td>
                      <td>${productData[i].price}</td>
                      <td>${productData[i].taxes}</td>
                      <td>${productData[i].ads}</td>
                      <td>${productData[i].discount}</td>
                      <td>${productData[i].total}</td>
                      <td>${productData[i].category}</td>
                      <td><button onclick="updateData(${i})" id="update">Update</button></td>
                      <td><button onclick="deleteData(${i})" id="delete">Delete</button></td>
                  </tr>`;

            }
        


    }else{
        if(productData[i].category.includes(value.toLowerCase())){
          table += 
              `<tr>
                  <td>${i}</td>
                  <td>${productData[i].title}</td>
                  <td>${productData[i].price}</td>
                  <td>${productData[i].taxes}</td>
                  <td>${productData[i].ads}</td>
                  <td>${productData[i].discount}</td>
                  <td>${productData[i].total}</td>
                  <td>${productData[i].category}</td>
                  <td><button onclick="updateData(${i})" id="update">Update</button></td>
                  <td><button onclick="deleteData(${i})" id="delete">Delete</button></td>
              </tr>`;

        }
    
    }
  }
    document.getElementById('tbody').innerHTML = table; 

}