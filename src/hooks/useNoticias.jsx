import { useContext } from "react";
import NoticiasCotext from "../context/NoticiasProvider";

const useNoticias = () => {
  return useContext(NoticiasCotext);
};

export default useNoticias;
