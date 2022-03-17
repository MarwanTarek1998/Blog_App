import React from "react";
import {
  MDBCol,
  MDBCard,
  MDBCardTitle,
  MDBCardText,
  MDBCardImage,
  MDBBtn,
  MDBIcon,
  MDBCardBody,
} from "mdb-react-ui-kit";
import { Link } from "react-router-dom";
import Badge from "./Badge";

const Blogs = ({
  title,
  description,
  category,
  id,
  imageUrl,
  excerpt,
  handleDelete,
}) => {
  return (
    <MDBCol className="mb-3" size="4">
      <MDBCard className="h-100 mt-2" style={{ maxWidth: "22rem" }}>
        <MDBCardImage
          src={imageUrl}
          alt={title}
          position="top"
          className="mw-100"
          style={{ height: "180px" }}
        />
        <MDBCardBody>
          <MDBCardTitle>{title}</MDBCardTitle>
          <MDBCardText>
            {excerpt(description)}
            <Link to={`/blog/${id}`}>Read More</Link>
          </MDBCardText>
          <Badge>{category}</Badge>
          <span>
            <MDBBtn
              className="mt-1"
              tag="a"
              color="none"
              onClick={() => handleDelete(id)}
            >
              <MDBIcon
                fas
                icon="trash"
                style={{ color: "#dd4b39" }}
                size="lg"
              />
            </MDBBtn>
            <Link to={`/editBlog/${id}`}>
                <MDBIcon
                  fas
                  icon="edit"
                  style={{ color: "55acee", marginLeft: "10px" }}
                />
            </Link>
          </span>
        </MDBCardBody>
      </MDBCard>
    </MDBCol>
  );
};

export default Blogs;
