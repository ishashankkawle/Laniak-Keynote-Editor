import { Anchor, Edit, Edit3, FilePlus, GitCommit, Grid, HelpCircle } from 'react-feather'
import styles from './menubar.module.css'
import { useState } from 'react'
import NewDocPopup from '../popup/newdoc/newdocpopup';
import NewArticlePopup from '../popup/newarticle/newarticlepopup';
import OpenArticlePopup from '../popup/openarticle/openarticlepopup';
import OpenDocPopup from '../popup/opendoc/opendocpopup';
import NewCatalogPopup from '../popup/newcatalog/newcatalogpopup';




export default function Menubar({ currentWindow , openPage}) {

  let obj = {
    newArticlePopup: false,
    openArticlePopup: false,
    newDocumentPopup: false,
    openDocumentPopup: false
  }

  const [popupState, togglePopupState] = useState(obj)


  const handlePopupClick = (popupObj) => 
  {
    let obj = { ...popupState }
    if (popupState[popupObj]) {
      obj[popupObj] = false;
    }
    else {
      obj[popupObj] = true;
    }
    togglePopupState(obj)
  }


  const PopupWindow = ({ popupState }) => {
    if (popupState.newArticlePopup) {return (<NewArticlePopup keyName="newArticlePopup" togglePopup={handlePopupClick} openPage={openPage}/>)}
    if (popupState.openArticlePopup) {return (<OpenArticlePopup keyName="openArticlePopup" togglePopup={handlePopupClick} openPage={openPage} />)}
    if (popupState.newDocumentPopup) {return (<NewDocPopup keyName="newDocumentPopup" togglePopup={handlePopupClick} openPage={openPage}/>)}
    if (popupState.openDocumentPopup) {return (<OpenDocPopup keyName="openDocumentPopup" togglePopup={handlePopupClick} openPage={openPage} />)}
    if (popupState.newCatalogPopup) {return (<NewCatalogPopup keyName="newCatalogPopup" togglePopup={handlePopupClick} openPage={openPage}/>)}
    else {return null;}
  }

  if (currentWindow == "ARTICLE") {
    return (
      <div className={`pt-2 mt-0 mb-auto h-100 w-12 ${styles.kpMenubar}`}>
        <ul className={`nav align-top`}>
          <li className={` ${styles.kpMenubox}`} onClick={() => handlePopupClick("newArticlePopup")}>
            <a style={{ 'textDecoration': 'none' }}><span ><Anchor size="18" /> &nbsp; Add Article</span></a>
          </li>
          <li className={` ${styles.kpMenubox}`} onClick={() => handlePopupClick("openArticlePopup")}>
            <a sstyle={{ 'textDecoration': 'none' }}><span ><Edit3 size="18" /> &nbsp; Open Article</span></a>
          </li>
          {/* <li className={` ${styles.navbox}`} onClick={() => handlePopupClick("condition")}>
          <a style={{ 'textDecoration': 'none' }}><span ><HelpCircle size="18" /> &nbsp; Add Condition</span></a>
        </li> */}
        </ul>
        <PopupWindow popupState={popupState} />
      </div>
    )
  }
  else
  {
    return (
      <div className={`pt-2 mt-0 mb-auto h-100 w-12 ${styles.kpMenubar}`}>
        <ul className={`nav align-top`}>
          <li className={` ${styles.kpMenubox}`} onClick={() => handlePopupClick("newDocumentPopup")}>
            <a style={{ 'textDecoration': 'none' }}><span ><FilePlus size="18" /> &nbsp; Add Document</span></a>
          </li>
          <li className={` ${styles.kpMenubox}`} onClick={() => handlePopupClick("openDocumentPopup")}>
            <a sstyle={{ 'textDecoration': 'none' }}><span ><Edit size="18" /> &nbsp; Open Document</span></a>
          </li>
          <li className={` ${styles.kpMenubox}`} onClick={() => handlePopupClick("newCatalogPopup")}>
            <a sstyle={{ 'textDecoration': 'none' }}><span ><Grid size="18" /> &nbsp; Add Catalog Item</span></a>
          </li>
        </ul>
        <PopupWindow popupState={popupState} />
      </div>
    )
  }
}