import React, { useState, useEffect } from "react";

export default function Albums() {
  const [albums, setAlbums] = useState([]);
  useEffect(() => {
    fetch("http://localhost:8000/albums")
      .then((res) => res.json())
      .then((data) => setAlbums(data));
  }, []);
  return (
    <div>
      {albums.map((album) => (
        <div key={album.id}>
          <h4>{album.artist}</h4>
          <p>{album.album}</p> <span>{album.format}</span>
          <p>{album.details}</p>
        </div>
      ))}
    </div>
  );
}
