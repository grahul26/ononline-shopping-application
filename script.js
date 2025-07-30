// const { info } = require("autoprefixer");

//Elements  references
const productsContainer=document.getElementById('productsContainer')

const cartContainer=document.getElementById('cartContainer')

const feedbackElement=document.getElementById('feedback')


const clearCartBtn=document.getElementById('clearCart')


const sortByPriceBtn=document.getElementById('sortByPrice')

// const totalPrice=document.getElementById('totalPrice')

//Default products
 
const products = [
  {
    id: 1,
    name: 'Laptop',
    price: 50000,
  },
  {
    id: 2,
    name: 'Phone',
    price: 20000,
  },
  {
    id: 3,
    name: 'Tablet',
    price: 15000,
  },
  {
    id: 4,
    name: 'Smartwatch',
    price: 8000,
  },
  {
    id: 5,
    name: 'Headphones',
    price: 3000,
  },];

//empty cart
  const cart=[

  ]


products.forEach(function(product){

// Logic 1

    // <div class="Product-row">

    //         <p>Laptop - Rs. 50000</p>
    //         <button>Add to cart</button>

    // </div>
  //Logic 2  
    // const productRow=`
    // <div class="Product-row">
    //     <p>${product.name} - Rs ${product.price}</p>
    //     <button>Add to card</button>
    // </div>`;

    // productsContainer.insertAdjacentHTML('beforeend',productRow)


// Logic 3

const divElement=document.createElement('div')

divElement.className='Product-row'
divElement.innerHTML=`
<p>${product.name} - Rs ${product.price}</p>
    <button onclick="addTocart(${product.id})">Add to card</button>`

    productsContainer.appendChild(divElement)

});

// add to cart

function addTocart(id){

  // check if the product is already available in the cart.
  const isProductAvaible=cart.some((product) =>product.id===id);
  ;

 

  if (isProductAvaible){
    updateUserFeedback(`Item already added to the cart`,'error')

    
    
    return;

  }

    console.log('add to cart clicking',id);

    const productToAdd=products.find(function(product){

      return product.id===id;

    })
    // console.log(productAdd)
    cart.push(productToAdd)
    console.log(cart)

    renderCartDetails();

    updateUserFeedback(`${productToAdd.name} is added to the cart`,'success')

}

function renderCartDetails(){
  cartContainer.innerHTML='';
  cart.forEach(function(product){
   const {id , name, price}=product
   
    const cartItemRow=`
    <div class="Product-row">
            <p>${name} - Rs ${price}</p>
            <button onclick="removeFromCart(${id})">Remove</button>
        </div> 

    `

    cartContainer.insertAdjacentHTML('beforeend',cartItemRow)

  });

  // let totalPrice=0

  console.log('cart',cart);

  // for(let i=0;i<cart.length;i++){
  //   totalPrice=totalPrice+cart[i].price;


  const totalPrice=cart.reduce(function(acc,prod){

    return acc+prod.price
  },0)
  document.getElementById('totalPrice').textContent=`Rs. ${totalPrice}`;

}
function removeFromCart(id){
  // const updatedCart=cart.filter((product)=>{
  //   return product.id!==id
  // });
  // console.log(updatedCart)
   const product=cart.find((product)=>product.id===id);

  const productIndex=cart.findIndex((product)=>product.id===id)
  cart.splice(productIndex,1);
  // console.log(updateCart);
  // cart=updateCart;
 
  updateUserFeedback(`${product.name} is removed form the cart`,'error')
  renderCartDetails();

}

let timmerId;

function updateUserFeedback(msg,type){

  clearTimeout(timmerId)

  feedbackElement.style.display='block';

  // type - sucess(green),error(red)
  if(type==='success'){
    feedbackElement.style.backgroundColor='green'
  }else{
    feedbackElement.style.backgroundColor='red'
  }


  feedbackElement.textContent=msg;

  timmerId=setTimeout(function(){

    feedbackElement.style.display='none';

  },3000)
}

clearCartBtn.addEventListener('click',()=>{
  console.log("Clicking")
console.log('cart',cart);
cart.length=0;
console.log(cart);
  renderCartDetails()

  updateUserFeedback('Cart is cleared','success')

})

sortByPriceBtn.addEventListener('click',()=>{
  cart.sort(function(item1, item2){

    return item1.price-item2.price;

  });

  renderCartDetails();

})


//destructuring

// const {name, price}=products   

//const {name, price,...rest}=products   using like this also

// console.log(price)
// console.log(name)