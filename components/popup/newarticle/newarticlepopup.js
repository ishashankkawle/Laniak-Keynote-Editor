'use client';

import { AlertCircle } from 'react-feather';
import styles from './newarticlepopup.module.css'
import { useRouter } from 'next/navigation';
import Toast from '@/components/toast/toast';
import res from '@/app/resources';
import { useRef } from 'react';
import { httpPost } from '@/app/_services/httpHandler';



export default function NewArticlePopup({keyName , togglePopup , openPage}) {

  const toastRef = useRef(null)

  let handleCloseClick = async (e) => 
  {
    togglePopup(keyName)
  }

  let handleSubmitClick = async (e) => {
    toastRef.current.togglePopupNotificationDisplay("Creating new document ..." , res["POPUP_NOTIFICATION_MAP"]["type"]["LOADING"] , 80000)
    
    let name = document.getElementById("kp-new-article-name-inp").value;
    let image = document.getElementById("kp-new-article-img-inp").value;
    let desc = document.getElementById("kp-new-article-desc-inp").value;
    let body = {
        "name" : name,
        "url" : image,
        "description" : desc,
        "content" : "Welcome to keynote",
        "commitMessage" : "Create new article : _ARTICLES/" + name,
        "authorName" : "Shashank Kawle",
        "authorEmail" : "shashank@test.com"
    }
    let url = "https://laniak-keynote-api.azurewebsites.net/articles"
    await httpPost(url,body)
    toastRef.current.togglePopupNotificationDisplay("Successfully created new document" , res["POPUP_NOTIFICATION_MAP"]["type"]["SUCCESS"], 10000)
    togglePopup(keyName)
    openPage("_ARTICLES/" + name)
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
            <input type="text" className="form-control" id='kp-new-article-name-inp' placeholder="Enter Title" />
        </div>
        <div className="input-group mb-3">
            <input type="text" className="form-control" id='kp-new-article-img-inp' placeholder="Cover Image Url" />
        </div>
        <div className="input-group mb-3">
            <input type="text" className="form-control" id='kp-new-article-desc-inp' placeholder="Description" />
        </div>
        <div className="input-group mb-3 justify-content-end">
            <button type="submit" className="btn btn-primary" onClick={handleSubmitClick}>Send</button>
        </div>
        <p className='text-x-smaller text-subbed'><AlertCircle color='orange' size={16}/> &nbsp; This title automatically added as a title to your article</p>
        <Toast ref={toastRef} />
    </div>
  )
}
