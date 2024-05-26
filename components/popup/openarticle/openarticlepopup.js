'use client';

import { AlertCircle } from 'react-feather';
import styles from './openarticlepopup.module.css'
import { useRouter } from 'next/navigation';
import Filetree from '@/components/filetree/filetree';
import { useEffect, useRef, useState } from 'react';
import { httpDelete, httpGet } from '@/app/_services/httpHandler';
import Toast from '@/components/toast/toast';
import res from '@/app/resources';



export default function OpenArticlePopup({keyName , togglePopup , openPage}) {

  const toastRef = useRef(null)

  const [data, updateListData] = useState()
  const [article , selectArticle] = useState("");

  const initialize = async() => 
  {  
      let url = "https://laniak-keynote-api.azurewebsites.net/articles/gallary"
      let data = await httpGet(url)
      data = data.map( (item) => { return ({"name": item.name , "path" : item.name , "type" : "file"}) })
      await updateListData(data)  
  } 

  useEffect(() => {
    initialize();
  } , [])

  useEffect(() => {
    handleArticleSelect()
  }, [article])

  let handleCloseClick = async (e) => 
  {
    togglePopup(keyName)
  }

  let handleArticleSelect = async (e) => {
    if(article != "")
    {
        togglePopup(keyName)
        openPage(article)
    } 
  }

  let deleteArticle = async (articlePath) => {
    if(confirm("Are you sure you want to delete page : " + articlePath + " ?"))
    {
      toastRef.current.togglePopupNotificationDisplay("Deleting article ..." , res["POPUP_NOTIFICATION_MAP"]["type"]["LOADING"] , 80000)
      let body = {
          "name" : articlePath.split("_ARTICLES/")[1],
          "commitMessage" : "Deleted " + articlePath,
          "authorEmail" : "shashank@test.com",
          "authorName" : "Shashank Kawle"
      }
      let url = "https://laniak-keynote-api.azurewebsites.net/articles/file"
      await httpDelete(url,body)
      toastRef.current.togglePopupNotificationDisplay("Successfully deleted article" , res["POPUP_NOTIFICATION_MAP"]["type"]["SUCCESS"], 10000)
  
    }
  }

  return (
    <div className={`${styles.kpPopup} p-3 shadow`}>
        <div className={`${styles.kpPopupHeader} mb-3`}>
            <div>
                <span className={`${styles.kpPopupTitle}`}>Open Article</span>
            </div>
            <div>
                <button type="button" className="btn-close" onClick={handleCloseClick}></button>
            </div>
        </div>
        <Filetree listdata={data} topic={"_ARTICLES"} openPage={selectArticle} removePage={(name) => deleteArticle(name)}/>
        <Toast ref={toastRef} />
    </div>
  )
}
