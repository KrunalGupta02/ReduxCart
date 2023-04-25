import React, { useEffect, useState } from "react";
import "./style.css";
import { Table } from "react-bootstrap";

import CardsData from "./CardsData";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { ADD, DLT, REMOVE } from "../redux/actions/action";

export const CardDetails = () => {
  const [data, setData] = useState([]);
  console.log(data);

  const { id } = useParams();
  console.log("Id of item:", id);

  const getdata = useSelector((state) => state.cartreducer.carts);
  // console.log(getdata);

  const compare = () => {
    let comparedata = getdata.filter((e) => {
      return e.id == id;
    });
    // console.log(comparedata);
    setData(comparedata);
  };

  useEffect(() => {
    compare();
  }, [id]);

  // Removing the Item
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const dlt = (id) => {
    dispatch(DLT(id));
    navigate("/");
  };

  // Add one item
  const send = (e) => {
    // console.log(e);
    dispatch(ADD(e));
  };

  // Remove one
  const remove = (item) => {
    dispatch(REMOVE(item));
  };

  return (
    <>
      <div className="container mt-2">
        <h2 className="text-center">Iteams Details Page</h2>

        <section className="container mt-3">
          <div className="itemsdetails">
            {data.map((ele) => {
              return (
                <>
                  <div className="items_img">
                    <img src={ele.imgdata} alt="" />
                  </div>

                  <div className="details">
                    <Table>
                      <tr>
                        <td>
                          <p>
                            <strong>Restaurant</strong> : {ele.rname}
                          </p>
                          <p>
                            <strong>Price</strong> : ₹{ele.price}
                          </p>
                          <p>
                            <strong>Dishes</strong> : {ele.address}
                          </p>
                          <p style={{ fontSize: "1rem", fontWeight: 500 }}>
                            <strong>Total</strong> :₹ {ele.price * ele.qnty}
                          </p>

                          <div
                            className="mt-5 d-flex justify-content-between align-items-center"
                            style={{
                              width: 100,
                              cursor: "pointer",
                              background: "#ddd",
                              color: "#111",
                            }}
                          >
                            <span
                              style={{ fontSize: 24 }}
                              onClick={
                                ele.qnty <= 1
                                  ? () => dlt(ele.id)
                                  : () => remove(ele)
                              }
                            >
                              -
                            </span>

                            <span style={{ fontSize: 22 }}>{ele.qnty}</span>

                            <span
                              style={{ fontSize: 22 }}
                              onClick={() => send(ele)}
                            >
                              +
                            </span>
                          </div>
                        </td>
                        <td>
                          <p>
                            <strong>Rating : </strong>
                            <span
                              style={{
                                background: "green",
                                color: "#fff",
                                padding: "2px 5px",
                                borderRadius: "5px",
                              }}
                            >
                              {ele.rating} ★
                            </span>
                          </p>
                          <p>
                            <strong>Order Review :</strong>
                            <span>{ele.somedata} </span>
                          </p>
                          <p>
                            <strong>Remove :</strong>
                            <span onClick={() => dlt(ele.id)}>
                              <i
                                className="fas fa-trash"
                                style={{
                                  color: "red",
                                  fontSize: 20,
                                  cursor: "pointer",
                                }}
                              ></i>
                            </span>
                          </p>
                        </td>
                      </tr>
                    </Table>
                  </div>
                </>
              );
            })}
          </div>
        </section>
      </div>
    </>
  );
};
