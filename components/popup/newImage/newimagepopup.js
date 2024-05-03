'use client';

import { getSelectOptionsList } from '@/app/_services/util';
import styles from './newimagepopup.module.css'
import { useEffect, useState } from 'react';
import { httpGet } from '@/app/_services/httpHandler';



export default function NewImagePopup({keyName , togglePopup }) 
{

    const [data, updateListData] = useState([])
    
    const initialize = async () => {
        let url = "https://laniak-keynote-api.azurewebsites.net/docs/contents?path=_DIR_FILES"
        let data = await httpGet(url, headers)
        updateListData(data)
    }

    useEffect(() => {
        initialize()
    }, [])

    let handleCloseClick = async (e) => {
        togglePopup(keyName)
    }

    let topicList = getSelectOptionsList(data , "name" , "name")

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
                        <input type="file" className="form-control" accept="image/*" />
                    </div>
                </form>
            </div>
            <div className="input-group mb-3 justify-content-end">
                <button type="submit" className="btn btn-primary">Send</button>
            </div>
        </div>
    )
}
