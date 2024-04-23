import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js'
import {getDatabase, ref, onValue, child, get} from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js'

import { addToOrder, mealStructure, orderCardDeatails, totalPriceUpdate} from './appFunctions.js'

///      APP IS PREPARED FOR ADDING MEAL TO DB 

/// import addItemToMenu from './addItemToMenu.js'

/// addItemToMenu(id,name,price,emoji,[ingredients])

/// EXAMPLE:  push(orderingappDB,addItemToMenu(4,'Coffie',6,'☕️',['latte','americano']))
///                  database      function                 values

////

/// database config
const firebaseConfig = {
  databaseURL : 'https://ordering-app-scrimba-default-rtdb.europe-west1.firebasedatabase.app/'
}

/// database variables
const app = initializeApp(firebaseConfig)
const database = getDatabase(app)
const orderingappDB = ref(database, 'orderingapp')

/// app variables
const mainMenu = document.getElementById('main-Menu')
const orderFinal = document.getElementById('order-Final')
const totalPrice = document.getElementById('total-price')
const orderText = document.getElementById('order-text')
const orderPaymentPopup = document.getElementById('order-Payment')
let order = []


onValue(orderingappDB, function(snapshot){
    const menuMeal = Object.entries(snapshot.val())
    menuMeal.forEach(meal => renderMeal(meal))

    document.addEventListener('click', (e)=>{
        if(e.target.dataset.uuid){      
            const dbRef = ref(getDatabase(app)) /// creating reference to database
            get(child(dbRef, `orderingapp/${e.target.dataset.uuid}`)).then((snapshot) => {   /// sending a request for data
              if (snapshot.exists()) {
                let newid = Math.floor(Math.random() * 10000000000) /// Yeah, i know it's not the best way to make a unique id but the npm uuid it's no longer free as i know
                    let newMeal = {...snapshot.val(), /// creating a copy of snapchot.val() and adding a "unique" id
                                    OrderId: newid /// id
                                  }
                    order.unshift(newMeal)
                    renderOrderFinal(order)
              } else {
                console.log("No meal in database!")
              }
            }).catch((error) => {
              console.error(`Error: ${error}`)
            })
        }
        else if(e.target.dataset.mealid){
            const updatedOrder = order.filter(meal => meal.OrderId != e.target.dataset.mealid)
            order = []
            order = updatedOrder
            renderOrderFinal()
            
        }  
        else if(e.target.dataset.compbtn){
            e.preventDefault()
            orderPaymentPopup.style.visibility = 'visible'
            orderPaymentPopup.innerHTML = orderCardDeatails()
        } 
    })

})

function renderMeal(meal){
    mainMenu.innerHTML += mealStructure(meal)
}

function renderOrderFinal(){
    let orderPrice = 0
    orderFinal.innerHTML = ''
    order.forEach(item => {
        orderFinal.innerHTML += addToOrder(item)
        orderPrice += item.price
    })
    if(orderPrice != 0){
        totalPrice.style.display = 'block'
        orderText.style.display = 'block'
        totalPrice.innerHTML = totalPriceUpdate(orderPrice)
    }
    else{
        totalPrice.style.display = 'none'
        orderText.style.display = 'none'
    }

}
