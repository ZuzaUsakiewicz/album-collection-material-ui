import { makeStyles } from "@material-ui/core";
import React from "react";
import Drawer from "@material-ui/core/Drawer";
import Typography from "@material-ui/core/Typography";

const drawerWidth = 240;

const useStyles = makeStyles({
  page: {
    background: "#f0e2a6",
    width: "100%",
    minHeight: "100vh",
  },
  drawer: {
    width: drawerWidth,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  root: {
    display: "flex",
  },
});

export default function Layout({ children }) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        anchor="left"
        classes={{ paper: classes.drawerPaper }}
      >
        <div>
          <Typography variant="h4">Menu</Typography>
        </div>
      </Drawer>
      <div className={classes.page}> {children}</div>
    </div>
  );
}
