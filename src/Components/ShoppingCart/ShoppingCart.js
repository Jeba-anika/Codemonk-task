import React, { useEffect, useState } from 'react';
import headphone from '../../assets/Images/Earphone.png'
import deleteIcon from '../../assets/icon/DELETE.png';
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import location from '../../assets/icon/LOCATION.png'
import check from '../../assets/icon/check.png'
import { RxCross2 } from "react-icons/rx";


const ShoppingCart = () => {
    const [products, setProducts] = useState([])
    const [pinCodes, setPinCodes] = useState({})
    const [discount, setDiscount] = useState({})
    const [selectedPinCode, setSelectedPinCode] = useState(0)
    const [subTotal, setSubtotal] = useState(0)
    const [discountAmount, setDiscountAmount] = useState(0)


    useEffect(() => {
        let total = 0
        fetch('/data.json')
            .then(res => res.json())
            .then(data => {
                const allProducts = data.products;
                allProducts.map(product => {
                    const previousQuantity = localStorage.getItem(`${product.id}`)
                    if (previousQuantity) {
                        product.quantity = previousQuantity;
                    }
                })
                setProducts(allProducts)
                setPinCodes(data.pincode)
                setDiscount(data.discount)
                products.forEach(product => total = total + (product.price * product.quantity))
                setSubtotal(total)
                if (total > discount.minTotal) {
                    setDiscountAmount(((discount.discountPercentage) / 100) * total)
                }
            })
    }, [products, discount])




    const handleAddQuantity = (product) => {
        let ind = -1;
        products.forEach((item, index) => {
            if (item.id === product.id) {
                ind = index;
            }
        });
        const templateArr = products;
        const previousQuantity = localStorage.getItem(`${templateArr[ind].id}`)
        if (previousQuantity) {
            templateArr[ind].quantity = parseInt(previousQuantity) + 1;
        } else {
            templateArr[ind].quantity += 1;
        }
        setProducts([...templateArr])
        localStorage.setItem(`${templateArr[ind].id}`, templateArr[ind].quantity)
    }


    const handleMinusQuantity = (product) => {
        let ind = -1;
        products.forEach((item, index) => {
            if (item.id === product.id) {
                ind = index;
            }
        });
        const templateArr = products;
        const previousQuantity = localStorage.getItem(`${templateArr[ind].id}`)
        if (previousQuantity && previousQuantity > 0) {
            templateArr[ind].quantity = parseInt(previousQuantity) - 1;
        } else {
            templateArr[ind].quantity = 0;
        }
        setProducts([...templateArr])
        localStorage.setItem(`${templateArr[ind].id}`, templateArr[ind].quantity)
    }


    const handleDeliveryAvailability = event => {
        event.preventDefault()
        const pin = event.target.pincode.value;
        const keys = Object.keys(pinCodes)
        console.log(keys);
        const selectedPin = keys.find(key => key === pin)
        setSelectedPinCode(selectedPin)
    }
    

    return (
        <div className='lg:mx-20 md:mx-20 mx-10 mt-10 bg-white'>
            <h2 className='text-3xl mb-8'>Shopping Cart</h2>
            <div className='border rounded-xl'>
                <div className='lg:block md:block hidden'>
                    <table className="table-auto w-full">
                        <thead className='border-b rounded-xl'>
                            <tr>
                                <th className='text-start pl-8 pt-4 font-bold text-gray-600 '>Product</th>
                                <th className='text-start pt-4 font-bold text-gray-600 '>Price</th>
                                <th className='text-start pr-8 pt-4 font-bold text-gray-600 '>Quantity</th>
                                <th className='text-start pr-8 pt-4 font-bold text-gray-600 '>Subtotal</th>

                            </tr>
                        </thead>
                        <tbody>
                            {
                                products.map((product, index) => <tr className='border-b' key={product.id}>
                                    <td>
                                        <div className=' pl-8 py-4 flex flex-row items-center'>
                                            <img className='border p-4 rounded-xl mr-4' src={headphone} alt=''></img>
                                            <div>
                                                {product.tagline && <span className='bg-indigo-900 text-white px-1'>{product.tagline}</span>}
                                                <div>
                                                    <p className='text-xl'>{product.name}</p>
                                                    {
                                                        product.desc.includes('\n') ? <div><p className='text-gray-500'>{product.desc.split('\n\n')[0]}</p><p className='mt-4'><span className='text-gray-500'>{product.desc.split('\n\n')[1]}</span><span className='ml-2 font-bold text-blue-900'>View Plans</span></p></div> : <p className='text-gray-500'>{product.desc}</p>
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>{product.price}$</td>
                                    <td><div className='flex flex-row gap-2'>
                                        <button onClick={() => handleMinusQuantity(product)}><AiOutlineMinus></AiOutlineMinus></button>
                                        <div className='w-10 h-10 border p-2 text-center rounded'>{product.quantity}</div>
                                        <button onClick={() => handleAddQuantity(product)}><AiOutlinePlus></AiOutlinePlus></button>
                                    </div>
                                    </td>
                                    <td><div className='flex flex-row gap-6 items-center'>{parseInt(product.price) * parseInt(product.quantity)} $ <img src={deleteIcon} alt="" /></div></td>

                                </tr>)
                            }

                        </tbody>
                    </table>
                </div>
                <div className='lg:bg-white md:bg-white bg-gray-50 lg:hidden md:hidden sm:block block'>
                    {
                        products.map(product => <div className='flex flex-row gap-4 p-4  border-b'>
                            <div>
                                <img className='border p-4 rounded-xl mr-4' src={headphone} alt=''></img>
                            </div>
                            <div className='items-center'>
                                {product.tagline && <span className='bg-indigo-900 text-white px-1'>{product.tagline}</span>}
                                <p className='text-xl'>{product.name}</p>
                                {
                                    product.desc.includes('\n') ? <div><p className='text-gray-500'>{product.desc.split('\n\n')[0]}</p></div> : <p className='text-gray-500'>{product.desc}</p>
                                }
                                <p>{product.price}$</p>
                            </div>
                            <div>
                                <div className='flex flex-row gap-2'>
                                    <button onClick={() => handleMinusQuantity(product)}><AiOutlineMinus></AiOutlineMinus></button>
                                    <div className='w-10 h-10 border p-2 text-center rounded'>{product.quantity}</div>
                                    <button onClick={() => handleAddQuantity(product)}><AiOutlinePlus></AiOutlinePlus></button>
                                </div>
                            </div>
                        </div>)
                    }
                </div>
                <div className='flex lg:flex-row md:flex-row flex-col gap-8 w-full py-20 px-10'>
                    <div className='lg:w-1/2 md:w-1/2 w-full lg:border-0 md:border-0 border rounded-xl p-4'>
                        <h2>Delivery Availability</h2>
                        <form onSubmit={handleDeliveryAvailability} className='flex flex-row'>
                            <img src={location} alt="" />
                            <input className='border-0' type="text" name="pincode" id="" />
                            <button className='text-blue-800 font-bold' type="submit">CHANGE</button>
                        </form>
                        <div className='lg:w-3/4 w-full h-[1px] bg-blue-900'></div>
                        {
                            selectedPinCode && <div className='flex flex-row'>
                                <div className='flex flex-row gap-2'>
                                    <div>{selectedPinCode.deliveryPrice === 0 ? <img src={check}></img> : <RxCross2></RxCross2>}</div>
                                    <div>
                                        <p>Free Delivery</p>
                                    </div>
                                </div>
                                <div className='flex flex-row gap-2'>
                                    <div>{selectedPinCode.deliveryPrice === 0 ? <img src={check}></img> : <RxCross2></RxCross2>}</div>
                                    <div>
                                        <p>Cash on delivery</p>
                                    </div>
                                </div>
                                <div className='flex flex-row gap-2'>
                                    <div>{selectedPinCode.deliveryPrice === 0 ? <img src={check}></img> : <RxCross2></RxCross2>}</div>
                                    <div>
                                        <p>Estimated Delivery Time</p>
                                    </div>
                                </div>
                            </div>
                        }
                    </div>
                    <div className='lg:w-1/2 md:w-1/2 w-full lg:border-0 md:border-0 border p-4 rounded-xl'>
                        <p>Order Summary</p>
                        <div className='flex flex-row justify-between'><p>Subtotal:</p> {subTotal}</div>
                        <div className='flex flex-row justify-between'><p>Total discount:</p> -{discountAmount}</div>
                        <div className='flex flex-row justify-between'>Standard Shipping: {selectedPinCode.deliveryPrice ? selectedPinCode.deliveryPrice : 0}</div>
                        <div className='flex flex-row justify-between'><p>Order Total:</p> <p>{selectedPinCode ? subTotal - discountAmount + selectedPinCode.deliveryPrice : subTotal - discountAmount + 0}</p></div>
                        <div className='flex lg:flex-row md:flex-row flex-col-reverse lg:gap-8'>
                            <button className={`btn text-blue-900 font-bold ${subTotal && selectedPinCode && 'disabled'}`}>Continue shopping</button>
                            <button className='btn bg-blue-900 py-1 text-white rounded-xl  text-center lg:mt-0 md:mt-0 mt-4'>Checkout</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default ShoppingCart;