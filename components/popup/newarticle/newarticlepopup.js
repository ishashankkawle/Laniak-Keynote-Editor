'use client';

import { AlertCircle } from 'react-feather';
import styles from './newarticlepopup.module.css'
import { useRouter } from 'next/navigation';



export default function NewArticlePopup({keyName , togglePopup}) {


  let handleCloseClick = async (e) => 
  {
    togglePopup(keyName)
  }


  return (
    <div className={`${styles.kpPopup} p-3 shadow`}>
        <div className={`${styles.kpPopupHeader} mb-3`}>
            <div>
                <span className={`${styles.kpPopupTitle}`}>Create Article</span>
            </div>
            <div>
                <button type="button" className="btn-close" onClick={handleCloseClick}></button>
            </div>
        </div>
        <div className="input-group mb-3">
            <input type="text" className="form-control" placeholder="Enter Title" />
        </div>
        <div className="input-group mb-3 justify-content-end">
            <button type="submit" className="btn btn-primary">Send</button>
        </div>
        <p className='text-x-smaller text-subbed'><AlertCircle color='orange' size={16}/> &nbsp; This title automatically added as a title to your article</p>
    </div>
  )
}
