
import styles from './navbar.module.css'
import Image from 'next/image';


export default function Navbar({ updateState , userData }) {
  
  const handleClick = (e) => {
    updateState(e)
  }

  const getInitials = (str) => {
    let arrStr = str.split(" ")
    let returnValue = ""
    if (arrStr.length == "1") {
        returnValue =  arrStr[0].charAt(0).toUpperCase()
    } else {
        returnValue =  arrStr[0].charAt(0).toUpperCase() + arrStr[arrStr.length - 1].charAt(0).toUpperCase()
    }
    return returnValue;
  }

  return (
    <nav className={`${styles.kpNavbar} navbar navbar-expand-lg `}>
      <div className="container-fluid">
        <Image src="/logoEditor.png" className="m-auto img-fluid rounded-start" width={35} height={35} alt="Editor logo" />
        <a className={`navbar-brand ${styles.kpBrand}`}> &nbsp; Technote Builder</a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarScroll" aria-controls="navbarScroll" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse d-flex justify-content-between" id="navbarScroll">
          <ul className="navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll">
            <li className="nav-item">
              <a className={`${styles.kpNavlink} nav-link`} href="#" onClick={() => handleClick("DOCUMENT")}>Document</a>
            </li>
            <li className="nav-item">
              <a className={`${styles.kpNavlink} nav-link`} href="#" onClick={() => handleClick("ARTICLE")}>Article</a>
            </li>
          </ul>
          <form className="d-flex" role="search">
            <button className={`btn btn-outline-secondary ${styles.kpAvatar}`}>{getInitials(userData.name)}</button>
          </form>
        </div>
      </div>
    </nav>
  )
}