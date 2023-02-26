import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';

function SupportPage(){
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();
  
    emailjs.sendForm("service_b0jkzjv", "template_dti8apf", form.current, "NaDh7LvjYW0WKJJaU")
      .then((result) => {
          console.log(result.text);
          console.log("message sent")
      }, (error) => {
          console.log(error.text);
      });
  };

  return (
    <div>
    <form ref={form} onSubmit={sendEmail} className="bg-gray-100 p-6 rounded-lg">
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2" htmlFor="name">Name</label>
        <input className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" name="user_name" />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2" htmlFor="email">Email</label>
        <input className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="email" name="user_email" />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2" htmlFor="message">Message</label>
        <textarea className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" name="message" />
      </div>
      <div className="flex justify-end">
        <input className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit" value="Send" />
      </div>
    </form>
    </div>
  )
}

export default SupportPage;