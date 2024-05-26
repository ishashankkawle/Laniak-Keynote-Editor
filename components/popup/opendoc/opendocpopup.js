'use client';

import { AlertCircle } from 'react-feather';
import styles from './opendocpopup.module.css'
import { useRouter } from 'next/navigation';
import Filetree from '@/components/filetree/filetree';
import { useEffect, useRef, useState } from 'react';
import { httpDelete, httpGet } from '@/app/_services/httpHandler';
import { getSelectOptionsList } from '@/app/_services/util';
import Toast from '@/components/toast/toast';
import res from '@/app/resources';



export default function OpenDocPopup({ keyName, togglePopup, openPage }) {

    const toastRef = useRef(null)

    const [topicData, updateTopicData] = useState([]);
    const [listData, updateListData] = useState([]);
    const [topic , selectTopic] = useState("");
    const [page , selectPage] = useState("");

    const initialize = async () => {
        let url = "https://laniak-keynote-api.azurewebsites.net/docs/contents?path=_DIR_FILES"
        let data = await httpGet(url)
        updateTopicData(data)
    }

    useEffect(() => {
        initialize()
    }, [])
    
    useEffect(() => {
        handlePageSelect()
    }, [page])


    let handleCloseClick = async (e) => {
        togglePopup(keyName)
    }
    
    let handlePageSelect = async (e) => {
        if(page != "")
        {
            togglePopup(keyName)
            openPage(page)
        } 

    }

    let setTopic = async () => {
        let dir = document.getElementById('kp-opendoc-popup-topic-sel').value
        console.log(dir)
        if(dir != "")
        {
            dir = dir.split("/").slice(1)[0]
            await selectTopic(dir)
            let url = "https://laniak-keynote-api.azurewebsites.net/docs/all?path=" + dir
            let data = await httpGet(url)
            data = data.map((item) => ({ "id": item.id, "name": item.name, "type": item.type, "path": item.path.split("/").slice(1).join("/"), "mode": item.mode }))
            await updateListData(data)
        }
    }

    let deletePage = async (pagePath) => {
        if(confirm("Are you sure you want to delete page : " + pagePath + " ?"))
        {
            toastRef.current.togglePopupNotificationDisplay("Deleting page ..." , res["POPUP_NOTIFICATION_MAP"]["type"]["LOADING"] , 80000)
            let body = {
                "filePath" : pagePath,
                "commitMessage" : "Deleted " + pagePath,
                "authorEmail" : "shashank@test.com",
                "authorName" : "Shashank Kawle"
            }
            let url = "https://laniak-keynote-api.azurewebsites.net/docs/file"
            await httpDelete(url,body)
            toastRef.current.togglePopupNotificationDisplay("Successfully deleted page" , res["POPUP_NOTIFICATION_MAP"]["type"]["SUCCESS"], 10000)
        }
    }

    let topicList = getSelectOptionsList(topicData , "path" , "name" , true , "Select Topic")


    return (
        <div className={`${styles.kpPopup} p-3 shadow`}>
            <div className={`${styles.kpPopupHeader} mb-3`}>
                <div>
                    <span className={`${styles.kpPopupTitle}`}>Open Page</span>
                </div>
                <div>
                    <button type="button" className="btn-close" aria-label="Close" onClick={handleCloseClick}></button>
                </div>
            </div>
            <div className="input-group mb-3">
                <select id='kp-opendoc-popup-topic-sel' className="form-select" onChange={setTopic}>
                    {topicList}
                </select>
            </div>
            <Filetree listdata={listData} topic={topic} openPage={selectPage} removePage={(name) => deletePage(name)} />
            <Toast ref={toastRef} />

        </div>
    )
}
