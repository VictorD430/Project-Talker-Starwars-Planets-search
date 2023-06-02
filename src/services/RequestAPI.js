import { useContext, useEffect } from 'react';
import Context from '../context/Context';

const url = 'https://swapi.dev/api/planets/';

function RequestAPI() {
  const { setPlanets, setInitialList } = useContext(Context);

  useEffect(() => {
    const getPlanets = async () => {
      try {
        const response = await fetch(url);
        const { results } = await response.json();
        delete results.residents;
        setPlanets(results);
        setInitialList(results);
      } catch (e) {
        console.log('RequestAPI error', e);
      }
    };
    getPlanets();
  }, [setPlanets, setInitialList]);
}

export default RequestAPI;
