import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Context from './Context';

function Provider({ children }) {
  const [planets, setPlanets] = useState([]);
  const [nameFilter, setNameFilter] = useState('');
  const [initialList, setInitialList] = useState([]);
  const initialColumns = ['population', 'orbital_period',
    'diameter', 'rotation_period', 'surface_water'];
  const [columnFilter, setColumnFilter] = useState('population');
  const [initialColumn, setInitialColumn] = useState(initialColumns);
  const [comparisonFilter, setComparisonFilter] = useState('maior que');
  const [valueFilter, setValueFilter] = useState(0);
  const [filtered, setFiltered] = useState([]);

  const state = {
    planets,
    setPlanets,
    nameFilter,
    setNameFilter,
    initialList,
    setInitialList,
    columnFilter,
    setColumnFilter,
    initialColumn,
    setInitialColumn,
    initialColumns,
    comparisonFilter,
    setComparisonFilter,
    valueFilter,
    setValueFilter,
    filtered,
    setFiltered,
  };

  useEffect(() => {
    const newList = initialList
      .filter(({ name }) => name.toLowerCase().includes(nameFilter));
    setPlanets(newList);
  }, [nameFilter, initialList]);

  useEffect(() => {
    let newFiltered = initialList;
    filtered.forEach((element) => {
      newFiltered = newFiltered.filter((elem) => {
        if (element.comparisonFilter === 'maior que') {
          return Number(elem[element.columnFilter]) > Number(element.number);
        }
        if (element.comparisonFilter === 'menor que') {
          return Number(elem[element.columnFilter]) < Number(element.number);
        }
        return (Number(elem[element.columnFilter]) === Number(element.number));
      });
    });
    setPlanets(newFiltered);
  }, [filtered, initialList]);

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
