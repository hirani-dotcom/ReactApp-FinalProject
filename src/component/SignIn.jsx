import React, { useState} from 'react';
import AuthModal from './AuthModal';

const SignIn = () => {

  const [isModalOpen, setIsModalOpen] = useState(true);

  return (
   <>
    <div>
      <section id="#signin">
         <div className='signin'>
            <h1>Welcome</h1>
            <button className='reg-btn'
               onClick={() => setIsModalOpen(true)}>
               Login / Register
            </button><br />
            <AuthModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
         </div>
      </section>
    </div>
   </>
  );
};

export default SignIn;