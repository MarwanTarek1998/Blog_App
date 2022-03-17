import React, { useState } from "react";
import { MDBValidation, MDBInput, MDBBtn } from "mdb-react-ui-kit";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react/cjs/react.development";

//xoxxwik6

const initialState = {
  title: "",
  description: "",
  category: "",
  imageUrl: "",
};

const options = ["Travel", "Fashion", "Fitness", "Sport", "Food", "Tech"];

const AddEditBlog = () => {
  const [formValue, setFormValue] = useState(initialState);
  const [categoryErrMsg, setCaegoryErrMsg] = useState(null);
  const [editMode, setEditMode] = useState(false);

  const navigate = useNavigate();
  const { id } = useParams();

  const { title, description, category, imageUrl } = formValue;

  //For Edit Blog

  useEffect(() => {
    if (id) {
      setEditMode(true);
      getSingleBlog(id);
    } else {
      setEditMode(false);
      setFormValue({ ...initialState });
    }
  }, [id]);

  const getSingleBlog = async (id) => {
    const response = await axios.get(`http://localhost:5000/blogs/${id}`);
    if (response.status === 200) {
      setFormValue({ ...response.data });
    } else {
      toast.error("Something went wrong");
    }
  };

  //For Edit Blog

  const getDate = () => {
    let today = new Date();

    let dd = String(today.getDay()).padStart(2, "0");
    let mm = String(today.getMonth() + 1).padStart(2, "0");
    let yy = today.getFullYear();

    let time = dd + "/" + mm + "/" + yy;

    return time;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!category) {
      setCaegoryErrMsg("Please select a category");
    }

    const imageValidation = !editMode ? imageUrl : true ;

    if (title && description && imageValidation && category) {

      const currentDate = getDate();

      if(!editMode){
        const updatedBlog = { ...formValue, date: currentDate };
        const response = await axios.post(
          "http://localhost:5000/blogs",
          updatedBlog
        );
  
        if (response.status === 201) {
          toast.success("Blog created successfully");
        } else {
          toast.error("Something went wrong");
        }
      }

      else{
        const response = await axios.put(
          `http://localhost:5000/blogs/${id}`,
          formValue
        );
  
        if (response.status === 200) {
          toast.success("Blog Updated successfully");
        } else {
          toast.error("Something went wrong");
        }
      }

      

      setFormValue({ title: "", description: "", category: "", imageUrl: "" });

      navigate("/");
    }
  };

  const onInputChange = (e) => {
    let { name, value } = e.target;
    setFormValue({ ...formValue, [name]: value });
  };

  const onUploadImage = (file) => {
    
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "xoxxwik6");
    axios
      .post("http://api.cloudinary.com/v1_1/defkl7fpy/image/upload", formData)
      .then((response) => {
        toast.info("Image Uploaded Successfully");
        setFormValue({ ...formValue, imageUrl: response.data.url });
      })
      .catch((err) => {
        toast.error("Something went wrong");
      });
  };

  const onCategoryChange = (e) => {
    setCaegoryErrMsg(null);
    setFormValue({ ...formValue, category: e.target.value });
  };

  return (
    <MDBValidation
      className="row g3"
      style={{ marginTop: "100px" }}
      noValidate
      onSubmit={handleSubmit}
    >
      <p className="fs-2 fw-bold">{editMode ? "Edit Blog" : "Add Blog"}</p>

      <div
        style={{
          margin: "auto",
          padding: "15px",
          maxWidth: "400px",
          alignContent: "center",
        }}
      >
        <MDBInput
          value={title || ""}
          name="title"
          type="text"
          onChange={onInputChange}
          required
          label="Title"
          invalid
          validation="Please provide a title"
        />
        <br />

        <MDBInput
          value={description || ""}
          name="description"
          type="text"
          onChange={onInputChange}
          required
          label="Description"
          textarea
          rows={4}
          invalid
          validation="Please provide a description"
        />
        <br />

        {!editMode && (
          <>
            <MDBInput
              type="file"
              onChange={(e) => onUploadImage(e.target.files[0])}
              required
              invalid
              validation="Please provide a image"
            />
            <br />
          </>
        )}

        <select
          className="categoryDropdown"
          value={category}
          onChange={onCategoryChange}
          name="category"
          id="category"
        >
          <option value="Please select category">Please select category</option>

          {options.map((option, indx) => (
            <option value={option || ""} key={indx}>
              {option}
            </option>
          ))}
        </select>
        {categoryErrMsg && (
          <div className="categoryErrorMsg">{categoryErrMsg}</div>
        )}
        <br />
        <br />

        <MDBBtn type="submit" style={{ marginRight: "10px" }}>
          {editMode ? "Update" : "Add"}
        </MDBBtn>
        <MDBBtn
          color="danger"
          style={{ marginRight: "10px" }}
          onClick={() => navigate("/")}
        >
          Go Back
        </MDBBtn>
      </div>
    </MDBValidation>
  );
};

export default AddEditBlog;
