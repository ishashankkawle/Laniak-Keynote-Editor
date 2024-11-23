'use client';
import { Bold, Box, ChevronsDown, ChevronsUp, Code, CreditCard, Image, Italic, Link, Link2, List, MessageCircle, RotateCw , RefreshCcw, Save, Underline, UploadCloud } from 'react-feather';
import styles from './board.module.css'
import { useCallback, useEffect, useRef, useState } from 'react';
import NewImagePopup from '../popup/newImage/newimagepopup';
import OpenImagePopup from '../popup/openImage/openimagepopup';
import { checkParent, hasParentWithId } from '@/app/_services/util';
import { httpGet, httpPut } from '@/app/_services/httpHandler';
import res from '@/app/resources';
import Toast from '../toast/toast';
import OpenImageForDocPopup from '../popup/openImagefordoc/openimagefordocpopup';
import NewImageForDocPopup from '../popup/newImagefordoc/newimagefordocpopup';



//Folder is used for image popup
export default function Board({ page, folder }) {
  let obj = {
    newImagePopup: false,
    openImagePopup: false
  }


  const [popupState, togglePopupState] = useState(obj)
  const [wordCount, updateWordCount] = useState(0)
  const toastRef = useRef(null)

  useEffect(() => {
    if (page != "") {
      initialize();
    }
  }, [page])

  const initialize = async () => {
    toastRef.current.togglePopupNotificationDisplay("Opening document ...", res["POPUP_NOTIFICATION_MAP"]["type"]["LOADING"], 80000)
    let url = "https://laniak-keynote-api.azurewebsites.net/docs/file?path=" + page
    let data = await httpGet(url)
    document.getElementById('kp-editor').innerText = data
    toastRef.current.togglePopupNotificationDisplay("Successfully opened document", res["POPUP_NOTIFICATION_MAP"]["type"]["SUCCESS"], 10000)
  }

  const handlePopupClick = (popupObj) => {
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
    if (popupState.newImagePopup) { return (<NewImageForDocPopup keyName="newImagePopup" topic={folder} togglePopup={handlePopupClick} />) }
    if (popupState.openImagePopup) { return (<OpenImageForDocPopup keyName="openImagePopup" topic={folder} togglePopup={handlePopupClick} addImage={actImage} />) }
    else { return null; }
  }

  const actBold = () => {
    if (hasParentWithId(window.getSelection().anchorNode, "kp-editor")) {
      let str = "**" + window.getSelection().toString() + "**"
      let sel = window.getSelection();
      let range = undefined;
      if (sel.rangeCount) {
        range = sel.getRangeAt(0);
        range.deleteContents();
        range.insertNode(document.createTextNode(str));
      }
    }
  }

  const actItalic = () => {
    if (hasParentWithId(window.getSelection().anchorNode, "kp-editor")) {
      let str = "*" + window.getSelection().toString() + "*"
      let sel = window.getSelection();
      let range = undefined;
      if (sel.rangeCount) {
        range = sel.getRangeAt(0);
        range.deleteContents();
        range.insertNode(document.createTextNode(str));
      }
    }
  }

  const actStrikeThrough = () => {
    if (hasParentWithId(window.getSelection().anchorNode, "kp-editor")) {
      let str = "~" + window.getSelection().toString() + "~"
      let sel = window.getSelection();
      let range = undefined;
      if (sel.rangeCount) {
        range = sel.getRangeAt(0);
        range.deleteContents();
        range.insertNode(document.createTextNode(str));
      }
    }
  }

  const actHeader = (level , element) => {
    if (hasParentWithId(window.getSelection().anchorNode, "kp-editor")) {
      if (level.target.value != 0) {
        let oldStr = window.getSelection().toString()
        let str = ""
        for (let index = 0; index < level.target.value; index++) {
          str = str + "#"
        }
        str = str + " " + oldStr
        let sel = window.getSelection();
        let range = undefined;
        if (sel.rangeCount) {
          range = sel.getRangeAt(0);
          range.deleteContents();
          range.insertNode(document.createTextNode(str));
        }
      }
    }
    element.selectedIndex = 0;
  }

  const actCode = () => {
    if (hasParentWithId(window.getSelection().anchorNode, "kp-editor")) {
      let str = " `" + window.getSelection().toString() + "` "
      let sel = window.getSelection();
      let range = undefined;
      if (sel.rangeCount) {
        range = sel.getRangeAt(0);
        range.deleteContents();
        range.insertNode(document.createTextNode(str));
      }
    }
  }

  const actCodeBlock = () => {
    if (hasParentWithId(window.getSelection().anchorNode, "kp-editor")) {
      let sel = window.getSelection();
      let range = undefined;
      if (sel.rangeCount) {
        range = sel.getRangeAt(0);
        range.deleteContents();
        range.insertNode(document.createTextNode("```"));
        range.insertNode(document.createElement("br"));
        range.insertNode(document.createElement("br"));
        range.insertNode(document.createTextNode("```"));
      }
    }
  }

  const actLine = () => {
    if (hasParentWithId(window.getSelection().anchorNode, "kp-editor")) {
      let sel = window.getSelection();
      let range = undefined;
      if (sel.rangeCount) {
        range = sel.getRangeAt(0);
        range.deleteContents();
        range.insertNode(document.createElement("br"));
        range.insertNode(document.createTextNode("***"));
        range.insertNode(document.createElement("br"));
      }
    }
  }

  const actList = () => {
    if (hasParentWithId(window.getSelection().anchorNode, "kp-editor")) {
      let str = window.getSelection().toString()
      let list = []
      if (str.includes("\n")) {
        list = str.split("\n")
      }
      else {
        list[0] = str
      }
      list.reverse()
      let sel = window.getSelection();
      let range = undefined;
      if (sel.rangeCount) {
        range = sel.getRangeAt(0);
        range.deleteContents();
        for (let index = 0; index < list.length; index++) {
          let line = "- " + list[index]
          if (list.length > 1) {
            range.insertNode(document.createElement("br"));
          }
          range.insertNode(document.createTextNode(line));
        }
      }
    }
  }

  const actBlockQuote = () => {
    if (hasParentWithId(window.getSelection().anchorNode, "kp-editor")) {
      let str = window.getSelection().toString()
      let list = []
      if (str.includes("\n")) {
        list = str.split("\n")
      }
      else {
        list[0] = str
      }
      list.reverse()
      let sel = window.getSelection();
      let range = undefined;
      if (sel.rangeCount) {
        range = sel.getRangeAt(0);
        range.deleteContents();
        for (let index = 0; index < list.length; index++) {
          let line = "> " + list[index]
          if (list.length > 1) {
            range.insertNode(document.createElement("br"));
          }
          range.insertNode(document.createTextNode(line));
        }
      }
    }
  }

  const actLink = () => {
    if (hasParentWithId(window.getSelection().anchorNode, "kp-editor")) {
      let str = " [<REPLACE : ALT TEXT>](<REPLACE : WEB LINK>) "
      let sel = window.getSelection();
      let range = undefined;
      if (sel.rangeCount) {
        range = sel.getRangeAt(0);
        range.deleteContents();
        range.insertNode(document.createTextNode(str));
      }
    }
  }

  const actImage = (altText, url) => 
  {
    //let str = "![" + altText + "](" + url + ")"
    let str = "<img alt=\"" + altText + "\" src=\"" + url + "\"  style=\"margin-left: auto; margin-right: auto; display: block;\" width=\"100%\" height=\"100%\" />"
    document.getElementById("kp-editor").innerText = document.getElementById("kp-editor").innerText + "\n" + str
  }

  const actReset = async () => {
    document.getElementById("kp-editor").innerText = "";
  }

  const actSave = async () => {
    if (confirm("Are you sure you want to save update?")) {
      toastRef.current.togglePopupNotificationDisplay("Saving updates ...", res["POPUP_NOTIFICATION_MAP"]["type"]["LOADING"], 80000)
      let url = "https://laniak-keynote-api.azurewebsites.net/docs/file"
      let body = {
        "filePath": page,
        "content": document.getElementById("kp-editor").innerText,
        "commitMessage": "Updaated file : " + page,
        "authorName": "Shashank Kawle",
        "authorEmail": "shashank@test.com"
      }
      let data = await httpPut(url , body)
      document.getElementById('kp-editor').innerText = data
      toastRef.current.togglePopupNotificationDisplay("Successfully updated document", res["POPUP_NOTIFICATION_MAP"]["type"]["SUCCESS"], 10000)
    }
  }

  const actReload = async () => {
    document.getElementById("kp-editor").innerText = "";
    await initialize();
  }

  const countWords = async () => {
    updateWordCount(document.getElementById("kp-editor").innerText.length);
  }

  return (
    <div className="p-3" style={{ width: '85%', height: '100%' }}>

      <div className={`${styles.kpEditorCard}`}>
        <div className="d-flex table-responsive justify-content-between px-4 py-2" style={{ "paddingBottom": "12px !important" }}>
          <table style={{ "emptyCells": "hide", "borderSpacing": "2px" }}>
            <tbody>
              <tr>
                <td className={`${styles.kpEditorMenuBtn}`} onClick={() => actBold()}><Bold className={`${styles.kpEditorBtnImg}`} size={18} /></td>
                <td className={`${styles.kpEditorMenuBtn} mx-3`} onClick={() => actItalic()}><Italic className={`${styles.kpEditorBtnImg}`} size={16} /></td>
                {/* <td className={`${styles.kpEditorMenuBtn}`}><Underline className={`${styles.kpEditorBtnImg}`} size={16} /></td> */}
                <td className={`${styles.kpEditorMenuBtn}`} onClick={() => actStrikeThrough()}><img className={`${styles.kpEditorBtnImg}`} src='assets/strikethrough.png' /></td>
                <td className={`${styles.kpEditorBtnSecDivider}`}>
                  <div className={`${styles.kpEditorBtnImg}`}></div>
                </td>

                <td className={`${styles.kpEditorMenuBtn}`}>
                  <select onClick={(e) => actHeader(e , e.currentTarget)} className='text-smaller' style={{ "padding": "2%" }} >
                    <option>Select Header</option>
                    <option value={1}>Header 1</option>
                    <option value={2}>Header 2</option>
                    <option value={3}>Header 3</option>
                    <option value={4}>Header 4</option>
                    <option value={5}>Header 5</option>
                    <option value={6}>Header 6</option>
                  </select>
                </td>

                <td className={`${styles.kpEditorBtnSecDivider}`}>
                  <div className={`${styles.kpEditorBtnImg}`}></div>
                </td>

                {/* <td className={`${styles.kpEditorMenuBtn}`}><ChevronsUp className={`${styles.kpEditorBtnImg}`} size={16} /></td>
            <td className={`${styles.kpEditorMenuBtn}`}><ChevronsDown className={`${styles.kpEditorBtnImg}`} size={16} /></td> */}
                <td className={`${styles.kpEditorMenuBtn}`} onClick={() => actList()}><List className={`${styles.kpEditorBtnImg}`} size={16} /></td>
                <td className={`${styles.kpEditorMenuBtn}`} onClick={() => actLine()}><CreditCard className={`${styles.kpEditorBtnImg}`} size={16} /></td>
                <td className={`${styles.kpEditorMenuBtn}`} onClick={() => actCode()}><Code className={`${styles.kpEditorBtnImg}`} size={16} /></td>
                <td className={`${styles.kpEditorMenuBtn}`} onClick={() => actCodeBlock()}><Box className={`${styles.kpEditorBtnImg}`} size={16} /></td>
                <td className={`${styles.kpEditorMenuBtn}`} onClick={() => handlePopupClick("openImagePopup")}><Image className={`${styles.kpEditorBtnImg}`} size={16} /></td>
                <td className={`${styles.kpEditorMenuBtn}`} onClick={() => handlePopupClick("newImagePopup")}><UploadCloud className={`${styles.kpEditorBtnImg}`} size={16} /></td>
                <td className={`${styles.kpEditorMenuBtn}`} onClick={() => actLink()}><Link2 className={`${styles.kpEditorBtnImg}`} size={16} /></td>
                <td className={`${styles.kpEditorMenuBtn}`} onClick={() => actBlockQuote()}><MessageCircle className={`${styles.kpEditorBtnImg}`} size={16} /></td>
                <td className={`${styles.kpEditorMenuBtn}`} onClick={() => actReload()}><RefreshCcw className={`${styles.kpEditorBtnImg}`} size={16} /></td>
                <td className={`${styles.kpEditorBtnSecDivider}`}>
                  <div className={`${styles.kpEditorBtnImg}`}></div>
                </td>
                <td className={`${styles.kpEditorMenuBtn}`} onClick={() => actReset()}><RotateCw className={`${styles.kpEditorBtnImg}`} size={16} color='red' /></td>

              </tr>
            </tbody>
          </table>

          <div className="align-self-center" style={{ "cursor": "pointer" }}>
            <Save className={`${styles.kpEditorBtnImg}`} size={16} color="#60d01a" onClick={() => actSave()} />
          </div>
        </div>

        <div style={{ "borderBottom": "0.5px solid #ededed" }}></div>

        {/* <div className={`${styles.kpEditorEditingPassage}`} id="editor" contentEditable > */}
        <div className={`${styles.kpEditorEditingPassage}`} id="kp-editor" contentEditable suppressContentEditableWarning={true} onKeyUp={countWords}>
          Type something
        </div>

        <div style={{ "borderBottom": "0.5px solid #ededed" }}></div>

        <div className={`${styles.kpEditorFooter} d-flex table-responsive justify-content-between ps-4 pt-3 pb-3 pe-4`}>
          <div className={`${styles.kpEditorSupressedText}`}>
            <b>Markdown Editor &nbsp;</b>Powered by <img src="assets/logoDesign.png" width="15" height="15" /> <b>LANIAK</b>
          </div>

          <div className={`${styles.kpEditorSupressedText}`}>
            {page}
          </div>

          <div className={`${styles.kpEditorSupressedText}`}>
            Count : <span>{wordCount}</span>
          </div>
        </div>

      </div>
      <PopupWindow popupState={popupState} />
      <Toast ref={toastRef} />
    </div>
  );
}