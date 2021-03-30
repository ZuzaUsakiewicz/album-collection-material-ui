import React from "react";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import { IconButton, Typography } from "@material-ui/core";
import { DeleteOutlined } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  root: {
    width: "100%",
    height: "100%",
  },
});

export default function AlbumCard({ album, handleDelete }) {
  const classes = useStyles();

  return (
    <div>
      <Card elevation={4} className={classes.root}>
        <CardHeader
          action={
            <IconButton onClick={() => handleDelete(album.id)}>
              <DeleteOutlined />
            </IconButton>
          }
          title={album.album + " by " + album.artist}
          subheader={album.format}
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
    </div>
  );
}
