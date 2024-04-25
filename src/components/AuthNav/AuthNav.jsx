import { NavLink } from "react-router-dom";
import { Divider, Stack } from "@mui/material";

import css from "./AuthNav.module.css";

const AuthNav = () => {
  return (
    <Stack
      direction="row"
      divider={<Divider orientation="vertical" color="212121" flexItem />}
      spacing={1}
    >
      <NavLink className={css.link} to="/register">
        Register
      </NavLink>
      <NavLink className={css.link} to="/login">
        Log In
      </NavLink>
    </Stack>
  );
};
export default AuthNav;
