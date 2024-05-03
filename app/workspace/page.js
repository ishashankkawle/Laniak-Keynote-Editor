'use client';
import { Anchor, GitCommit, HelpCircle, PlusSquare } from 'react-feather';
import styles from './page.module.css'
import Navbar from '@/components/navbar/navbar';
import Menubar from '@/components/menubar/menubar';
import { useEffect, useState } from 'react';
import Board from '@/components/board/board';
import { httpGet } from '../_services/httpHandler';


export default function workflow() {

  let [window , updateState] = useState();
  let [currentPage , openPage] = useState("");
  let [currentFolder , openFolder] = useState();


  
  const setFolder = async() => 
  {
    openFolder(currentPage.split("/")[0])
    console.log(currentPage.split("/")[0])
  } 

  useEffect(() => {
    setFolder();
  } , [currentPage])

  
  return (
    <div className={`row mb-0 p-0 gx-0 h-100`}>      
      <Navbar updateState={updateState} />
      <Menubar currentWindow={window} openPage={openPage}/>
      <Board page={currentPage} folder={currentFolder}/>
    </div>
  )
}