import { Route, Routes } from "react-router-dom";
import { App } from "./components/app/App";
import { Header } from "./components/header/Header";
import Home from "./components/Home";
import { AddEmote } from "./features/emotes/AddEmote";
import { EmotesList } from "./features/emotes/emotes-list/EmotesList";
import { Users } from "./features/users/Users";

const Root = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="/" element={<Home />} />
          <Route path="/emotes" element={<EmotesList />} />
          <Route path="/addemote" element={<AddEmote />} />
          <Route path="/emoters" element={<Users />} />
        </Route>
      </Routes>
    </>
  );
};

export default Root;
