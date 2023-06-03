import React, { useContext } from 'react';
import Context from '../context/Context';
import RequestAPI from '../services/RequestAPI';
import TableHead from './TableHead';
import TableBody from './TableBody';

function Table() {
  const {
    setPlanets,
    initialList,
    nameFilter,
    setNameFilter,
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
    setOrderState,
  } = useContext(Context);

  const handleSubmit = (event) => {
    event.preventDefault();
    const filters = { columnFilter, comparisonFilter, valueFilter };
    setFiltered([...filtered, filters]);
    const columnsFiltered = initialColumn.filter((element) => element !== columnFilter);
    setInitialColumn(columnsFiltered);
    setColumnFilter('population');
    setComparisonFilter('maior que');
    setValueFilter(0);
  };

  const handleRemove = (filter) => {
    const refreshFilter = filtered.filter((element) => element !== filter);
    setFiltered(refreshFilter);
    setInitialColumn([...initialColumn, filter.columnFilter]);
    if (refreshFilter.length === 0) {
      setPlanets(initialList);
    }
  };

  const handleRemoveAll = () => {
    setFiltered([]);
    setPlanets(initialList);
    setInitialColumn(initialColumns);
  };

  const handleOrder = () => {
    const newOrder = {
      column: orderFilter,
      sort: orderSort,
    };
    setOrderState(newOrder);
  };

  return (
    <form className="table-filter-container">
      <section className="filters-container">
        <label htmlFor="name-filter">
          <input
            data-testid="name-filter"
            id="name-filter"
            value={ nameFilter }
            type="text"
            onChange={ ({ target }) => setNameFilter(target.value.toLowerCase()) }
            placeholder="Filtrar por nome"
          />
        </label>
        <label htmlFor="column-filter">
          <select
            data-testid="column-filter"
            id="column-filter"
            value={ columnFilter }
            onChange={ ({ target }) => setColumnFilter(target.value) }
          >
            {
              initialColumn.map((option, index) => (
                <option key={ index }>{option}</option>
              ))
            }
          </select>
        </label>
        <label htmlFor="comparison-filter">
          <select
            data-testid="comparison-filter"
            id="comparison-filter"
            value={ comparisonFilter }
            onChange={ ({ target }) => setComparisonFilter(target.value) }
          >
            <option>maior que</option>
            <option>menor que</option>
            <option>igual a</option>
          </select>
        </label>
        <label htmlFor="value-filter">
          <input
            data-testid="value-filter"
            id="value-filter"
            value={ valueFilter }
            type="number"
            onChange={ ({ target }) => setValueFilter(target.value) }
          />
        </label>
        <button
          data-testid="button-filter"
          type="submit"
          onClick={ handleSubmit }
        >
          FILTRAR
        </button>
        <label htmlFor="column-sort">
          <select
            data-testid="column-sort"
            id="column-sort"
            name="column-sort"
            value={ orderFilter }
            onChange={ ({ target }) => setOrderFilter(target.value) }
          >
            <option>population</option>
            <option>orbital_period</option>
            <option>diameter</option>
            <option>rotation_period</option>
            <option>surface_water</option>
          </select>
        </label>
        <label htmlFor="sort-asc">
          <input
            data-testid="column-sort-input-asc"
            type="radio"
            name="sort"
            id="sort-asc"
            value="ASC"
            onChange={ ({ target }) => setOrderSort(target.value) }
          />
          ASC
        </label>
        <label htmlFor="sort-desc">
          <input
            data-testid="column-sort-input-desc"
            type="radio"
            name="sort"
            id="sort-desc"
            value="DESC"
            onChange={ ({ target }) => setOrderSort(target.value) }
          />
          DESC
        </label>
        <button
          data-testid="column-sort-button"
          type="button"
          onClick={ handleOrder }
        >
          Ordenar
        </button>
        <button
          data-testid="button-remove-filters"
          type="button"
          onClick={ handleRemoveAll }
        >
          Remover todas filtragens
        </button>
      </section>
      <section>
        <ul>
          {
            filtered.map((filter, index) => (
              <div id="filter-div" data-testid="filter" key={ index }>
                <li>
                  {`${filter.columnFilter} 
                  ${filter.comparisonFilter} 
                  ${filter.valueFilter}`}
                </li>
                <button
                  type="button"
                  onClick={ () => handleRemove(filter) }
                >
                  X
                </button>
              </div>
            ))
          }
        </ul>
      </section>
      <table>
        <RequestAPI />
        <TableHead />
        <TableBody />
      </table>
    </form>
  );
}

export default Table;
