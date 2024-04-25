import { NavLink } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { Divider, Stack } from "@mui/material";

const Navigation = () => {
  const { isLoggedIn } = useAuth();

  return (
    <Stack
      direction="row"
      divider={<Divider orientation="vertical" flexItem />}
      spacing={2}
    >
      <NavLink to="/">Home</NavLink>
      {isLoggedIn && <NavLink to="/contacts">Contacts</NavLink>}
    </Stack>
  );
};

export default Navigation;
