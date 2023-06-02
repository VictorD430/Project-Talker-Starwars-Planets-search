import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Context from './Context';

function Provider({ children }) {
  const [planets, setPlanets] = useState([]);
  const [nameFilter, setNameFilter] = useState('');
  const [initialList, setInitialList] = useState([]);

  const state = {
    planets,
    setPlanets,
    nameFilter,
    setNameFilter,
    initialList,
    setInitialList,
  };

  useEffect(() => {
    const newList = initialList
      .filter(({ name }) => name.toLowerCase().includes(nameFilter));
    setPlanets(newList);
  }, [nameFilter, initialList]);

  return (
    <Context.Provider value={ state }>
      {children}
    </Context.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.object,
}.isRequired;

export default Provider;
