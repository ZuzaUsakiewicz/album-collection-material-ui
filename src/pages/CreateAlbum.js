import React, { useState } from "react";
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
import { useHistory } from "react-router";
import { KeyboardDatePicker } from "@material-ui/pickers";
// import PhotoCameraIcon from "@material-ui/icons/PhotoCamera";
// import IconButton from "@material-ui/core/IconButton";
// import Input from "@material-ui/core/Input";

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

export default function CreateAlbum() {
  const classes = useStyles();
  const history = useHistory();
  const [album, setAlbum] = useState("");
  const [artist, setArtist] = useState("");
  const [details, setDetails] = useState("");
  const [albumError, setAlbumError] = useState(false);
  const [artistError, setArtistError] = useState(false);
  const [format, setFormat] = useState("LP");
  const [date, setDate] = useState(new Date());

  const handleSubmit = (e) => {
    e.preventDefault();
    setAlbumError(false);
    setArtistError(false);
    if (album === "") {
      setAlbumError(true);
    }
    if (artist === "") {
      setArtistError(true);
    }
    if (album && artist) {
      fetch("http://localhost:8000/albums", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ album, artist, format, details, date }),
      }).then(() => history.push("/"));
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography align="left" variant="h5" className={classes.title}>
        Add Album to Your Collection
      </Typography>
      <form noValidate autoComplete="off" onSubmit={handleSubmit}>
        <TextField
          onChange={(e) => setAlbum(e.target.value)}
          className={classes.field}
          label="Title"
          variant="outlined"
          fullWidth
          required
          error={albumError}
        />
        <TextField
          onChange={(e) => setArtist(e.target.value)}
          className={classes.field}
          label="Artist"
          variant="outlined"
          fullWidth
          required
          error={artistError}
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

        {/* <label htmlFor="icon-button-file">
          <Input accept="image/*" id="icon-button-file" type="file" />
          <IconButton
            color="primary"
            aria-label="upload picture"
            component="span"
          >
            <PhotoCameraIcon />
          </IconButton>
        </label> */}
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
