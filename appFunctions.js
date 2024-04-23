function addItemToMenu(...data){
    return {
        id: data[0],
        name:data[1],
        price:data[2],
        emoji:data[3],
        ingredients:data[4]
    }
}

function addToOrder(meal){
    const {id,name,price,OrderId} = meal
    return `
            <div class="orderContainer">
                <div class="order-name">
                    <p>${name}</p>
                    <p id="remove-btn" data-mealid="${OrderId}">remove</p>
                </div>
                <div class='order-price'>
                    <p>$${price}</p>
                </div>
            </div>
    `
}

function mealStructure(meal){
    const {emoji,ingredients,name,price} = meal[1]
    return  `<div class="mealContainer">
                <div class="meal-img">
                    <p>${emoji}</p>
                 </div>
                 <div class="mealInfo">
                    <div>
                        <h2>${name}</h2>
                        <p class="meal-ingr">${ingredients.join(", ")}</p>
                    </div>
                        <p class="meal-price">$${price}</p>
                 </div>
                 <div class="mealADD" ">
                    <i class="icon-plus-squared-alt" data-uuid="${meal[0]}"></i>
                 </div>
                 </div>
                 `
}

function orderCardDeatails(){
    return `
        <div id="cardDetails-Form-Container">
                <form id="cardDetails-form" for="https://ordering-app-scrimba-default-rtdb.europe-west1.firebasedatabase.app/">
                    <p>ENTER CARD DETAILS</p>
                    <input type="text" placeholder="Enter your name" autocomplete="on" required>
                    <input type="text" placeholder="Enter card number" maxlength="26" autocomplete="on" required>
                    <input type="text"  placeholder="Enter your CVV" maxlength="3" required>

                    <button type="submit">Pay</button>
                </form>
        </div>
    
    `
}

function totalPriceUpdate(sum){
    return `<div class="order-price-final">
                <div id="total-sum-order">
                    <p>Total:</p>
                    <P>$${sum}</p>
                </div>
                <div id="complete-btn-container">
                    <button id="completeOrderBtn" data-compbtn="completeBtn">Complete order</button>
                </div>
            </div>`
}

export {addItemToMenu, addToOrder, mealStructure, orderCardDeatails, totalPriceUpdate}