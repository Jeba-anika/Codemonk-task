import React from 'react';
import user from '../../assets/icon/user.png'
import cart from '../../assets/icon/shopping.png'
import { AiOutlineSearch } from "react-icons/ai";

const NavBar = () => {
    return (
        <div className='w-full h-20 flex bg-blue-900 flex-row justify-between items-center px-10'>
            <div>
                <h2 className='font-bold text-3xl text-white'>TEST</h2>
            </div>
            <div className='flex flex-row items-center text-white'>
                <p className='lg:block md:block hidden lg: px-2'>Track Order</p>
                <>|</>
                <div className='px-2 text-xl'><AiOutlineSearch/></div>
                <>|</>
                <img src={user} alt="" />
                <>|</>
                <img src={cart} alt="" />
            </div>
        </div>
    );
};

export default NavBar;