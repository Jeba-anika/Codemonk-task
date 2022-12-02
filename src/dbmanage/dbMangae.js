const handleQuantity = (id)=>{
    let allItemQuantity= {};
    const storedQuantity = localStorage.getItem('shopping-quantity');
    if(storedQuantity){
        storedQuantity = JSON.parse(storedQuantity)
    }

    const quantity = storedQuantity[id];
    if(quantity){
        const newQuantity = quantity + 1;
        allItemQuantity[id] = newQuantity
    }else{
        allItemQuantity[id] = 1;
    }

    localStorage.setItem('shopping-quantity', JSON.stringify(storedQuantity))
}


const getStoredQuantity = ()=>{
    let allItemQuantity = {};
    const storedQuantity = localStorage.getItem('shopping-quantity')
    if(storedQuantity){
        allItemQuantity = JSON.parse(storedQuantity)
    }
    return allItemQuantity
}


export {handleQuantity, getStoredQuantity}