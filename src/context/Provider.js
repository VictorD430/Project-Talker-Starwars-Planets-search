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
  const [orderFilter, setOrderFilter] = useState('population');
  const [orderSort, setOrderSort] = useState('');
  const orderObj = {
    column: 'population',
    sort: 'ASC' };
  const [orderState, setOrderState] = useState(orderObj);

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
    orderFilter,
    setOrderFilter,
    orderSort,
    setOrderSort,
    orderState,
    setOrderState,
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
          return Number(elem[element.columnFilter]) > Number(element.valueFilter);
        }
        if (element.comparisonFilter === 'menor que') {
          return Number(elem[element.columnFilter]) < Number(element.valueFilter);
        }
        return (Number(elem[element.columnFilter]) === Number(element.valueFilter));
      });
    });
    setPlanets(newFiltered);
  }, [filtered, initialList]);

  const sortFunction = () => {
    if (orderState.sort === 'ASC') {
      const planetsA = planets
        .filter((planet) => planet[orderState.column] === 'unknown');
      const planetsB = planets
        .filter((planet) => planet[orderState.column] !== 'unknown');
      planetsB
        .sort((a, b) => Number(a[orderState.column]) - (Number(b[orderState.column])));
      setPlanets([...planetsB, ...planetsA]);
    }
    if (orderState.sort === 'DESC') {
      const planetsA = planets
        .filter((planet) => planet[orderState.column] === 'unknown');
      const planetsB = planets
        .filter((planet) => planet[orderState.column] !== 'unknown');
      planetsB
        .sort((a, b) => Number(b[orderState.column]) - (Number(a[orderState.column])));
      setPlanets([...planetsB, ...planetsA]);
    }
  };

  useEffect(sortFunction, [setPlanets, orderState]);

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
