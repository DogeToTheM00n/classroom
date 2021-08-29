const Sidebar = () => {
  const onClickhandler = () => {
      document.getElementById('circularMenu1').classList.toggle('active')
  }

  return (
      <>
    <div id="circularMenu1" className="circular-menu circular-menu-left">
    
      <a className="floating-btn" onClick={onClickhandler}>
        <i className="side-chevron fa fa-chevron-right" />
      </a>
    
      <menu className="items-wrapper">
        <a href="#" className="menu-item"><i className="fa fa-calendar" aria-hidden="true"></i></a>
        <a href="#" className="menu-item"><i className="fas fa-clipboard-list"></i></a>
        <a href="#" className="menu-item"><i className="fa fa-user" aria-hidden="true"></i></a>
      </menu>
    
    </div>
    </>
  )
}

export default Sidebar