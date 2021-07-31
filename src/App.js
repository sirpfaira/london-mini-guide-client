import './App.css';
import React, { useState } from 'react';
import Loader from 'react-loader-spinner';
//if the react app is not starting type in terminal "npm install react-loader-spinner --save"
//Live demo - https://cyf-sirpfaira-london-mini-guide.netlify.app/

function App() {
  const [city, setCity] = useState('');
  const [category, setCategory] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const CITIES = ['STRATFORD', 'HARROW', 'HEATHROW'];
  const [info, setInfo] = useState([]);

  const changeCategory = (e) => {
    e.preventDefault();
    if (!city) {
      setError(true);
    } else {
      setLoading(true);
      let clickedTab = e.target.value;

      if (clickedTab) {
        console.log(clickedTab);
        setCategory(clickedTab);
        console.log(`${city}/${clickedTab}`);

        fetch(`https://london-mini-guide.glitch.me/${city}/${clickedTab}`)
          .then((res) => res.json())
          .then((data) => {
            setLoading(false);
            setInfo([...data]);
          })
          .catch((error) => {
            setLoading(false);
            setError(true);
            console.log(error);
          });
      }
    }
  };

  return (
    <div className='App'>
      <div className='header-div'>
        <h1 className='header-text'>City Mini Guide</h1>
      </div>
      <hr />
      <div className='select-div'>
        <span>Choose a city:</span>
        <select
          className='city-selector'
          onChange={(e) => {
            setCity(e.target.value);
            setError(false);
          }}
        >
          <option id='default-city' value='' defaultValue=''>
            Select a city
          </option>
          {CITIES.map((city, index) => (
            <option key={index} value={city}>
              {pascalCase(city)}
            </option>
          ))}
        </select>
      </div>
      {error && (
        <>
          <hr className='mt-2 mb-2' />
          <div className='error-div'>
            <h5 className='error-text'>
              Check out your request, a city and category must be chosen. No
              default values are provided.
            </h5>
          </div>
        </>
      )}
      <hr />
      <Categories changeCategory={changeCategory} category={category} />
      <hr />
      {loading && city ? <LoadingSpinner /> : <Table info={info} />}
    </div>
  );
}

const Table = ({ info }) => {
  let data = [...info];
  return (
    <div>
      <table className='table'>
        <thead>
          <tr>
            <th scope='col' style={{ width: '7%' }}>
              #
            </th>
            <th scope='col' style={{ width: '25%' }}>
              Name
            </th>
            <th scope='col' style={{ width: '15%' }}>
              Phone
            </th>
            <th scope='col' style={{ width: '28%' }}>
              Address
            </th>
            <th scope='col' style={{ width: '25%' }}>
              Website
            </th>
          </tr>
        </thead>
        <tbody>
          {data && data.length > 0 ? (
            data.map((place, i) => {
              return (
                <tr key={i} className={i % 2 === 0 ? 'odd-row' : 'even-row'}>
                  <th scope='row' className='cell-padding'>
                    {i + 1}
                  </th>
                  <td className='cell-padding'>
                    {place.name ? place.name : 'N/A'}
                  </td>
                  <td className='cell-padding'>
                    {place.phone ? place.phone : 'N/A'}
                  </td>
                  <td className='cell-padding'>
                    {place.address ? place.address : 'N/A'}
                  </td>
                  <td className='cell-padding'>
                    {place.website ? (
                      <a href={place.website} target='_blank' rel='noreferrer'>
                        {place.name}
                      </a>
                    ) : (
                      'N/A'
                    )}
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan='5'>
                <h3 className='text-center'>No data to show!</h3>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

const Categories = ({ changeCategory, category }) => {
  const CATEGORIES = ['PHARMACIES', 'COLLEGES', 'HOSPITALS', 'DOCTORS'];
  return (
    <div className='category-div'>
      {CATEGORIES.map((cat, i) => (
        <button
          className={cat === category ? 'active-tab' : 'inactive-tab'}
          value={cat}
          key={i}
          onClick={(e) => {
            changeCategory(e);
          }}
        >
          {pascalCase(cat)}
        </button>
      ))}
    </div>
  );
};

const LoadingSpinner = () => {
  //Other cool spinner types are-: 1. Bars, 2. Oval, 3. TailSpin
  return (
    <div className='loader-div'>
      <Loader type='ThreeDots' color='#1e58b0' height='100' width='100' />
    </div>
  );
};

const pascalCase = (string) => {
  return string
    .split(' ')
    .map((word) => {
      return word.slice(0, 1).toUpperCase() + word.slice(1).toLowerCase();
    })
    .join(' ');
};

export default App;
