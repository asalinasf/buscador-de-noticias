import axios from "axios";
import { useState, useEffect, createContext } from "react";

const NoticiasCotext = createContext();

const NoticiasProvider = ({ children }) => {
  const [categoria, setCategoria] = useState("general");
  const [noticias, setNoticias] = useState([]);
  const [pagina, setPagina] = useState(1);
  const [totalNoticias, seTtotalNoticias] = useState(0);

  useEffect(() => {
    const consultarAPI = async () => {
      const url = `https://newsapi.org/v2/top-headlines?country=mx&category=${categoria}&apikey=${
        import.meta.env.VITE_API_KEY
      }`;
      const { data } = await axios(url);
      seTtotalNoticias(data.totalResults);
      setNoticias(data.articles);
      setPagina(1);
    };
    consultarAPI();
  }, [categoria]);

  useEffect(() => {
    const consultarAPI = async () => {
      const url = `https://newsapi.org/v2/top-headlines?country=mx&page=${pagina}&category=${categoria}&apikey=${
        import.meta.env.VITE_API_KEY
      }`;
      const { data } = await axios(url);
      seTtotalNoticias(data.totalResults);
      setNoticias(data.articles);
    };
    consultarAPI();
  }, [pagina]);
  const handleChangeCategoria = (e) => {
    setCategoria(e.target.value);
  };
  const handleChangePagina = (e, valor) => {
    setPagina(valor);
  };
  return (
    <NoticiasCotext.Provider
      value={{
        categoria,
        handleChangeCategoria,
        noticias,
        totalNoticias,
        handleChangePagina,
        pagina,
      }}
    >
      {children}
    </NoticiasCotext.Provider>
  );
};

export { NoticiasProvider };

export default NoticiasCotext;
