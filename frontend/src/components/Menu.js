import Logo from '../assets/googlelogo_clr_74x24px.svg'
import Navbar from 'react-bootstrap/Navbar'
import JoinModalForm from './JoinModalForm'
import { useState } from 'react'
import CreateClassModal from './CreateClassModal'
const Menu = () => {
    const [show, setShow] = useState(false)
    
    const onClickHandler = () => {
        setShow(!show)
    }

    const callback = () => {
        setShow(false)
    }
    return (
        <>
        <Navbar style = {{borderColor: "#e0e0e0", borderBottomStyle: 'solid' ,borderBottomWidth: '1px', padding: '10px 30px'}}>
                <Navbar.Brand href="#">
                    <img src={Logo} />
                </Navbar.Brand>
                <Navbar.Toggle />
                <Navbar.Collapse className="justify-content-end">
                    <Navbar.Text>
                    <i onClick = {onClickHandler} className="fa fa-plus"></i>
                    </Navbar.Text>
                </Navbar.Collapse>
        </Navbar>
        {/* <JoinModalForm show={show} callback = {callback}/> */}
        <CreateClassModal show={show} callback = {callback}/>
        </>
    )
}

export default Menu