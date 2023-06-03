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
    comparisonFilter,
    setComparisonFilter,
    valueFilter,
    setValueFilter,
    filtered,
    setFiltered,
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
