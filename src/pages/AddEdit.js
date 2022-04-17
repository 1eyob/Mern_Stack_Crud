import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import "./AddEdit.css";
import axios from "axios";
import { toast } from "react-toastify";

const initialState = {
  name: "",
  email: "",
  contact: "",
};

const AddEdit = () => {
  const [state, setState] = useState(initialState);
  const { name, email, contact } = state;
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {

    axios.get(`http://localhost:5000/api/get/${id}`)
    .then((resp) => setState({...resp.data[0]}));
  }, [id]);


  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !contact) {
      toast.error("please provide the information!");
    } else {
        if(!id)
        {
            axios
            .post("http://localhost:5000/api/post", {
              name,
              email,
              contact,
            })
            .then(() => {
              setState({ name: "", email: "", contact: "" });
            })
            .catch((err) => toast.err(err.response.data));
          toast.success("contact added successfully");
         
        }
        else{
            axios.put(`http://localhost:5000/api/update/${id}`, {
              name,
              email,
              contact,
            })
            .then(() => {
              setState({ name: "", email: "", contact: "" });
            })
            .catch((err) => toast.err(err.response.data));
          toast.success("contact updated successfully");
       
        }
         setTimeout(() => {
            navigate.push("/");
          }, 500);
     
    }
  };
  const handleInput = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };

  return (
    <div style={{ marginTop: "100px" }}>
      <form
        style={{
          margin: "auto",
          padding: "15px",
          maxWidth: "400px",
          alignContent: "center",
        }}
        onSubmit={handleSubmit}
      >
        <labe htmlFor="name">Name</labe>
        <input
          type="text"
          name="name"
          id="name"
          placeholder="Your Name"
          value={name || ""}
          onChange={handleInput}
        />

        <labe htmlFor="email">Email</labe>
        <input
          type="email"
          name="email"
          id="email"
          placeholder="Your Email"
          value={email || ""}
          onChange={handleInput}
        />

        <labe htmlFor="contact">Contact</labe>
        <input
          type="number"
          name="contact"
          id="contact"
          placeholder="Your Contact"
          value={contact || ""}
          onChange={handleInput}
        />

        <input type="submit" value={id ? "Update" : "Save"}/>

        <Link to="/">
          <input type="button" value="Go Back" />
        </Link>
      </form>
    </div>
  );
};

export default AddEdit;
