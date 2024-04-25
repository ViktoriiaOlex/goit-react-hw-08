import { NavLink } from "react-router-dom";
import { Divider, Stack } from "@mui/material";

import css from "./AuthNav.module.css";

const AuthNav = () => {
  return (
    <Stack
      direction="row"
      divider={<Divider orientation="vertical" color="FFCDEA" flexItem />}
      spacing={2}
    >
      <NavLink className={css.link} to="/register">
        Register
      </NavLink>
    </Stack>
  );
};
export default AuthNav;
