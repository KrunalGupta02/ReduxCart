import React, { useState } from "react";
import { Button, Card } from "react-bootstrap";

import CardsData from "./CardsData";
import "./style.css";
import { useDispatch } from "react-redux";
import { ADD } from "../redux/actions/action";

import Stack from "@mui/material/Stack";
// import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

export const Cards = () => {
  // Mui SnackBar
  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  // Mui end

  const [data, setData] = useState(CardsData);
  console.log("CardsData", data);

  const dispatch = useDispatch();

  const send = (e) => {
    // This is for MUI snackbar
    handleClick();
    console.log("selected item", e);
    dispatch(ADD(e));
  };
  return (
    <div className="container mt-3">
      <h2 className="text-center">Add to Cart Project</h2>

      <div className="row d-flex justify-content-center align-items-center">
        {data.map((element, id) => {
          return (
            <React.Fragment key={id}>
              {/*We have add bcz we can insert the key={id} */}
              <Card
                style={{ width: "20rem", border: "none" }}
                className="mx-2 mt-4 card_style"
              >
                <Card.Img
                  variant="top"
                  src={element.imgdata}
                  style={{ height: "16rem" }}
                  className="mt-3"
                />
                <Card.Body>
                  <Card.Title>{element.rname}</Card.Title>
                  <Card.Text>Price : ₹ {element.price}</Card.Text>
                  <div className="button_div d-flex justify-content-center">
                    <Stack spacing={2} sx={{ width: "100%" }}>
                      <Button
                        variant="primary"
                        className="col-lg-12"
                        onClick={() => send(element)}
                      >
                        Add to Cart
                      </Button>

                      <Snackbar
                        open={open}
                        autoHideDuration={1000}
                        onClose={handleClose}
                      >
                        <Alert
                          onClose={handleClose}
                          severity="success"
                          sx={{ width: "100%" }}
                        >
                          Item Added... 😁
                        </Alert>
                      </Snackbar>
                    </Stack>
                  </div>
                </Card.Body>
              </Card>
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};
