import React, { useContext } from 'react';
import Context from '../context/Context';
import RequestAPI from '../services/RequestAPI';

function Table() {
  const {
    planets,
    nameFilter,
    setNameFilter,
  } = useContext(Context);

  const listPlanets = planets;

  return (
    <form className="table-filter-container">
      <section className="filters-container">
        <label htmlFor="name-filter">
          <input
            data-testid="name-filter"
            className="name-filter"
            value={ nameFilter }
            type="text"
            onChange={ ({ target }) => setNameFilter(target.value.toLowerCase()) }
            placeholder="Filtrar por nome"
          />
        </label>
      </section>
      <table>
        <RequestAPI />
        <thead>
          <tr>
            <th>Name</th>
            <th>Rotation Period</th>
            <th>Orbital Period</th>
            <th>Diameter</th>
            <th>Climate</th>
            <th>Gravity</th>
            <th>Terrain</th>
            <th>Surface Water</th>
            <th>Population</th>
            <th>Films</th>
            <th>Created</th>
            <th>Edited</th>
            <th>URL</th>
          </tr>
        </thead>
        <tbody>
          {listPlanets
            .map((planet, index) => (
              <tr key={ index }>
                <td>{planet.name}</td>
                <td>{planet.rotation_period}</td>
                <td>{planet.orbital_period}</td>
                <td>{planet.diameter}</td>
                <td>{planet.climate}</td>
                <td>{planet.gravity}</td>
                <td>{planet.terrain}</td>
                <td>{planet.surface_water}</td>
                <td>{planet.population}</td>
                <td>{planet.residents}</td>
                <td>{planet.films}</td>
                <td>{planet.created}</td>
                <td>{planet.edited}</td>
                <td>{planet.url}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </form>
  );
}

export default Table;
