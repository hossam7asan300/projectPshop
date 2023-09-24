import { useNavigate } from "react-router-dom";
import { Badge, Navbar, Nav, Container } from "react-bootstrap";
import { FaShoppingCart, FaUser } from "react-icons/fa";
import { LinkContainer } from "react-router-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { NavDropdown } from "react-bootstrap";
import { useLogoutMutation } from "../slices/usersApiSlice";
import { logout } from "../slices/authSlice";
import logo from "../assets/logo.png";
import SearchBox from "./SearchBox";
import { clearFilter } from "../slices/filterSlice";

const Header = () => {
   const { cartItems } = useSelector((state) => state.cart);
   const { userInfo } = useSelector((state) => state.auth);
   const dispatch = useDispatch();
   const navigate = useNavigate();

   const [logoutApiCall] = useLogoutMutation();

   const logoutHandler = async (e) => {
      try {
         await logoutApiCall().unwrap();
         dispatch(logout());
         navigate("/login");
      } catch (err) {
         console.log(err);
      }
   };
   return (
      <header>
         <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
            <Container>
               <LinkContainer to="/">
                  <Navbar.Brand onClick={() => dispatch(clearFilter())}>
                     <img
                        src={logo}
                        alt="logo"
                        width="30"
                        height="30"
                        className="d-inline-block align-top"
                     />
                     Shop
                  </Navbar.Brand>
               </LinkContainer>
               <Navbar.Toggle aria-controls="basic-navbar-nav" />
               <Navbar.Collapse id="basic-navbar-nav">
                  <Nav className="ms-auto">
                     <SearchBox />
                     <LinkContainer to="/Cart">
                        <Nav.Link>
                           <FaShoppingCart /> Cart
                           {cartItems.length > 0 && (
                              <Badge
                                 pill
                                 bg="danger"
                                 style={{ marginLeft: "5px" }}
                              >
                                 {cartItems.reduce(
                                    (acc, item) => acc + item.qty,
                                    0
                                 )}
                              </Badge>
                           )}
                        </Nav.Link>
                     </LinkContainer>
                     {userInfo ? (
                        <NavDropdown title={userInfo.name} id="username">
                           <LinkContainer to="/profile">
                              <NavDropdown.Item>Profile</NavDropdown.Item>
                           </LinkContainer>
                           <NavDropdown.Item onClick={logoutHandler}>
                              Logout
                           </NavDropdown.Item>
                        </NavDropdown>
                     ) : (
                        <LinkContainer to="/login">
                           <Nav.Link>
                              <FaUser /> Sign In
                           </Nav.Link>
                        </LinkContainer>
                     )}
                     {userInfo && userInfo.isAdmin && (
                        <NavDropdown title="Admin" id="adminmenu">
                           <LinkContainer to="/admin/userlist">
                              <NavDropdown.Item>Users</NavDropdown.Item>
                           </LinkContainer>
                           <LinkContainer to="/admin/productlist">
                              <NavDropdown.Item>Products</NavDropdown.Item>
                           </LinkContainer>
                           <LinkContainer to="/admin/orderlist">
                              <NavDropdown.Item>Orders</NavDropdown.Item>
                           </LinkContainer>
                        </NavDropdown>
                     )}
                     {userInfo && userInfo.isSupplier && (
                        <NavDropdown title="Supplier" id="suppliermenu">
                           <LinkContainer to="/supplier/myproductlist">
                              <NavDropdown.Item>MyProducts</NavDropdown.Item>
                           </LinkContainer>
                        </NavDropdown>
                     )}
                  </Nav>
               </Navbar.Collapse>
            </Container>
         </Navbar>
      </header>
   );
};
export default Header;
