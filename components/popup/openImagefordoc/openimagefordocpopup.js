'use client';

import { AlertCircle , Image  } from 'react-feather';
import styles from './openimagefordocpopup.module.css'
import { useEffect, useRef, useState } from 'react';
import { httpGet } from '@/app/_services/httpHandler';
import res from '@/app/resources';
import Toast from '@/components/toast/toast';



export default function OpenImageForDocPopup({keyName , topic , togglePopup , addImage}) {


  let [data, updateListData] = useState()
  let [nextPageLink, updateNextPageLink] = useState(undefined)
  const [selectedImage, updateSelectedImage] = useState()
  const toastRef = useRef(null)
 
  const initialize = async() => 
  { 
    if(topic != "" )
    {
      let url = "https://laniak-keynote-api.azurewebsites.net/docs/v2/contents?path=_ASSETS/" + topic
      let response = await httpGet(url)
      if(response.nextPage != undefined)
      {
        updateNextPageLink(response.nextPage)
      }
      else
      {
        updateNextPageLink(undefined)
      }
      data = createDomElements (response["data"])
      await updateListData(data)
    }
    else
    {
      toastRef.current.togglePopupNotificationDisplay("Please open the page first" , res["POPUP_NOTIFICATION_MAP"]["type"]["WARNING"] , 80000)
    }
  } 

  useEffect(() => {
    initialize();
  } , [])


  let handleCloseClick = async (e) => 
  {
    togglePopup(keyName)
  }

  let handleImageSelection = async (e) => 
  {
    updateSelectedImage(e)
  }
  
  let handleSubmitClick = async (e) => 
  {
    togglePopup(keyName)
    addImage(document.getElementById("kp-inp-img-alt-text").value , selectedImage)
  }

  let handleLoadMoreClick = async (e) => 
    {
      let url = "https://laniak-keynote-api.azurewebsites.net/trigger?url=" + encodeURIComponent(nextPageLink)
      let response = await httpGet(url)
      if(response.nextPage != undefined)
      {
        updateNextPageLink(response.nextPage)
      }
      else
      {
        updateNextPageLink(undefined)
      }
      let finaldata = data.concat(createDomElements(response.data))
      await updateListData(finaldata)
  
    }

  let createDomElements = (arrData) => {
    return arrData.map( (item) => {  return (<li key={item.path} className={`${styles.kpPopupGallaryItem}`} onClick={() => handleImageSelection("https://gitlab.com/shashankkawle/DOCS/-/raw/master/"+ item.path)}>
                                        <Image size={30} className={`${styles.kpPopupGallaryItemContent} shadow-sm`}/> &nbsp; <span className={`${styles.kpPopupGallaryItemName}`}>{item.name}</span>
                                    </li>) })
  }
  

  let loadMoreButton = null;
  if (nextPageLink != undefined) 
  {
    loadMoreButton = (<div className={`${styles.kpPopupMoreDataButton} text-bg-secondary`} onClick={handleLoadMoreClick}>Load More</div>)
  }

  return (
    <div className={`${styles.kpPopup} p-3 shadow`}>
        <div className={`${styles.kpPopupHeader} mb-3`}>
            <div>
                <span className={`${styles.kpPopupTitle}`}>Open Image</span>
            </div>
            <div>
                <button type="button" className="btn-close" onClick={handleCloseClick}></button>
            </div>
        </div>
        <div className="input-group mb-3">
          <input type="text" id='kp-inp-img-alt-text' className="form-control" placeholder="Alt Text" required />
        </div>
        <div className='text-smaller text-secondary mb-2'>
          Selected Image : {selectedImage}
        </div>
        <div className={`${styles.kpPopupGallary}`}>
            <ul style={{"listStyleType" : "none"}}>
                {data}
            </ul>
        </div>
        {loadMoreButton}
        <div className="input-group mb-3 justify-content-end">
            <button type="submit" className="btn btn-primary" onClick={handleSubmitClick}>Send</button>
        </div>
        <Toast ref={toastRef} />
    </div>
  )
}
