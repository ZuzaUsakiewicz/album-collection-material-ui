import React, { useState, useEffect } from "react";
import { useLocation, useHistory } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import { KeyboardDatePicker } from "@material-ui/pickers";
import Checkbox from "@material-ui/core/Checkbox";
import Favorite from "@material-ui/icons/Favorite";
import FavoriteBorder from "@material-ui/icons/FavoriteBorder";

const useStyles = makeStyles((theme) => {
  return {
    field: {
      margin: 10,
      display: "block",
    },
    title: {
      padding: theme.spacing(3),
    },
  };
});

function EditAlbum() {
  const location = useLocation();
  const history = useHistory();
  const classes = useStyles();
  const [getAlbum, setGetAlbum] = useState([]);
  const albumID = location.pathname.replace("/editalbum/", "");
  const [album, setAlbum] = useState(getAlbum.album);
  const [artist, setArtist] = useState(getAlbum.artist);
  const [details, setDetails] = useState(getAlbum.details);
  const [format, setFormat] = useState("LP");
  const [date, setDate] = useState(new Date());
  const [favorite, setFavorite] = useState(false);
  //   const [albumError, setAlbumError] = useState(false);
  //   const [artistError, setArtistError] = useState(false);
  useEffect(() => {
    fetch("http://localhost:8000/albums/" + albumID)
      .then((res) => res.json())
      .then((data) => setGetAlbum(data));
  }, [albumID]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // setAlbumError(false);
    // setArtistError(false);
    if (album === "") {
      setAlbum(getAlbum.album);
    }
    if (artist === "") {
      setArtist(getAlbum.artist);
    }
    if (album && artist) {
      fetch("http://localhost:8000/albums/" + albumID, {
        method: "PUT",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({
          id: albumID,
          album,
          artist,
          details,
          format,
          date,
          favorite,
        }),
      }).then(() => history.push("/"));
    }
  };
  const handleChange = (event) => {
    setFavorite(event.target.checked);
  };

  return (
    <Container maxWidth="sm">
      <Typography align="left" variant="h5" className={classes.title}>
        You're editing {getAlbum.album} by {getAlbum.artist}
      </Typography>

      <form noValidate autoComplete="off" onSubmit={handleSubmit}>
        <TextField
          onChange={(e) => setAlbum(e.target.value)}
          defaultValue={getAlbum.album}
          className={classes.field}
          label={"Title"}
          variant="outlined"
          fullWidth
          required
          //   error={albumError}
        />
        <TextField
          onChange={(e) => setArtist(e.target.value)}
          className={classes.field}
          defaultValue={getAlbum.artist}
          label="Artist"
          variant="outlined"
          fullWidth
          required
          //   error={artistError}
        />
        <TextField
          onChange={(e) => setDetails(e.target.value)}
          className={classes.field}
          label="Details"
          variant="outlined"
          fullWidth
          multiline
          rows={5}
          placeholder="f.e. tracklist for an album"
        />

        <KeyboardDatePicker
          margin="normal"
          id="date-picker-dialog"
          label="Release Date"
          format="MM/dd/yyyy"
          value={date}
          onChange={setDate}
          KeyboardButtonProps={{
            "aria-label": "change date",
          }}
        />

        <Checkbox
          icon={<FavoriteBorder />}
          checkedIcon={<Favorite />}
          name="checkedH"
          onChange={handleChange}
        />
        <FormControl className={classes.field}>
          <FormLabel>Format</FormLabel>
          <RadioGroup
            value={format}
            onChange={(e) => setFormat(e.target.value)}
          >
            <FormControlLabel value="LP" control={<Radio />} label="LP" />
            <FormControlLabel value="EP" control={<Radio />} label="EP" />
            <FormControlLabel
              value="Single"
              control={<Radio />}
              label="Single"
            />
          </RadioGroup>
        </FormControl>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          endIcon={<AddIcon />}
        >
          Add
        </Button>
      </form>
    </Container>
  );
}

export default EditAlbum;
