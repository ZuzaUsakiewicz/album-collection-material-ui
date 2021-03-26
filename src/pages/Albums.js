import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { Container } from "@material-ui/core";
import AlbumCard from "../components/AlbumCard";

export default function Albums() {
  const [albums, setAlbums] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8000/albums")
      .then((res) => res.json())
      .then((data) => setAlbums(data));
  }, []);

  const handleDelete = async (id) => {
    await fetch("http://localhost:8000/albums/" + id, { method: "DELETE" });
    const newAlbums = albums.filter((album) => album.id !== id);
    setAlbums(newAlbums);
  };

  return (
    <Container>
      <Grid container spacing={3}>
        {albums.map((album) => (
          <Grid item key={album.id} xs={12} md={6} lg={4}>
            <Paper>
              <AlbumCard album={album} handleDelete={handleDelete} />
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
