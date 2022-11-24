
let pages=document.getElementById('web-page')
let add_product=document.getElementById('add-product')
let products=document.getElementById('show-products')
let product=document.getElementById('productDiv')
let pLink=document.getElementById('productLink')
let aLink=document.getElementById('addProductLink')
add_product.addEventListener('click',addProduct)
products.addEventListener('click',showProducts)
pages.addEventListener('click',change)
let editId=0
function change(e){
  
    let head=e.target.textContent
    if(head=='products'){
        products.style="display:block;"
        add_product.style="display:none;"
        pLink.classList.add('active')
        aLink.classList.remove('active')
    }
    else if(head=='Add Product'){
        products.style="display:none;"
        add_product.style="display:block;"
        pLink.classList.remove('active')
        aLink.classList.add('active')
        
    }
}

function display(id,title,url,price){
    product.innerHTML+=` <div class="card product-item">
    <header class="card__header">
        <h1 class="product__title">${title}</h1>
    </header>
    <div class="card__image">
        <img src="${url}" alt="Book">
    </div>
    <div class="card__content">
        <h2 class="product__price">$${price}</h2>
    </div>
    <div class="card__actions" id="${id}">
        <button class="btn">delete</button>
        <button class="btn" >edit</button>
    </div>
</div>`
}
let http='http://localhost:3000/admin'
window.addEventListener("DOMContentLoaded",()=>{
   async function displayAll(){
    let product= await axios.get(`${http}/products`)
    for(let i=0;i<product.data.length;i++){
        let title=product.data[i].title
        let url=product.data[i].imageUrl
        let price=product.data[i].price
        let id=product.data[i].id
        display(id,title,url,price)
    }
   } 
   displayAll()      
})
function addProduct(e){
 e.preventDefault()
 let title=document.getElementById('title').value
 let url=document.getElementById('Url').value
 let price=document.getElementById('price').value
 let id;
 let obj={
    title:title,
    price:price,
    imageUrl:url
 }

if(e.target.type=='submit'){
    let product;
    async function add(){
        if(editId!=0){
        product=await axios.put(`${http}/edit/${editId}`,obj)
        editId=0
        }
        else{
        let product=await axios.post(`${http}/add-product`,obj)
        id=product.data.id
        }
    }
    add()
    display(id,title,url,price)
    document.getElementById('title').value=''
    document.getElementById('Url').value=''
    document.getElementById('price').value=''
}
}

function showProducts(e){
    e.preventDefault()
    let btn=e.target.textContent
    let list=e.target.parentElement.parentElement
   let ID=e.target.parentElement.id;
    if(btn=='delete'){
        async function Detele(){
           await axios.delete(`${http}/delete/${ID}`)
        }
        Detele()
        product.removeChild(list)
    }
    else if(btn=='edit'){
        editId=ID
        // console.log(ID)
        async function Edit(){
        let product=await axios.get(`${http}/products/${ID}`)
        // console.log(product.data)
        document.getElementById('title').value=product.data[0].title
        document.getElementById('Url').value=product.data[0].imageUrl
        document.getElementById('price').value=product.data[0].price
        products.style="display:none;"
        add_product.style="display:block;"
        pLink.classList.remove('active')
        aLink.classList.remove('active')
        }
        Edit()
        product.removeChild(list)
    }
    
   

}