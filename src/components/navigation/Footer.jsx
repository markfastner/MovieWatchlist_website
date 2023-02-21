import React, {useState, useRef} from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../pages/auth/contexts/AuthContext.js';
import '../../App.css';






export const Footer=()=>{
    const FooterLinks = ["About", "Terms and Conditions", "Support", "Contact Us"]

    return(
        
        <footer class="p-4 bg-white shadow md:flex md:items-center md:justify-between md:p-6 dark:bg-blue-900">
            <span class="text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2023 <a href="./" class="hover:underline">Runtime™</a>
            </span>
            <ul class="flex flex-wrap items-center mt-3 text-sm text-white dark:text-white sm:mt-0">
                <li>
                    <a href="#" class="mr-4 hover:underline md:mr-6 ">About</a>
                </li>
                <li>
                    <a href="#" class="mr-4 hover:underline md:mr-6">Terms and Conditions</a>
                </li>
                <li>
                    <a href="#" class="mr-4 hover:underline md:mr-6">Support</a>
                </li>
                <li>
                    <a href="#" class="hover:underline">Contact Us</a>
                </li>
            </ul>
        </footer>

        
    );
}

export default Footer