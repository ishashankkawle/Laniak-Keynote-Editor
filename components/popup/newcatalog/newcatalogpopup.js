'use client';

import { getBase64, getSelectOptionsList } from '@/app/_services/util';
import styles from './newcatalogpopup.module.css'
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { httpGet, httpPost } from '@/app/_services/httpHandler';
import { AlertCircle } from 'react-feather';
import Toast from '@/components/toast/toast';
import res from '@/app/resources';



export default function NewCatalogPopup({keyName , togglePopup , openPage }) 
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
        toastRef.current.togglePopupNotificationDisplay("Creating new topic ..." , res["POPUP_NOTIFICATION_MAP"]["type"]["LOADING"] , 80000)
        let label = document.getElementById("kp-new-catalogte-name-inp").value;
        let file = document.getElementById("kp-new-catalogte-ico-inp").files[0];
        let filename = document.getElementById("kp-new-catalogte-ico-inp").files[0].name.split(".")[1];
        file = await getBase64(file)
        let body = {
            "name" : label,
            "fileName" : label + "." + filename,
            "commitMessage" : "Create new catalog item : " + label,
            "authorName" : "Shashank Kawle",
            "authorEmail" : "shashank@test.com",
            "content" : file
        }
        let url = "https://laniak-keynote-api.azurewebsites.net/docs/catalog"
        await httpPost(url,body)
        toastRef.current.togglePopupNotificationDisplay("Successfully created new topic" , res["POPUP_NOTIFICATION_MAP"]["type"]["SUCCESS"], 10000)
        togglePopup(keyName)
    }

    let topicList = getSelectOptionsList(data , "name" , "name")

    return (
        <div className={`${styles.kpPopup} p-3 shadow`}>
            <div className={`${styles.kpPopupHeader} mb-3`}>
                <div>
                    <span className={`${styles.kpPopupTitle}`}>Create Catalog Item</span>
                </div>
                <div>
                    <button type="button" className="btn-close" aria-label="Close" onClick={handleCloseClick}></button>
                </div>
            </div>
            <div className="input-group mb-3">
                <form className="row g-3" style={{"width" : "100%"}}>
                    <div className="col-auto" style={{"width" : "100%"}}>
                        <input type="text" className="form-control" placeholder="Catalog Folder Name" id='kp-new-catalogte-name-inp' />
                    </div>
                    <div className="input-group mb-3">
                        <div className="col-auto" style={{"width" : "100%"}}>
                            <input type="file" className="form-control" accept="image/*" id='kp-new-catalogte-ico-inp'/>
                        </div>
                    </div>
                </form>
            </div>
            <p className='text-x-smaller text-subbed'><AlertCircle color='orange' size={16}/> &nbsp; This image will be displayed as Catalog icon. Please upload icon sized file</p>
            <div className="input-group mb-3 justify-content-end">
                <button type="submit" className="btn btn-primary" onClick={handleSubmitClick}>Send</button>
            </div>
            <Toast ref={toastRef} />
        </div>
    )
}
