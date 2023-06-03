import React from 'react';
import { cleanup, fireEvent, render, screen, within } from '@testing-library/react';
import App from '../App';
import { act } from 'react-dom/test-utils';
import mockData from './mockData';

const mockApi = () => {
  jest.spyOn(global, 'fetch').mockImplementation(() => Promise.resolve({
    status: 200,
    ok: true,
    json: () => Promise.resolve(mockData)
  }))
}

describe('1 - Teste se a api faz a requisição e é renderizado na tabela', () => {
  beforeAll(mockApi);
  beforeEach(cleanup);

  it('Api faz a requisição para o endpoint correto', async () => {
    await act(async () => {
      render(<App />);
    });
    expect(global.fetch).toHaveBeenCalled();
  });
  it('A tabela é listada com os dados recebidos pela api', async () => {
    await act(async () => {
      render(<App />);
    });
    const planets = mockData.results;
    for(let planet in planets) {
      const name = await screen.findAllByText(planets[planet].name);
      expect(name).toBeInTheDocument();
      const rotation_period = await screen.findAllByText(planets[planet].rotation_period);
      expect(rotation_period).toBeGreaterThanOrEqual(1);
      const orbital_period = await screen.findAllByText(planets[planet].orbital_period);
      expect(orbital_period).toBeGreaterThanOrEqual(1);
      const diameter = await screen.findAllByText(planets[planet].diameter);
      expect(diameter).toBeGreaterThanOrEqual(1);
      const climate = await screen.findAllByText(planets[planet].climate);
      expect(climate).toBeGreaterThanOrEqual(1);
      const gravity = await screen.findAllByText(planets[planet].gravity);
      expect(gravity).toBeGreaterThanOrEqual(1);
      const terrain = await screen.findAllByText(planets[planet].terrain);
      expect(terrain).toBeGreaterThanOrEqual(1);
      const surface_water = await screen.findAllByText(planets[planet].surface_water);
      expect(surface_water).toBeGreaterThanOrEqual(1);
      const population = await screen.findAllByText(planets[planet].population);
      expect(population).toBeGreaterThanOrEqual(1);
    };
  });

  it('A tabela renderiza 13 colunas', async () => {
    await act(async () => {
      render(<App />);
    });
    expect(await screen.findAllByRole("columnheader")).toHaveLength(13);
  });

  // it('A tabela renderiza 11 linhas', async () => {
  //   await act(async () => {
  //     render(<App />);
  //   });
  //   let rows = screen.findAllByRole('tbody > tr');
  //   let column1 = within(rows).findAllByText('name');
  //   })
  //   expect(column1[0]).toBe('text 1')
  //   expect(column1[1]).toBe('text 2')
  // });
});

describe('2 - Teste os filtros', () => {
  beforeAll(mockApi);
  beforeEach(cleanup);

  it('Verifica se o campo do filtro de texto é renderizado', async () => {
    await act(async () => {
      render(<App />);
    });
    expect(await screen.findByTestId('name-filter')).toBeInTheDocument();
  });

  it('Filtra planetas com "o"', async () => {
    await act(async () => {
      render(<App />);
    });
    
    const nameFilter = await screen.findByTestId('name-filter');
    fireEvent.change(nameFilter, { target: { value: 'o' } });
    const planetNames = ['Coruscant', 'Dagobah', 'Endor', 'Hoth', 'Kamino', 'Naboo', 'Tatooine'];
    planetNames.forEach(async (planet) => {
      expect(await screen.findByText(planet)).toBeInTheDocument();
    });
  });

  it('Filtra planetas com "oo"', async () => {
    await act(async () => {
      render(<App />);
    });

    const nameFilter = await screen.findByTestId('name-filter');
    fireEvent.change(nameFilter, { target: { value: 'oo' } });
    const planetNames = ['Naboo', 'Tatooine'];
    planetNames.forEach(async (planet) => {
      expect(await screen.findByText(planet)).toBeInTheDocument();
    });
  });
});

describe('3 - Teste os filtros', () => {
  beforeAll(mockApi);
  beforeEach(cleanup);

  it('Verifica se o filtro de colunas é renderizado', async () => {
    await act(async () => {
      render(<App />);
    });
    expect(await screen.findByTestId('column-filter')).toBeInTheDocument();
  });

  it('Verifica se o filtro de comparação é renderizado', async () => {
    await act(async () => {
      render(<App />);
    });
    expect(await screen.findByTestId('comparison-filter')).toBeInTheDocument();
  });

  it('Verifica se o filtro de valor é renderizado', async () => {
    await act(async () => {
      render(<App />);
    });
    expect(await screen.findByTestId('value-filter')).toBeInTheDocument();
  });

  it('Verifica se o botão Filtrar é renderizado', async () => {
    await act(async () => {
      render(<App />);
    });
    expect(await screen.findByTestId('button-filter')).toBeInTheDocument();
  });

  it('Adiciona um filtro, remove o filtro e verifica se a tabela atualiza', async () => {
    await act(async () => {
      render(<App />);
    });
    fireEvent.change(await screen.findByTestId('column-filter'), { target: { value: 'diameter'}});
    fireEvent.change(await screen.findByTestId('comparison-filter'), { target: { value: 'maior que'}});
    fireEvent.change(await screen.findByTestId('value-filter'), { target: { value: '8000'}});
    fireEvent.click(await screen.findByTestId('button-filter'));
    const planetNames = ['Alderaan', 'Bespin', 'Coruscant', 'Dagobah', 'Kamino', 'Naboo', 'Tatooine', 'Yavin IV'];
    planetNames.forEach(async (planet) => {
      expect(await screen.findByText(planet)).toBeInTheDocument();
    });
  })

  it('Verifica se a ordem muda', async () => {
    await act(async () => {
      render(<App />);
    });
    fireEvent.click(await screen.findByTestId('column-sort-input-desc'));
    fireEvent.click(await screen.findByTestId('column-sort-button'));
    const planetNames = ['Coruscant', 'Naboo', 'Alderaan', 'Kamino', 'Endor', 'Bespin', 'Tatooine', 'Yavin IV', 'Dagobah', 'Hoth'];
    planetNames.forEach(async (planet) => {
      const planetName = await screen.findAllByTestId('planet-name');
      expect(await screen.findByText(planet)).toEqual(planetName);
    });
    // const planetName = await screen.findAllByTestId('planet-name');
    // const test = planetName.map( planet => planet.innerHTML);
    // expect(test).toEqual(planetNames);
  })
});