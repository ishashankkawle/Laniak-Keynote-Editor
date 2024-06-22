'use client';

import { getBase64, getSelectOptionsList } from '@/app/_services/util';
import styles from './newimagefordocpopup.module.css'
import { useEffect, useRef, useState } from 'react';
import { httpGet, httpPost } from '@/app/_services/httpHandler';
import res from '@/app/resources';
import Toast from '@/components/toast/toast';



export default function NewImageForDocPopup({keyName , topic , togglePopup}) 
{
    const toastRef = useRef(null)

    let handleCloseClick = async (e) => {
        togglePopup(keyName)
    }

    let handleSubmitClick = async (e) => 
    {
        if(topic != "" )
        {
            toastRef.current.togglePopupNotificationDisplay("Uploading image ..." , res["POPUP_NOTIFICATION_MAP"]["type"]["LOADING"] , 80000)
            let file = document.getElementById("kp-doc-image-upload-inp").files[0];
            let filename = document.getElementById("kp-doc-image-upload-inp").files[0].name;
            file = await getBase64(file)
            let body = {
                "filePath" : topic + "/" + filename.replaceAll(" " , "_"),
                "authorName" : "Shashank Kawle",
                "authorEmail" : "shashank@test.com",
                "commitMessage" : "Updated " + filename + " to _ASSETS/" + topic ,
                "content" : file
            }
            let url = "https://laniak-keynote-api.azurewebsites.net/docs/blob"
            await httpPost(url,body)
            toastRef.current.togglePopupNotificationDisplay("Successfully Uploaded image" , res["POPUP_NOTIFICATION_MAP"]["type"]["SUCCESS"], 10000)
            togglePopup(keyName)
        }
        else
        {
          toastRef.current.togglePopupNotificationDisplay("Please open the page first" , res["POPUP_NOTIFICATION_MAP"]["type"]["WARNING"] , 80000)
        }
    }

    return (
        <div className={`${styles.kpPopup} p-3 shadow`}>
            <div className={`${styles.kpPopupHeader} mb-3`}>
                <div>
                    <span className={`${styles.kpPopupTitle}`}>Upload Image</span>
                </div>
                <div>
                    <button type="button" className="btn-close" aria-label="Close" onClick={handleCloseClick}></button>
                </div>
            </div>
            <div className="input-group mb-3">
                <form className="row g-3" style={{"width" : "100%"}}>
                    <div className="col-auto" style={{"width" : "61%"}}>
                        <input type="file" className="form-control" accept="image/*" id='kp-doc-image-upload-inp'/>
                    </div>
                </form>
            </div>
            <div className="input-group mb-3 justify-content-end">
                <button type="submit" className="btn btn-primary" onClick={handleSubmitClick}>Send</button>
            </div>
            <Toast ref={toastRef} />
        </div>
    )
}
