const cart_items = document.querySelector('#cart .cart-items');
const parentContainer = document.getElementById('EcommerceContainer');

function displayCart(ID,name,price,img_src){
    const cart_item = document.createElement('div');
    cart_item.classList.add('cart-row');

    // console.log(cart_item)
    cart_item.innerHTML = `
    <span class='cart-item cart-column'>
    <img class='cart-img' src="${img_src}" alt="">
        <span>${name}</span>
</span>
<span class='cart-price cart-column'>${price}</span>
<span class='cart-quantity cart-column'>
    <input type="text" value="1">
    <input type='hidden' value='${price}'>
    <button id=${ID}>REMOVE</button>
</span>`
     cart_items.appendChild(cart_item)
}


window.addEventListener('DOMContentLoaded',()=>{
    async function cart_products(){
        let total=0;
        let cartProduct= await axios.get('http://localhost:3000/cart')
        // console.log(cartProduct.data.length)
        for(let i=0;i<cartProduct.data.length;i++){
            let e=cartProduct.data[i]
            total+=parseFloat(e.price)
            displayCart(e.id,e.title,e.price,e.imageUrl)
        }
        document.querySelector('#total-value').innerText=total
        document.querySelector('.cart-number').innerText=cartProduct.data.length
    }

    cart_products()
})

parentContainer.addEventListener('click',(e)=>{

    if (e.target.className=='shop-item-button'){
        const id = e.target.parentNode.parentNode.id
        const name = document.querySelector(`#${id} h3`).innerText;
        const img_src = document.querySelector(`#${id} img`).src;
        const price = e.target.parentNode.firstElementChild.firstElementChild.innerText;
        let total_cart_price = document.querySelector('#total-value').innerText;
        
        if (document.querySelector(`#in-cart-${id}`)){
            alert('This item is already added to the cart');
            return
        }
        document.querySelector('.cart-number').innerText = parseInt(document.querySelector('.cart-number').innerText)+1
        
        total_cart_price = parseFloat(total_cart_price) + parseFloat(price)
        total_cart_price = total_cart_price.toFixed(2)
        document.querySelector('#total-value').innerText = `${total_cart_price}`;
        let ID=0
        console.log(name,img_src,price)
        async function cartDb(){
            let product= await axios.post('http://localhost:3000/cart/post',{
                title:name,
                price:price,
                imageUrl:img_src
            })
           
            ID=product.data.id
            displayCart(ID,name,price,img_src)
        }
       cartDb()
      

        const container = document.getElementById('container');
        const notification = document.createElement('div');
        notification.classList.add('notification');
        notification.innerHTML = `<h4>Your Product : <span>${name}</span> is added to the cart<h4>`;
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
    if (e.target.className=='purchase-btn'){
        if (parseInt(document.querySelector('.cart-number').innerText) === 0){
            alert('You have Nothing in Cart , Add some products to purchase !');
            return
        }
        alert('Thanks for the purchase')
        cart_items.innerHTML = ""
        document.querySelector('.cart-number').innerText = 0
        document.querySelector('#total-value').innerText = `0`;
    }

    if (e.target.innerText=='REMOVE'){
     console.log(e.target.id)
     async function deletecartItem(){
        await axios.delete(`http://localhost:3000/cart/delete/${e.target.id}`)
     }
     deletecartItem()
        let total_cart_price = document.querySelector('#total-value').innerText;

        total_cart_price = parseFloat(total_cart_price).toFixed(2) - parseFloat(e.target.parentElement.children[1].value).toFixed(2) ;
        document.querySelector('.cart-number').innerText = parseInt(document.querySelector('.cart-number').innerText)-1
        document.querySelector('#total-value').innerText = `${total_cart_price.toFixed(2)}`
        e.target.parentNode.parentNode.remove()
    }
})

function display(title,url,price){
    let mainDiv=document.getElementById('music-content')
    mainDiv.innerHTML+=`<div id='album1'>
    <h3>${title}</h3>
    <div class="image-container">
        <img class="prod-images" src="${url}" alt="">
    </div>
                    <div class="prod-details">
        <span>$<span>${price}</span></span>
        <button class="shop-item-button"  type='button'>ADD TO CART</button>
    </div>
</div>`

}

window.addEventListener("DOMContentLoaded",()=>{
   
    async function addItems(){ 
    let prod= await axios.get("http://localhost:3000/admin/products")
    
    for(var i=0;i<prod.data.length;i++){
         let e=prod.data[i]
        //  console.log(e.title)
         display(e.title,e.imageUrl,e.price)
    } 
    }
    addItems()
})

