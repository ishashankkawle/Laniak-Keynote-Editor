'use client';

import { AlertCircle } from 'react-feather';
import styles from './openimagepopup.module.css'
import { useEffect, useState } from 'react';
import { httpGet } from '@/app/_services/httpHandler';
import Image from 'next/image'



export default function OpenImagePopup({keyName , togglePopup , addImage}) {


  const [data, updateListData] = useState()
  const [selectedImage, updateSelectedImage] = useState()
 
  const initialize = async() => 
  {  
    let url = "https://laniak-keynote-api.azurewebsites.net/docs/contents?path=_ARTICLES%2FAssets"
    let data = await httpGet(url)
    data = data.map( (item) => {  return (<li key={item.path} className={`${styles.kpPopupGallaryItem}`} onClick={() => handleImageSelection("https://gitlab.com/shashankkawle/DOCS/-/raw/master/"+ item.path)}>
                                        <Image width={100} height={50} className={`${styles.kpPopupGallaryItemContent} shadow-sm`} src={"https://gitlab.com/shashankkawle/DOCS/-/raw/master/" + item.path} alt={"https://gitlab.com/shashankkawle/DOCS/-/raw/master/" + item.path}/><br/>
                                        <span className={`${styles.kpPopupGallaryItemName}`}>{item.name}</span>
                                    </li>) })
    await updateListData(data)

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
        <div className={`${styles.kpPopupGallary}`}>
            <ul style={{"listStyleType" : "none"}}>
                {data}
            </ul>
        </div>
        <div className="input-group mb-3 justify-content-end">
            <button type="submit" className="btn btn-primary" onClick={handleSubmitClick}>Send</button>
        </div>
    </div>
  )
}
