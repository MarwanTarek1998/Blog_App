import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { MDBRow, MDBCol, MDBContainer, MDBTypography } from "mdb-react-ui-kit";
import Blogs from "../components/Blogs";
import Search from "../components/Search";
import Category from "../components/Category";
import LatestBlog from "../components/LatestBlog";
import Pagination from "../components/Pagination";

const Home = () => {
  const [data, setData] = useState([]);
  const [latestBlogs, setLatestBlogs] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [currentPage , setCurrentPage] = useState(0)
  const [totalBlog , setTotalBlog] = useState(null)

  const pageLimt = 5 
  const options = ["Travel", "Fashion", "Fitness", "Sport", "Food", "Tech"];

  useEffect(() => {
    loadBlogData(0,5,0);
    fetchLatestBlog();
  }, []);

  const loadBlogData = async (start , end , increase , opertation) => {
    const total = await axios.get("http://localhost:5000/blogs");
    setTotalBlog(total.data.length)
    const response = await axios.get(`http://localhost:5000/blogs?_start=${start}&_end=${end}`);
    if (response.status === 200) {
      setData(response.data);

      if(opertation === "delete"){
        setCurrentPage(0)
      }
      else{
        setCurrentPage(currentPage + increase)
      }
    } else {
      toast.error("Something went wrong");
    }
  };

  const fetchLatestBlog = async () => {
    const total = await axios.get("http://localhost:5000/blogs");
    setTotalBlog(total.data.length)
    const start = total.data.length - 4 > 0 ? total.data.length - 4 : 0;
    const end = total.data.length;

    const response = await axios.get(
      `http://localhost:5000/blogs?_start=${start}&_end=${end}`
    );

    if (response.status === 200) {
      setLatestBlogs(response.data);
    } else {
      toast.error("Something went wrong");
    }
  };

  const excerpt = (str) => {
    if (str.length > 50) {
      str = str.substring(0, 50) + " ... ";
    }

    return str;
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure that you want to delete this Blog")) {
      const response = await axios.delete(`http://localhost:5000/blogs/${id}`);
      if (response.status === 200) {
        toast.success("Blog Deleted successfully");
        loadBlogData(0,5,0,"delete");
      } else {
        toast.error("Something went wrong");
      }
    }
  };

  const onInputChange = (e) => {
    if (!e.target.value) {
      loadBlogData(0,5,0);
    }
    setSearchValue(e.target.value);
  };

  const handleSearch = async (e) => {
    e.preventDefault();

    const response = await axios.get(
      `http://localhost:5000/blogs?q=${searchValue}`
    );

    if (response.status === 200) {
      setData(response.data);
    } else {
      toast.error("Something went wrong");
    }
  };

  const handleCategory = async (category) => {
    const response = await axios.get(
      `http://localhost:5000/blogs?category=${category}`
    );
    if (response.status === 200) {
      setData(response.data);
    } else {
      toast.error("something wen wrong");
    }
  };

  return (
    <>
      <Search
        searchValue={searchValue}
        onInputChange={onInputChange}
        handleSearch={handleSearch}
      />
      <MDBRow className="mw-100">
        {data.length === 0 && (
          <MDBTypography className="text-center mb-0" tag="h2">
            No Blog Found
          </MDBTypography>
        )}

        <MDBCol>
          <MDBContainer>
            <MDBRow>
              {data.map((item, index) => (
                <Blogs
                  key={index}
                  {...item}
                  excerpt={excerpt}
                  handleDelete={handleDelete}
                />
              ))}
            </MDBRow>
          </MDBContainer>
        </MDBCol>
        <MDBCol size="3">
          <h4 className="text-start"> Latest Post </h4>
          {latestBlogs &&
            latestBlogs.map((item, index) => (
              <LatestBlog key={index} {...item} />
            ))}
          <Category options={options} handleCategory={handleCategory} />
        </MDBCol>
      </MDBRow>
      <div className="mt-3">
        <Pagination currentPage={currentPage} pageLimt={pageLimt} loadBlogsData={loadBlogData} data={data} total = {totalBlog} />
      </div>
    </>
  );
};

export default Home;
