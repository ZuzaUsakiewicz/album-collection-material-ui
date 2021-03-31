import React, { useState } from "react";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import { Avatar, IconButton, Typography } from "@material-ui/core";
import { DeleteOutlined } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { lightBlue, cyan, teal } from "@material-ui/core/colors";

const useStyles = makeStyles({
  root: {
    width: "100%",
    height: "100%",
    textTransform: "capitalize",
  },
  avatar: {
    backgroundColor: (album) => {
      if (album.format === "LP") {
        return lightBlue[300];
      }
      if (album.format === "EP") {
        return teal[300];
      }
      return cyan[300];
    },
  },
});

export default function AlbumCard({ album, handleDelete }) {
  const classes = useStyles(album);
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Card elevation={4} className={classes.root}>
        <CardHeader
          avatar={
            <Avatar className={classes.avatar}>
              {album.format[0] + album.format[1].toUpperCase()}
            </Avatar>
          }
          action={
            <IconButton onClick={handleClickOpen}>
              <DeleteOutlined />
            </IconButton>
          }
          title={album.album + " by " + album.artist}
        />
        <CardContent>
          <Typography variant="body2" color="textSecondary">
            {album.details}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            {String(album.date).slice(0, 10)}
          </Typography>
        </CardContent>
      </Card>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Delete the album?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete the album? It will be gone
            permanently.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button
            onClick={() => handleDelete(album.id)}
            color="secondary"
            autoFocus
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
