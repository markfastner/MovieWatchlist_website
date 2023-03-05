import React, {useState, useRef} from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../pages/auth/contexts/AuthContext.js';
import '../../App.css';



// this is the footer section where the user can navigate to the about, terms and conditions, support and contact us pages
// we are using an array for the links and we route everything to the main
// The footer page is accessible to everybody whether they have an account or not


export const Footer=()=>{
    const FooterLinks = ["About", "Terms and Conditions", "Support", "Contact Us"]
    const navigate = useNavigate()
    

    return(
        
        <footer class="p-4 bg-white shadow md:flex md:items-center md:justify-between md:p-6 dark:bg-slate-900">
            <div>
                <span class="text-sm dark:text-white text-blue-900 sm:text-center">© 2023 <a href="./" class="hover:underline">Runtime™</a>
                </span>
                <Link to='/' className="text-white tracking-wide px-8 py-4">
                </Link>
                
            </div>
            
            
            <div className="flex justify-center items-center space-x-8">
                
                <ul className="flex items-center justify-end space-x-4 ">
                    
                    {
                        FooterLinks.map(link => {
                            return <li>
                                <Link to={`/${link}`} className="text-blue-900 dark:text-white tracking-wider hover:underline hover:text-blue-400">{link}</Link>
                            </li>
                        })
                    }
                </ul>
            </div>
        </footer>

        
    );
}

export default Footer