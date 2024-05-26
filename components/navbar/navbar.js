
import styles from './navbar.module.css'

export default function Navbar({ updateState }) {


  const handleClick = (e) => {
    updateState(e)
  }

  return (
    <nav className={`${styles.kpNavbar} navbar navbar-expand-lg `}>
      <div className="container-fluid">
        <a className={`navbar-brand ${styles.kpBrand}`}>Keynote Builder</a>
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
            <button className={`btn btn-outline-secondary ${styles.kpAvatar}`}>SK</button>
          </form>
        </div>
      </div>
    </nav>
  )
}