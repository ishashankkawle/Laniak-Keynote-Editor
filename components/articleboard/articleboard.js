'use client';
import { Bold, Box, ChevronsDown, ChevronsUp, Code, CreditCard, Image, Italic, Link, Link2, List, MessageCircle, RotateCw, Save, Underline, UploadCloud } from 'react-feather';
import styles from './articleboard.module.css'
import { useCallback, useEffect, useRef, useState } from 'react';
import NewImagePopup from '../popup/newImage/newimagepopup';
import OpenImagePopup from '../popup/openImage/openimagepopup';
import { checkParent } from '@/app/_services/util';
import { httpGet } from '@/app/_services/httpHandler';
import res from '@/app/resources';
import Toast from '../toast/toast';



//Folder is used for image popup
export default function ArticleBoard({ page , folder }) 
{
  let obj = {
    newImagePopup: false,
    openImagePopup: false
  }

  const [popupState, togglePopupState] = useState(obj)
  const [wordCount, updateWordCount] = useState(0)
  const [openPath, updateOpenPath] = useState()
  const toastRef = useRef(null)

  useEffect(() => {
    if(page != "")
    {
      initialize();
    }
  } , [page])
  
  const initialize = async() => 
  {
    toastRef.current.togglePopupNotificationDisplay("Opening document ..." , res["POPUP_NOTIFICATION_MAP"]["type"]["LOADING"] , 80000)
    let url = "https://laniak-keynote-api.azurewebsites.net/docs/file?path=" + page
    let data = await httpGet(url)
    document.getElementById('kp-editor').innerText = data 
    updateOpenPath(page.split("/").slice(1));
    toastRef.current.togglePopupNotificationDisplay("Successfully opened document" , res["POPUP_NOTIFICATION_MAP"]["type"]["SUCCESS"], 10000)
  }

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
    if (popupState.newImagePopup) {return (<NewImagePopup keyName="newImagePopup" togglePopup={handlePopupClick} />)}
    if (popupState.openImagePopup) {return (<OpenImagePopup keyName="openImagePopup" togglePopup={handlePopupClick} addImage={actImage}/>)}
    else {return null;}
  }

  const actSubscript = () =>
  { 
    if(window.getSelection().anchorNode.parentElement.id  == "kp-editor" )
    {
      let str = "<sub>" + window.getSelection().toString() + "</sub>"
      let sel = window.getSelection();
      let range = undefined;
      if (sel.rangeCount) {
        range = sel.getRangeAt(0);
        range.deleteContents();
        range.insertNode(document.createTextNode(str));
      }
    }
  }
  const actSuperscript = () =>
  { 
    if(window.getSelection().anchorNode.parentElement.id  == "kp-editor" )
    {
      let str = "<sup>" + window.getSelection().toString() + "</sup>"
      let sel = window.getSelection();
      let range = undefined;
      if (sel.rangeCount) {
        range = sel.getRangeAt(0);
        range.deleteContents();
        range.insertNode(document.createTextNode(str));
      }
    }
  }
  const actBold = () =>
  { 
    if(window.getSelection().anchorNode.parentElement.id  == "kp-editor" )
    {
      let str = "<b>" + window.getSelection().toString() + "</b>"
      let sel = window.getSelection();
      let range = undefined;
      if (sel.rangeCount) {
        range = sel.getRangeAt(0);
        range.deleteContents();
        range.insertNode(document.createTextNode(str));
      }
    }
  }

  const actItalic = () =>
  {
    if(window.getSelection().anchorNode.parentElement.id  == "kp-editor" )
    {
      let str = "<i>" + window.getSelection().toString() + "</i>"
      let sel = window.getSelection();
      let range = undefined;
      if (sel.rangeCount) {
          range = sel.getRangeAt(0);
          range.deleteContents();
          range.insertNode(document.createTextNode(str));
      }
    }
  }
  
  const actUnderline = () =>
  {
    if(window.getSelection().anchorNode.parentElement.id  == "kp-editor" )
    {
      let str = "<u>" + window.getSelection().toString() + "</u>"
      let sel = window.getSelection();
      let range = undefined;
      if (sel.rangeCount) {
          range = sel.getRangeAt(0);
          range.deleteContents();
          range.insertNode(document.createTextNode(str));
      }
    }
  }
  
  const actStrikeThrough = () =>
  {
    if(window.getSelection().anchorNode.parentElement.id  == "kp-editor" )
    {
      let str = "<s>" + window.getSelection().toString() + "</s>"
      let sel = window.getSelection();
      let range = undefined;
      if (sel.rangeCount) {
          range = sel.getRangeAt(0);
          range.deleteContents();
          range.insertNode(document.createTextNode(str));
      }
    }
  }
  
  const actHeader = (level) =>
  {
    if(window.getSelection().anchorNode.parentElement.id  == "kp-editor" )
    {
      if (level.target.value != 0) 
      {
        let oldStr = window.getSelection().toString()
        let str = ""
        switch (level.target.value) {
          case "1":
            {
              str = "<h1>" + oldStr + "</h1>"
              break;
            }
          case "2":
            {
              str = "<h2>" + oldStr + "</h2>"
              break;
            }
          case "3":
            {
              str = "<h3>" + oldStr + "</h3>"
              break;
            }
          case "4":
            {
              str = "<h4>" + oldStr + "</h4>"
              break;
            }
          case "5":
            {
              str = "<h5>" + oldStr + "</h5>"
              break;
            }
          case "6":
            {
              str = "<h6>" + oldStr + "</h6>"
              break;
            }
          case "T1":
            {
              str = "<h1 style=\"font-size: 6em;\">" + oldStr + "</h1>"
              break;
            }
          case "T2":
            {
              str = "<h1 style=\"font-size: 5em;\">" + oldStr + "</h1>"
              break;
            }
          case "T3":
            {
              str = "<h1 style=\"font-size: 4em;\">" + oldStr + "</h1>"
              break;
            }
          case "T4":
            {
              str = "<h1 style=\"font-size: 3em;\">" + oldStr + "</h1>"
              break;
            }
          case "T5":
            {
              str = "<h1 style=\"font-size: 2em;\">" + oldStr + "</h1>"
              break;
            }
          case "T6":
            {
              str = "<h1 style=\"font-size: 1em;\">" + oldStr + "</h1>"
              break;
            }
        
          default:
            break;
        }
        let sel = window.getSelection();
        let range = undefined;
        if (sel.rangeCount) {
            range = sel.getRangeAt(0);
            range.deleteContents();
            range.insertNode(document.createTextNode(str));
        }
      }
    }
  }

  const actCode = () =>
  {
    if(window.getSelection().anchorNode.parentElement.id  == "kp-editor" )
    {
      let str = "<code>" + window.getSelection().toString() + "</code>"
      let sel = window.getSelection();
      let range = undefined;
      if (sel.rangeCount) {
          range = sel.getRangeAt(0);
          range.deleteContents();
          range.insertNode(document.createTextNode(str));
      }
    }
  }
  
  const actCodeBlock = () =>
  {
    if(window.getSelection().anchorNode.parentElement.id  == "kp-editor" )
    {
      let sel = window.getSelection();
      let range = undefined;
      if (sel.rangeCount) {
          range = sel.getRangeAt(0);
          range.deleteContents();
          range.insertNode(document.createTextNode("</code></pre>"));
          range.insertNode(document.createElement("br"));
          range.insertNode(document.createElement("br"));
          range.insertNode(document.createTextNode("<pre><code>"));
      }
    }
  }

  const actLine = () =>
  {
    if(window.getSelection().anchorNode.parentElement.id  == "kp-editor" )
    {
      let sel = window.getSelection();
      let range = undefined;
      if (sel.rangeCount) {
          range = sel.getRangeAt(0);
          range.deleteContents();
          range.insertNode(document.createTextNode("<hr/>"));
          range.insertNode(document.createElement("br"));
      }
    }
  }

  const actList = () =>
  {
    if(window.getSelection().anchorNode.parentElement.parentElement.id  == "kp-editor" )
    {
      let str = window.getSelection().toString()
      let list = []
      if(str.includes("\n"))
      {
        list = str.split("\n")
      }
      else
      {
        list[0] = str
      }
      list.reverse()
      let sel = window.getSelection();
      let range = undefined;
      if (sel.rangeCount) 
      {
        range = sel.getRangeAt(0);
        range.deleteContents();
        range.insertNode(document.createTextNode("</ul>"));
        for (let index = 0; index < list.length; index++) 
        {
          let line = "<li>" + list[index] + "</li>"
          if(list.length > 1)
            {
              range.insertNode(document.createElement("br"));
            }
            range.insertNode(document.createTextNode(line));
          }  
        range.insertNode(document.createElement("br"));
        range.insertNode(document.createTextNode("<ul>"));
      }
    }
  }

  const actLink = () =>
  {
    if(window.getSelection().anchorNode.parentElement.id  == "kp-editor" )
    {
      let str = " <a href = \"[REPLACE:URL]\"> [REPLACE:ALT TEXT] </a>"
      let sel = window.getSelection();
      let range = undefined;
      if (sel.rangeCount) {
          range = sel.getRangeAt(0);
          range.deleteContents();
          range.insertNode(document.createTextNode(str));
      }
    }
  }

  const actImage = (altText , url) => 
  {
    let content = document.getElementById("kp-editor").innerText;
    console.log(content)
    content = content + "\n <img alt=\""+ altText +"\" src=\"" + url + "\"/>"
    document.getElementById("kp-editor").innerText = content;
  }

  const actReset = async() =>
  {
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


  const countWords = async() =>
  {
    updateWordCount(document.getElementById("kp-editor").innerText.length);
  }

  return (
    <div className="p-3" style={{ width: '85%', height: '100%' }}>

      <div className={`${styles.kpEditorCard}`}>
        <div className="d-flex table-responsive justify-content-between px-4 py-2" style={{ "paddingBottom" : "12px !important" }}>
          <table style={{ "emptyCells": "hide" , "borderSpacing" : "2px"}}>
            <tbody>
              <tr>
            <td className={`${styles.kpEditorMenuBtn}`} onClick={() => actBold()}><Bold className={`${styles.kpEditorBtnImg}`} size={18} /></td>
            <td className={`${styles.kpEditorMenuBtn} mx-3`} onClick={() => actItalic()}><Italic className={`${styles.kpEditorBtnImg}`} size={16} /></td>
            <td className={`${styles.kpEditorMenuBtn}`} onClick={() => actUnderline()}><Underline className={`${styles.kpEditorBtnImg}`} size={16} /></td>
            <td className={`${styles.kpEditorMenuBtn}`} onClick={() => actStrikeThrough()}><img className={`${styles.kpEditorBtnImg}`} src='assets/strikethrough.png'/></td>
            <td className={`${styles.kpEditorBtnSecDivider}`}>
              <div className={`${styles.kpEditorBtnImg}`}></div>
            </td>

            <td className={`${styles.kpEditorMenuBtn}`}>
              <select onChange={(e) => actHeader(e)} className='text-smaller' style={{"padding" : "2%" }} >
                <option value={0}>Select Header</option>
                <option value={"T1"}>Title 1</option>
                <option value={"T2"}>Title 2</option>
                <option value={"T3"}>Title 3</option>
                <option value={"T4"}>Title 4</option>
                <option value={"T5"}>Title 5</option>
                <option value={"T6"}>Title 6</option>
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
            <td className={`${styles.kpEditorMenuBtn}`} onClick={() => actSubscript()}><img className={`${styles.kpEditorBtnImg}`} src='assets/subscript.png'/></td>
            <td className={`${styles.kpEditorMenuBtn}`} onClick={() => actSuperscript()}><img className={`${styles.kpEditorBtnImg}`} src='assets/superscript.png'/></td>
            <td className={`${styles.kpEditorMenuBtn}`} onClick={() => actList()}><List className={`${styles.kpEditorBtnImg}`} size={16} /></td>
            <td className={`${styles.kpEditorMenuBtn}`} onClick={() => actLine()}><CreditCard className={`${styles.kpEditorBtnImg}`} size={16} /></td>
            <td className={`${styles.kpEditorMenuBtn}`} onClick={() => actCode()}><Code className={`${styles.kpEditorBtnImg}`} size={16} /></td>
            <td className={`${styles.kpEditorMenuBtn}`} onClick={() => actCodeBlock()}><Box className={`${styles.kpEditorBtnImg}`} size={16} /></td>
            <td className={`${styles.kpEditorMenuBtn}`} onClick={() => handlePopupClick("openImagePopup")}><Image className={`${styles.kpEditorBtnImg}`} size={16} /></td>
            <td className={`${styles.kpEditorMenuBtn}`} onClick={() => handlePopupClick("newImagePopup")}><UploadCloud className={`${styles.kpEditorBtnImg}`} size={16} /></td>
            <td className={`${styles.kpEditorMenuBtn}`} onClick={() => actLink()}><Link2 className={`${styles.kpEditorBtnImg}`} size={16} /></td>
            <td className={`${styles.kpEditorBtnSecDivider}`}>
              <div className={`${styles.kpEditorBtnImg}`}></div>
            </td>
            <td className={`${styles.kpEditorMenuBtn}`} onClick={() => actReset()}><RotateCw className={`${styles.kpEditorBtnImg}`} size={16} color='red' /></td>

            </tr>
            </tbody>
          </table>

          <div className="align-self-center" style={{"cursor" : "pointer"}}>
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
            <b>HTML Editor &nbsp;</b>Powered by <img src="assets/logoDesign.png" width="15" height="15" /> <b>LANIAK</b>
          </div>

          <div className={`${styles.kpEditorSupressedText}`}>
            {openPath}
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