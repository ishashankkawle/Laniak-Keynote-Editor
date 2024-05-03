'use client';

import Image from 'next/image'
import styles from './page.module.css'
import { Info, Loader, Lock, User } from 'react-feather'
import { useRouter } from 'next/navigation';
import { useState } from 'react';



export default function Home() {

  const rouer  = useRouter();

  let handleClick = async (e) => 
  {
    let resp = await fetch("/api/auth");
    rouer.push('/workspace')
  }


  return (
    <div className={`${styles.loginPanel} d-flex align-items-center`}>
      <div className={`${styles.loginCard} card mb-3 mx-auto align-middle`}>
        <div className="row p-2 m-0">
          <div className="col-md-4 d-flex justify-content-center">
            <Image src="/workflow.png" className="m-auto img-fluid rounded-start" width={150} height={100} alt="..." />
          </div>
          <div className="col-md-8">
            <div className="card-body">
              <h5 className="card-title mb-3">Log In</h5>
              <p className='text-smaller'><Loader color='purple' size={15} /> &nbsp; Auhenticating ...</p>
              <div className="input-group flex-nowrap mb-2">
                <span className="input-group-text" id="addon-wrapping"><User size={18} /></span>
                <input type="text" className="form-control" placeholder="Username" aria-label="Username" aria-describedby="addon-wrapping" />
              </div>
              <div className="input-group flex-nowrap mb-2">
                <span className="input-group-text" id="addon-wrapping"><Lock size={18} /></span>
                <input type="password" className="form-control" placeholder="Password" aria-label="Password" aria-describedby="addon-wrapping" />
              </div>
              <button type="button" className="btn btn-outline-primary mb-3" onClick={handleClick}>Log In</button>

              <p className='text-x-smaller'><Info color='orange' size={13} /> &nbsp; If you dont have an account, please contact Adminitstrator.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
