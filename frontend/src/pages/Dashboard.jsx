import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Box from "../components/Box";
import s from "../assets/styles/Dashboard.module.css";
import axios from "axios";
import Cookies from "js-cookie";
import Horizontelbox from "../components/Horizontelbox";

const Dashboard = () => {
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState("");
  const [filterdata1, setFilterdata1] = useState();
  const [filterdata2, setFilterdata2] = useState();

  const handlefilter1 = (forfil) => {
    setFilterdata1(forfil.filter((fil) => fil.visible === true));
  };
  const handlefilter2 = (forfil) => {
    setFilterdata2(forfil.filter((fil) => fil.user === Cookies.get("user")));
  };

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const res = await fetch(
          `https://www.omdbapi.com/?i=tt3896198&apikey=76915d96&s=${search}&y=${search}`
        );
        const data = await res.json();
        setMovies(data.Search);
      } catch (err) {
        console.log("Error:" + err);
      }
    };

    fetchMovies();
  }, [search]);

  useEffect(()=>{
    const fetchall = async () => {
      try {
        const res = await axios.get(`/provider`);
        handlefilter1(res.data);
        handlefilter2(res.data);
      } catch (err) {
        console.log("Error: " + err);
      }
    };

    fetchall();
  },[])

  return (
    <div>
      <Header />
      <div className={s.bod}>
        <p className={s.des}>Search by movie name or year</p>
        <input
          className={s.inputbox}
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="search & scroll down to see results"
        />
        {filterdata1 && filterdata1.length > 0 && (
          <div className={s.heading}>
            <p className={s.head}>public playlists of user</p>
          </div>
        )}
        <div className={s.mainsec}>
          {filterdata1 &&
            filterdata1.length > 0 &&
            filterdata1.map((d, ind) => (
              <div key={ind}>
                <Horizontelbox
                  image={d.items[0].poster}
                  playlistname={d.playlistName}
                  visible={d.visible}
                  full={d}
                />
              </div>
            ))}
        </div>
        {filterdata2 && filterdata2.length > 0 && (
          <div className={s.heading}>
            <p className={s.head}>users playlist</p>
          </div>
        )}
        <div className={s.mainsec}>
          {filterdata2 &&
            filterdata2.length > 0 &&
            filterdata2.map((d, ind) => (
              <div key={ind}>
                <Horizontelbox
                  image={d.items[0].poster}
                  playlistname={d.playlistName}
                  visible={d.visible}
                  full={d}
                />
              </div>
            ))}
        </div>
        {movies && movies.length > 0 && (
          <div className={s.heading}>
            <p className={s.head}>Search results</p>
            <hr />
          </div>
        )}
        <div className={s.mainsec}>
          {movies && movies.length > 0 ? (
            movies.map((movie) => (
              <div key={movie.imdbID}>
                <Box
                  title={movie.Title}
                  type={movie.Type}
                  year={movie.Year}
                  poster={movie.Poster}
                />
              </div>
            ))
          ) : (
            <p>No movies found</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
