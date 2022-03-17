import React, { useState, useEffect } from "react";
import {
  MDBIcon,
  MDBRow,
  MDBCol,
  MDBContainer,
  MDBBtn,
  MDBCard,
  MDBCardText,
  MDBCardTitle,
  MDBCardImage,
  MDBCardBody,
  MDBTypography,
} from "mdb-react-ui-kit";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import Badge from "../components/Badge";
import { toast } from "react-toastify";

const Blog = () => {
  const [blog, setBlog] = useState();
  const [relatedBlog, setRelatedBlog] = useState();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      getSingleBlog(id);
    }
  }, [id]);

  const getSingleBlog = async (id) => {
    const response = await axios.get(`http://localhost:5000/blogs/${id}`);
    const relatedBlogData = await axios.get(
      `http://localhost:5000/blogs?category=${response.data.category}&_start=0&_end=3`
    );

    if (response.status === 200 && relatedBlogData.status === 200) {
      setBlog(response.data);
      setRelatedBlog(relatedBlogData.data);
    } else {
      toast.error("Something went wrong");
    }
  };

  const excerpt = (str) => {
    if (str.length > 60) {
      str = str.substring(0, 60) + " ... ";
    }

    return str;
  };

  const styleInfo = {
    display: "inline",
    marginLeft: "5px",
    marginTop: "7px",
    float: "right",
  };

  return (
    <MDBContainer className="mt-4" style={{ border: "1px solid #ddd" }}>
      <Link to="/">
        <strong className="mt-3" style={{ float: "left", color: "black" }}>
          {" "}
          Go Back{" "}
        </strong>
      </Link>
      <MDBTypography
        tag="h2"
        className="text-muted mt-2"
        style={{ display: "inline-block" }}
      >
        {" "}
        {blog && blog.title}{" "}
      </MDBTypography>
      <img
        src={blog && blog.imageUrl}
        className="img-fluid rounde"
        alt={blog && blog.title}
        style={{ width: "100%", maxHeight: "600px" }}
      />

      <div style={{ marginTop: "20px" }}>
        <div style={{ height: "43px" }}>
          <MDBIcon
            style={{ float: "left" }}
            className="mt-3 me-2"
            far
            icon="calendar-alt"
            size="lg"
          />
          <strong style={{ float: "left", marginTop: "12px" }}>
            {" "}
            {blog && blog.date}{" "}
          </strong>
          <Badge styleInfo={styleInfo}> {blog && blog.category} </Badge>
        </div>
      </div>
      <MDBTypography className=" lead md-0 text-start">
        {blog && blog.description}
      </MDBTypography>

      {relatedBlog && relatedBlog.length > 0 && (
        <>
          {relatedBlog.length > 1 && <h1>Related Blogs</h1>}
          <MDBRow className="row-cols-1 row-cols-md-3">
            {relatedBlog
              .filter((item) => item.id != id)
              .map((item, index) => (
                <MDBCol className="mb-2" key={index}>
                  <MDBCard>
                    <Link to={`/blog/${item.id}`}>
                      <MDBCardImage
                        src={item.imageUrl}
                        alt={item.title}
                        position="top"
                      />
                    </Link>
                    <MDBCardBody>
                      <MDBCardTitle> {item.title} </MDBCardTitle>
                      <MDBCardText> {excerpt(item.description)} </MDBCardText>
                    </MDBCardBody>
                  </MDBCard>
                </MDBCol>
              ))}
          </MDBRow>
        </>
      )}
    </MDBContainer>
  );
};

export default Blog;
