const cart_items = document.querySelector('#cart .cart-items');
const parentContainer = document.getElementById('EcommerceContainer');

//  displaying products
function display(id,title,url,price){
    let mainDiv=document.getElementById('music-content')
    mainDiv.innerHTML+=`
    
    <div id='album1'>
    <h3>${title}</h3>
    <div class="image-container">
        <img class="prod-images" src="${url}" alt="">
    </div>
                    <div class="prod-details">
        <span>$<span>${price}</span></span>
        <button class="shop-item-button"  type='button' id='${id}'>ADD TO CART</button>
    </div>
</div>`

}

// pagination


window.addEventListener("DOMContentLoaded",()=>{
   
    async function displayAll(){
    let product= await axios.get(`http://localhost:3000/admin/products?page=1&size=2`)
    // console.log(product)
    let page=product.data.products
    pageNumbers=+product.data.pages

    totalPages(pageNumbers)
    for(let i=0;i<page.length;i++){
        let title=page[i].title
        let url=page[i].imageUrl
        let price=page[i].price
        let id=page[i].id
        display(id,title,url,price)
    }
    document.querySelector('button.pagination').classList.add('active')
    } 
    
   displayAll()      
})



let pagination=document.getElementById('pages')

function totalPages(total){
    for(let i=1;i<=total;i++){
        pagination.innerHTML+=`
        <li><button class='btn pagination'>${i}</button></li>`
    }
    
}

pagination.addEventListener('click',(e)=>{
    
    if(e.target.classList.contains('pagination')){
        document.querySelector('button.pagination.active').classList.remove('active')
       async function addPage(){
        e.target.style='display:block'
        e.target.classList.add('active')
        document.getElementById('music-content').innerHTML=''
        let number=+e.target.textContent
        let prod= await axios.get(`http://localhost:3000/admin/products?page=${number}&size=2`)
        let page=prod.data.products
        // pageNumbers=prod.data.pages
        for(let i=0;i<page.length;i++){
        let title=page[i].title
        let url=page[i].imageUrl
        let price=page[i].price
        let id=page[i].id
        display(id,title,url,price)
    }
       }
       addPage()
    }
})

// EventListener for all buttons

parentContainer.addEventListener('click',(e)=>{
    //ADD TO CART button
    if (e.target.className=='shop-item-button'){
        
        const prodId=+e.target.id
        async function cartDb(){
            await axios.post(`http://localhost:3000/cart/post/${prodId}`)
            
           TotalCartItems()
        }
       cartDb()
      
        //notification
        const name = e.target.parentNode.parentNode.children[0].textContent
        const container = document.getElementById('container');
        console.log(container)
        const notification = document.createElement('div');
        notification.classList.add('notification');
        notification.innerHTML = `<h4>Your Product : <span>'${name}'</span> is added to the cart<h4>`;
        container.appendChild(notification);
        setTimeout(()=>{
            notification.remove();
        },2500)
    }
    if (e.target.className=='cart-btn-bottom' || e.target.className=='cart-bottom' || e.target.className=='cart-holder'){
        document.querySelector('#cart').style = "display:block;"
    }
    if (e.target.className=='cancel'){
        document.querySelector('#cart').style = "display:none;"
    }

    //PURCHASE button
    if (e.target.className=='purchase-btn'){
        let success;
        
        if (parseInt(document.querySelector('.cart-number').innerText) === 0){
            alert('You have Nothing in Cart , Add some products to purchase !');
            return
        }
        async function order(){
            let product=await axios.post('http://localhost:3000/order')
            success=product.data.success
            let orderStatus=document.getElementById('orderStatus')
            if(success){
            alert('Thanks for the purchase')
            cart_items.innerHTML = ""
            document.querySelector('.cart-number').innerText = 0
            document.querySelector('#total-value').innerText = `0`;
            
            orderStatus.innerHTML=`<h1'> Order sucessfully placed<h1>`
            
            }
            else{
                orderStatus.innerHTML=`<h1'>ORDER FAILSED<h1>`
                orderStatus.style='color:red'
            }
            setTimeout(()=>{
                orderStatus.remove();
            },3500)


         }
         order()
    
        
    }
    // remove button
    if (e.target.innerText=='REMOVE'){
       
     console.log(e.target.id)
     async function deletecartItem(){
        await axios.delete(`http://localhost:3000/cart/delete/${e.target.id}`)
        TotalCartItems() 
     }
     deletecartItem()
    
     
    }
})


// display Cart

function displayCart(ID,name,price,img_src,quantity){
    const cart_item = document.createElement('div');
    cart_item.classList.add('cart-row');

    cart_item.innerHTML = `
    <span class='cart-item cart-column'>
    <img class='cart-img' src="${img_src}" alt="">
        <span>${name}</span>
    </span>
    <span class='cart-price cart-column'>${price}</span>
    <span class='cart-quantity cart-column'>
        ${quantity}
        <button id=${ID}>REMOVE</button>
    </span>`
     cart_items.appendChild(cart_item)
}

function TotalCartItems(){
    document.querySelector('#cart .cart-items').innerHTML=''
    async function cart_products(){
        let total=0;
        let cartProduct= await axios.get('http://localhost:3000/cart')
        // console.log(cartProduct)
   
        for(let i=0;i<cartProduct.data.length;i++){
            let e=cartProduct.data[i]
            total+=parseFloat(e.price)*parseInt(e.cartItem.quantity)
            // console.log(e.cartItem.quantity)
            displayCart(e.id,e.title,e.price,e.imageUrl,e.cartItem.quantity)
        }
        document.querySelector('#total-value').innerText=total
        document.querySelector('.cart-number').innerText=cartProduct.data.length
    }

    cart_products()
}


window.addEventListener('DOMContentLoaded',()=>{
    TotalCartItems()
})


