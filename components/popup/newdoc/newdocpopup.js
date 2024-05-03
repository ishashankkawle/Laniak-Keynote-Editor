'use client';

import { getSelectOptionsList } from '@/app/_services/util';
import styles from './newdocpopup.module.css'
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { httpGet, httpPost } from '@/app/_services/httpHandler';
import Toast from '@/components/toast/toast';
import res from '@/app/resources';



export default function NewDocPopup({keyName , togglePopup , openPage }) 
{

    const [data, updateListData] = useState([])
    const toastRef = useRef(null)
    
    const initialize = async () => {
        let url = "https://laniak-keynote-api.azurewebsites.net/docs/contents?path=_DIR_FILES"
        let data = await httpGet(url)
        updateListData(data)
    }

    useEffect(() => {
        initialize()
    }, [])

    let handleCloseClick = async (e) => {
        togglePopup(keyName)
    }
    
    let handleSubmitClick = async (e) => {
        toastRef.current.togglePopupNotificationDisplay("Creating new document ..." , res["POPUP_NOTIFICATION_MAP"]["type"]["LOADING"] , 80000)
        
        let folder = document.getElementById("kp-new-doc-folder-inp").value;
        let file = document.getElementById("kp-new-doc-file-inp").value;
        let body = {
            "filePath" : folder + "/" + file,
            "content" : "Welcome to keynote",
            "commitMessage" : "Create new file : " + folder + "/" + file,
            "authorName" : "Shashank Kawle",
            "authorEmail" : "shashank@test.com"
        }
        let url = "https://laniak-keynote-api.azurewebsites.net/docs/file"
        await httpPost(url,body)
        toastRef.current.togglePopupNotificationDisplay("Successfully created new document" , res["POPUP_NOTIFICATION_MAP"]["type"]["SUCCESS"], 10000)
        togglePopup(keyName)
        openPage(folder + "/" + file)
    }

    let topicList = getSelectOptionsList(data , "name" , "name")

    return (
        <div className={`${styles.kpPopup} p-3 shadow`}>
            <div className={`${styles.kpPopupHeader} mb-3`}>
                <div>
                    <span className={`${styles.kpPopupTitle}`}>Create Page</span>
                </div>
                <div>
                    <button type="button" className="btn-close" aria-label="Close" onClick={handleCloseClick}></button>
                </div>
            </div>
            <div className="input-group mb-3">
                <form className="row g-3" style={{"width" : "100%"}}>
                    <div className="col-auto">
                        <select id='kp-new-doc-folder-inp' className="form-select">
                            {topicList}
                        </select>
                    </div>
                    <div className="col-auto">
                        <span className="form-control-plaintext p-2 "> /</span>
                    </div>
                    <div className="col-auto" style={{"width" : "61%"}}>
                        <input type="text" className="form-control" placeholder="folder/title" id='kp-new-doc-file-inp' />
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
