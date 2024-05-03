'use client';

import { AlertCircle } from 'react-feather';
import styles from './openarticlepopup.module.css'
import { useRouter } from 'next/navigation';
import Filetree from '@/components/filetree/filetree';
import { useEffect, useState } from 'react';
import { httpGet } from '@/app/_services/httpHandler';



export default function OpenArticlePopup({keyName , togglePopup , openPage}) {


  const [data, updateListData] = useState()
  const [article , selectArticle] = useState("");

  const initialize = async() => 
  {  
      let url = "https://laniak-keynote-api.azurewebsites.net/article/gallary"
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
        <Filetree listdata={data} topic={"_ARTICLES"} openPage={selectArticle} />
        <div className="input-group mb-3 justify-content-end">
            <button type="submit" className="btn btn-primary">Send</button>
        </div>
    </div>
  )
}
