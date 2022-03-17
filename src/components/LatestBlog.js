import { MDBCard, MDBCardBody, MDBCardImage, MDBCol, MDBRow } from "mdb-react-ui-kit";
import React from "react";
import { Link } from "react-router-dom";

const LatestBlog = ({ imageUrl, id, title }) => {
  return (
    <Link to={`/blog/${id}`}>
      <MDBCard className="mt-2" style={{ maxWidth: "300px", height: "80px" }}>
        <MDBRow className="g-0">
          <MDBCol md="3">
            <MDBCardImage
              src={imageUrl}
              fluid
              alt={title}
              className="rounded"
              style={{ height: "80px" }}
            />
          </MDBCol>
          <MDBCol md='9'>
                <MDBCardBody>
                    <p className="text-start latest-title">{title}</p>
                </MDBCardBody>
          </MDBCol>
        </MDBRow>
      </MDBCard>
    </Link>
  );
};

export default LatestBlog;
