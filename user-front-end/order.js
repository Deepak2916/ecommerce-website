let ordersdiv=document.getElementById('orderId')
function displayOrders(title,quantity,price){
    let total=0;
    total+=price
    ordersdiv.innerHTML+=`
    <ul class="orderlist" id='ulid'>
    <li>${title}(${quantity})</li>
   
    <li>${price}/-</li>
    </ul>
    <hr class='line'>
    `
}


async function Orders(){
    let orders=await axios.get('http://localhost:3000/order')
   
    
    orders.data.forEach(order => {
        let total=0;
        let id=order.id
        ordersdiv.innerHTML+=`
        <hr class='main-line'>
        <h3>Order Id #${id}<h3>`
        for(let items of order.products){
            let price=items.orderItems.quantity*items.price
            total+=price
            displayOrders(items.title,items.orderItems.quantity,price)
        }
        ordersdiv.innerHTML+=`
        <ul class="orderlist" id='ulid'>
        <li>Total</li>
       
        <li>${total}/-</li>
        </ul>
        <hr class='line'>`
      
    });
}
Orders()