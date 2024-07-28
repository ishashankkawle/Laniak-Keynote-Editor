'use client';
import { Anchor, GitCommit, HelpCircle, PlusSquare } from 'react-feather';
import styles from './page.module.css'
import Navbar from '@/components/navbar/navbar';
import Menubar from '@/components/menubar/menubar';
import { useEffect, useState } from 'react';
import Board from '@/components/board/board';
import { httpGet } from '../_services/httpHandler';
import ArticleBoard from '@/components/articleboard/articleboard';


export default function workflow() {

  let [window , updateState] = useState();
  let [userObj , setUser] = useState({});
  let [currentPage , openPage] = useState("");
  let [currentFolder , openFolder] = useState("");


  useEffect(() => {
    initialize();
  } , [])
  

  useEffect(() => {
    setFolder();
  } , [currentPage])
  
  const initialize = async() => 
  {
    let resp = await fetch("/api/cookie");
    resp = await resp.json()
    resp = JSON.parse(resp.value)
    setUser(resp)
  } 
  
  const setFolder = async() => 
  {
    openFolder(currentPage.split("/")[0])
  } 



  let board = null;
  if(window != "ARTICLE")
  {
    board = (<Board page={currentPage} folder={currentFolder}/>)
  }
  else
  {
    board = (<ArticleBoard page={currentPage} folder={currentFolder}/>)
  }
  
  if(userObj.name != undefined)
  {
    return (
      <div className={`row mb-0 p-0 gx-0 h-100`}>      
        <Navbar updateState={updateState} userData={userObj}/>
        <Menubar currentWindow={window} openPage={openPage}/>
        {board}
      </div>
    )
  }
  else
  {
    return null;
  }
}