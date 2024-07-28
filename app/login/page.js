'use client';

import { useState } from 'react';
import styles from './page.module.css'
import { AuthenticatedTemplate, UnauthenticatedTemplate, useMsal } from '@azure/msal-react';
import { loginRequest } from '@/app/authConfig';
import { Info } from 'react-feather';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function Login() {

    const { instance } = useMsal();
    const [accountDetails , setActiveAccount] = useState(null);
    const router  = useRouter();
    let activeAccount;

    if (instance) {
        activeAccount = instance.getActiveAccount();
    }

   const handleLoginPopup = async() => {
       let accountData = await instance.loginPopup(loginRequest).catch((e) => {console.log(e)} ).then((response) => {return response?.account;})
       if(accountData != undefined)
        {
          let resp = await fetch("/api/auth" , {method : "POST" , body: JSON.stringify(accountData)});
          router.push('/workspace')
        } 
   };



   return (
    <>
      {/* <input type='Button' value={"Sign in"} onClick={handleLoginPopup}/> */}
      <UnauthenticatedTemplate>
      <div className={`${styles.loginPanel} d-flex align-items-center`}>
       <div className={`${styles.loginCard} card mb-3 mx-auto align-middle`}>
         <div className={`${styles.loginCardBlock} row p-2 `}>
           <div className="col-md-4 d-flex justify-content-center">
             <Image src="/loginauth.png" className="m-auto img-fluid rounded-start" width={150} height={100} alt="..." />
           </div>
           <div className="col-md-8">
             <div className="card-body">
               <h5 className="card-title mb-3">Log In</h5>           
               <button type="button" className="btn btn-outline-primary mb-3" onClick={handleLoginPopup}>Log In</button>
               <p className='text-x-smaller'><Info color='orange' size={13} /> &nbsp; If you dont have an account, please contact Adminitstrator.</p>
             </div>
           </div>
         </div>
       </div>
     </div>
      </UnauthenticatedTemplate>
    </>
   )

}
