import { makeStyles } from "@material-ui/core";
import React from "react";
import Drawer from "@material-ui/core/Drawer";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import AlbumIcon from "@material-ui/icons/Album";
import CreateIcon from "@material-ui/icons/Create";
import Avatar from "@material-ui/core/Avatar";
import { useHistory, useLocation } from "react-router-dom";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => {
  return {
    page: {
      background: "#eefafd",
      width: "100%",
      minHeight: "100vh",
      padding: theme.spacing(3),
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
    title: {
      padding: theme.spacing(2),
    },
    active: {
      background: "#6fbfdf",
    },
    avatar: {
      marginLeft: theme.spacing(2),
      marginBottom: theme.spacing(3),
    },
  };
});

export default function Layout({ children }) {
  const classes = useStyles();
  const history = useHistory();
  const location = useLocation();

  const menuItems = [
    { text: "My Albums", icon: <AlbumIcon color="secondary" />, path: "/" },
    {
      text: "Create Album",
      icon: <CreateIcon color="secondary" />,
      path: "/createalbum",
    },
  ];

  return (
    <div className={classes.root}>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        anchor="left"
        classes={{ paper: classes.drawerPaper }}
      >
        <div>
          <Typography variant="h4" className={classes.title}>
            Menu
          </Typography>
        </div>
        <Avatar className={classes.avatar} alt="avatar img" src="/avtr.jpg" />
        <List>
          {menuItems.map((item) => (
            <ListItem
              button
              key={item.text}
              onClick={() => history.push(item.path)}
              className={
                location.pathname === item.path ? classes.active : null
              }
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItem>
          ))}
        </List>
      </Drawer>
      <div className={classes.page}> {children}</div>
    </div>
  );
}
