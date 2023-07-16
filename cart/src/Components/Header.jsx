import React, { useEffect, useState } from "react";
import { Button, Container, Nav, Navbar, Table } from "react-bootstrap";

import Badge from "@mui/material/Badge";
import { NavLink } from "react-router-dom";

import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

import { useDispatch, useSelector } from "react-redux";

import { DLT } from "../redux/actions/action";

export const Header = () => {
  // For Badge from MUI
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  // Getting data from store of redux
  const getdata = useSelector((state) => state.cartreducer.carts);
  console.log("Cart Data", getdata);

  // Remove icon function

  const dispatch = useDispatch();

  const dlt = (id) => {
    dispatch(DLT(id));
  };

  // Total Money
  const [price, setPrice] = useState(0);
  console.log("Price", price);

  const total = () => {
    let price = 0;
    getdata.map((ele, k) => {
      price = ele.price * ele.qnty + price;
    });
    setPrice(price);
  };

  useEffect(() => {
    total();
  }, [total]);

  // Stripe payment

  const checkout = async () => {
    await fetch("http://localhost:4000/checkout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ items: getdata }),
    })
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        if (response.url) {
          window.location.assign(response.url); // Forwarding user to stripe
        }
      });
  };

  return (
    <div>
      <Navbar bg="dark" variant="dark" style={{ height: "60px" }}>
        <Container>
          <h1 className="header text-decoration-none text-danger mx-3">
            Add Cart
          </h1>

          <Nav className="me-auto">
            <NavLink to="/" className="text-decoration-none text-light">
              Home
            </NavLink>
          </Nav>
          {/* Cart  */}
          <Badge
            badgeContent={getdata.length}
            color="primary"
            // MUI badge
            id="basic-button"
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
          >
            <i
              className="fa-solid fa-cart-shopping fa-shake text-light"
              style={{ fontSize: 25, cursor: "pointer" }}
            ></i>
          </Badge>
        </Container>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          {getdata.length ? (
            <div
              className="card_details"
              style={{ width: "24rem", padding: 10, marginBottom: "1rem" }}
            >
              <Table>
                <thead>
                  <tr>
                    <th>Photo</th>
                    <th>Restaurant</th>
                  </tr>
                </thead>

                <tbody>
                  {getdata.map((e) => {
                    return (
                      <>
                        <tr>
                          <td>
                            <NavLink to={`/cart/${e.id}`} onClick={handleClose}>
                              <img
                                src={e.imgdata}
                                alt="foodImg"
                                style={{ width: "10rem", height: "10rem" }}
                              />
                            </NavLink>
                          </td>
                          <td>
                            <p>{e.rname}</p>
                            <p>Price : ₹{e.price}</p>
                            <p>Quantity : {e.qnty}</p>
                            <p
                              style={{
                                color: "red",
                                fontSize: 20,
                                cursor: "pointer",
                              }}
                              onClick={() => dlt(e.id)}
                            >
                              <i
                                className="fas fa-trash smalltrash"
                                style={{
                                  color: "red",
                                  fontSize: 20,
                                  cursor: "pointer",
                                }}
                              ></i>
                            </p>
                          </td>
                          <td
                            className="mt-5"
                            style={{
                              color: "red",
                              fontSize: 20,
                              cursor: "pointer",
                            }}
                            onClick={() => dlt(e.id)}
                          >
                            {/* This is for small screen */}
                            <i
                              className="fas fa-trash largetrash"
                              style={{
                                color: "red",
                                fontSize: 20,
                                cursor: "pointer",
                              }}
                            ></i>
                          </td>
                        </tr>
                      </>
                    );
                  })}

                  <p
                    className="text-center"
                    style={{ fontSize: "1rem", fontWeight: 500 }}
                  >
                    Total : ₹ {price}
                  </p>
                </tbody>
                <Button
                  variant="contained"
                  color="success"
                  className="checkout"
                  style={{
                    backgroundColor: "green",
                    color: "#fff",
                    fontSize: "1rem",
                    position: "absolute",
                    left: "40%",
                  }}
                  onClick={checkout}
                >
                  Checkout 💵
                </Button>
              </Table>
            </div>
          ) : (
            <div
              className="card_details d-flex justify-content-center align-items-center"
              style={{ width: "22rem", padding: 5, position: "relative" }}
            >
              <i
                className="fas fa-close smallclose"
                style={{
                  position: "absolute",
                  top: 2,
                  right: 20,
                  fontSize: 23,
                  cursor: "pointer",
                }}
                onClick={handleClose}
              ></i>
              <p style={{ fontSize: 20, textTransform: "capitalize" }}>
                Your cart is empty
              </p>
              <img
                src="/cart.gif"
                alt="cart"
                className="emptycart_img"
                style={{ width: "5rem", padding: 5 }}
              />
            </div>
          )}
        </Menu>
      </Navbar>
    </div>
  );
};
