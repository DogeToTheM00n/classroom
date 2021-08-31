import Logo from "../assets/googlelogo_clr_74x24px.svg";
import Navbar from "react-bootstrap/Navbar";
import JoinModalForm from "./JoinModalForm";
import { useState } from "react";
import CreateClassModal from "./CreateClassModal";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

const Menu = () => {
  const [show, setShow] = useState(false);
  const auth = useSelector((state) => state.auth);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const location = useLocation();
  const onClickHandler = () => {
    setShow(!show);
  };

  const callback = () => {
    setShow(false);
  };
  const logout = () => {
    dispatch({ type: "False_Auth" });
    localStorage.clear();
    window.location.reload();
  };
  return (
    <>
      <Navbar
        style={{
          borderColor: "#e0e0e0",
          borderBottomStyle: "solid",
          borderBottomWidth: "1px",
          padding: "10px 30px",
        }}
      >
        <Navbar.Brand>
          <Link to="/">
            <img src={Logo} alt="Logo" style={{ height: "5vh" }} />
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
            {!(location.pathname === "/subject") && auth && (
              <i onClick={onClickHandler} className="fa fa-plus"></i>
            )}
          </Navbar.Text>
          {auth && (
            <Navbar.Text>
              <i class="fas fa-sign-out-alt" onClick={logout}></i>
            </Navbar.Text>
          )}
        </Navbar.Collapse>
      </Navbar>
      {auth && user.role ? (
        <JoinModalForm show={show} callback={callback} />
      ) : (
        <CreateClassModal show={show} callback={callback} />
      )}
    </>
  );
};

export default Menu;
