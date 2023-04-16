let title = document.getElementById('title');
let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let ads = document.getElementById('ads');
let discount = document.getElementById('discount');
let total = document.getElementById('total');
let count = document.getElementById('count');
let category = document.getElementById('category');
let submit = document.getElementById('submit');

let mood = 'Create';
let clicked = 'Create'
let tmp;
//getTotal
const getTotal=()=>{
    if(price.value != ''){
        let result = (+price.value + +taxes.value + +ads.value)- +discount.value;
        total.innerHTML = result;
        total.style.background='#040';
    }else{
        total.innerHTML = '';
        total.style.background='#bf0000';
        
    }
}

//saveLocalStorage
let data;
if(localStorage.product != null){
    data = JSON.parse(localStorage.product)
}else{
    data = [];
}
//createProduct
const createProduct = () =>{
    let newProduct = {
        title:title.value.toLowerCase(),
        price:price.value,
        taxes:taxes.value,
        ads:ads.value,
        discount:discount.value,
        total:total.innerHTML,
        count:count.value,
        category:category.value.toLowerCase(), 
    }
    if(title.value == '' || price.value == '' || taxes.value == ''){
        toastText1.innerHTML = "Error";
        toastText2.innerHTML = "Please make sure all fields are filled out.";
        toastnote();
    }
    else{
        if(mood === 'Create'){
            if(newProduct.count > 1){
                for(let i = 0 ; i < newProduct.count;i++){
                    data.push(newProduct);
                }
            }else{
                data.push(newProduct);
            }
        }
        else{
            data[tmp] = newProduct;
            mood = 'Create';
            submit.innerHTML ='Create';
            count.style.display = "block";
        }
    }
    //save localstorage
    localStorage.setItem('product', JSON.stringify(data))
    clearInputs(); 
    readData();
    toastText.innerHTML = "Success"
    toastnote();
}

//clearInputs
const clearInputs = () =>{
    title.value = '';
    price.value= '';
    taxes.value= '';
    ads.value= '';
    discount.value= '';
    total.innerHTML= '';
    count.value= '';
    category.value= '';
}


//readData
const readData = ()=>{
    getTotal();
    let table = '';
    for (let i = 0; i < data.length; i++) {
        table += `
        <tr>
            <td>${i}</td>
            <td>${data[i].title}</td>
            <td>${data[i].price}</td>
            <td>${data[i].taxes}</td>
            <td>${data[i].ads}</td>
            <td>${data[i].discount}</td>
            <td>${data[i].total}</td>
            <td>${data[i].category}</td>
            <td><button onclick="updateData(${i})" id="update">Update</button></td>
            <td><button onclick="deleteData(${i})" id="delete">Delete</button></td>
        </tr>
        ` 
    }
    document.getElementById('tbody').innerHTML = table;
    let btnDelete = document.getElementById('deleteAll')
    if(data.length > 0){
        btnDelete.innerHTML = `
        <td><button onclick="deleteAll()" id="delete">Delete All (${data.length})</button></td>
        `
    }else{
        btnDelete.innerHTML = '';
    }
}
readData();

//delete
const deleteData=(i)=>{
    data.splice(i,1);
    localStorage.product = JSON.stringify(data);
    readData();
}

//deleteAll
const deleteAll =() =>{
    localStorage.clear();
    data.splice(0);
    readData();
}


//update
const updateData=(i)=>{
    title.value = data[i].title;
    price.value = data[i].price;
    taxes.value = data[i].taxes;
    ads.value = data[i].ads;
    discount.value = data[i].discount;
    getTotal();
    count.style.display = 'none';
    category.value = data[i].category;
    submit.innerHTML = "Update";
    mood = 'Update';
    tmp = i;
    scroll({top:0, behavior:'smooth'})
}


//search
let searchMood = 'title';
const getSearchMood = (id)=>{
    let search = document.getElementById('search');
    if(id == 'searchTitle'){
        searchMood = 'title';
        search.placeholder = 'Search By Title'
    }else{
        searchMood = 'category';
        search.placeholder = 'Search By Category'
    }
    search.focus();

}

//search data
const SearchData = (value)=>{
    let table = '';
    if(searchMood == 'title'){
        for(let i = 0; i < data.length; i++){
            if(data[i].title.includes(value.toLowerCase())){
                table += `
                <tr>
                    <td>${i}</td>
                    <td>${data[i].title}</td>
                    <td>${data[i].price}</td>
                    <td>${data[i].taxes}</td>
                    <td>${data[i].ads}</td>
                    <td>${data[i].discount}</td>
                    <td>${data[i].total}</td>
                    <td>${data[i].category}</td>
                    <td><button onclick="updateData(${i})" id="update">Update</button></td>
                    <td><button onclick="deleteData(${i})" id="delete">Delete</button></td>
                </tr>
                ` 
            }
        }
    }

    else{
        for(let i = 0; i < data.length; i++){
            if(data[i].category.includes(value.toLowerCase())){
                table += `
                <tr>
                    <td>${i}</td>
                    <td>${data[i].title}</td>
                    <td>${data[i].price}</td>
                    <td>${data[i].taxes}</td>
                    <td>${data[i].ads}</td>
                    <td>${data[i].discount}</td>
                    <td>${data[i].total}</td>
                    <td>${data[i].category}</td>
                    <td><button onclick="updateData(${i})" id="update">Update</button></td>
                    <td><button onclick="deleteData(${i})" id="delete">Delete</button></td>
                </tr>
                ` 
            }
        }
    }
    document.getElementById('tbody').innerHTML = table;
}








/****************** */
const button = document.querySelector("button"),
  toast = document.querySelector(".toast"),
  closeIcon = document.querySelector(".close"),
  progress = document.querySelector(".progress"),
  toastText1 = document.querySelector("#text-1"),
  toastText2 = document.querySelector("#text-2");

let timer1, timer2;

const toastnote = ()=>{
    button.addEventListener("click", () => {
        toast.style.display = "block";
        toast.classList.add("active");
        progress.classList.add("active");
        
      
        timer1 = setTimeout(() => {
          toast.classList.remove("active");
          setTimeout(() => {
            toast.style.display = "none";
          }, 300); // set display to none after 300ms
        }, 5000);
      
        timer2 = setTimeout(() => {
          progress.classList.remove("active");
        }, 5300);
      });
      
      closeIcon.addEventListener("click", () => {
        toast.classList.remove("active");
      
        setTimeout(() => {
          progress.classList.remove("active");
        }, 300);
      
        clearTimeout(timer1);
        clearTimeout(timer2);
      });
}
