// NavBar.jsx
import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import { REMOVE } from '../redux/actions/action';

const NavBarComp = () => {
    const getData = useSelector((state) => state.cartReducer.carts);
    const dispatch = useDispatch();

    const remove = (id) => {
        dispatch(REMOVE(id));
    };

    // popup for cart Items
    const popover = (
        <Popover id="popover-basic">
            <table>
                <thead>
                    <tr>
                        <th className='me-5 text-center'>Image</th>
                        <th className='me-5 text-center'>Item</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        getData.map((item, index) => (
                            <tr key={index} className='ms-2'>
                                <td>
                                    <img src={item.image} style={{ width: "5rem", height: "5rem", margin: "15px 15px" }} alt="" />
                                </td>
                                <td>
                                    <div className='text-center mt-3 me-3'>
                                        <p className='text-center mb-0 fw-bolder'>{item.category}</p>
                                        <p className='mb-0'>Price: $ {item.price}</p>
                                        <p className='mb-0'>Rating: {item.rating.rate}&#x2605;</p>
                                        <p className='mb-0'>{item.title.substring(0, 45)}</p>
                                        <p className='mt-1' onClick={() => remove(item.id)}> <i className="fa fa-trash fs-4 delete-icon" aria-hidden="true"></i></p>
                                    </div>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </Popover>
    );

    return (
        <Navbar bg="dark" variant="dark" className='shadow-sm py-4'>
            <Container>
                <Link style={{ textDecoration: 'none' }} to='/'>
                    <Navbar.Brand className='fw-bold fs-2'>ShopyNow</Navbar.Brand>
                </Link>
                <Nav className="me-auto">
                    <Nav.Link as={Link} to="/" className='nav-link-ltr'>Home</Nav.Link>
                    <Nav.Link as={Link} to="/products" className='nav-link-ltr'>Products</Nav.Link>
                </Nav>
                <div className="buttons">
                    <OverlayTrigger trigger="click" placement="bottom" overlay={popover}>
                        <Button variant="outline-light" className='me-2'>
                            <i className='fa fa-shopping-cart me-2'></i>{getData.length}
                        </Button>
                    </OverlayTrigger>
                    <Link to="/login" style={{ textDecoration: 'none' }}>
                        <Button variant="outline-light" className='me-2'>
                            <i className='fa fa-user-plus me-2'></i>Login
                        </Button>
                    </Link>
                    {/* Updated link for the Register button */}
                    <Link to="/register" style={{ textDecoration: 'none' }}>
                        <Button variant="outline-light" className='me-2'>
                            <i className='fa fa-sign-in me-2'></i>Register
                        </Button>
                    </Link>
                </div>
            </Container>
        </Navbar>
    );
};

export default NavBarComp;
