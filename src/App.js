import './App.css';
import React, { useState } from 'react';
import Loader from 'react-loader-spinner';
import StratfordData from './data/Stratford.json';
import HeathrowData from './data/Heathrow.json';
import HarrowData from './data/Harrow.json';

function App() {
  const [city, setCity] = useState('');
  const [activeTab, setActiveTab] = useState({
    pharmacies: true,
    colleges: false,
    hospitals: false,
    doctors: false,
  });
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const changeCategory = (e) => {
    e.preventDefault();
    if (!city) {
      setError(true);
    } else {
      let clickedTab = e.target.value;

      switch (clickedTab) {
        case 'pharmacies':
          setActiveTab({
            pharmacies: true,
            colleges: false,
            hospitals: false,
            doctors: false,
          });

          break;

        case 'colleges':
          setActiveTab({
            pharmacies: false,
            colleges: true,
            hospitals: false,
            doctors: false,
          });
          break;

        case 'hospitals':
          setActiveTab({
            pharmacies: false,
            colleges: false,
            hospitals: true,
            doctors: false,
          });
          break;

        case 'doctors':
          setActiveTab({
            pharmacies: false,
            colleges: false,
            hospitals: false,
            doctors: true,
          });
          break;

        default:
          break;
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
            setLoading(true);
          }}
        >
          <option id='default-city' value='' defaultValue=''>
            Select a city
          </option>
          <option value='Harrow'>Harrow</option>
          <option value='Stratford'>Stratford</option>
          <option value='Heathrow'>Heathrow</option>
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
      <div className='category-div'>
        <button
          className={activeTab.pharmacies ? 'active-tab' : 'inactive-tab'}
          value='pharmacies'
          onClick={(e) => {
            changeCategory(e);
          }}
        >
          Pharmacies
        </button>
        <button
          className={activeTab.colleges ? 'active-tab' : 'inactive-tab'}
          value='colleges'
          onClick={(e) => {
            changeCategory(e);
          }}
        >
          Colleges
        </button>
        <button
          className={activeTab.hospitals ? 'active-tab' : 'inactive-tab'}
          value='hospitals'
          onClick={(e) => {
            changeCategory(e);
          }}
        >
          Hospitals
        </button>
        <button
          className={activeTab.doctors ? 'active-tab' : 'inactive-tab'}
          value='doctors'
          onClick={(e) => {
            changeCategory(e);
          }}
        >
          Doctors
        </button>
      </div>
      <hr />
      {loading && city ? (
        <LoadingSpinner />
      ) : (
        <Table activeTab={activeTab} city={city} />
      )}
    </div>
  );
}
const Table = ({ activeTab, city }) => {
  console.log(activeTab);
  console.log(city);
  let data = [];

  if (city === 'Stratford') {
    if (activeTab.pharmacies) {
      data = StratfordData.pharmacies;
    }
    if (activeTab.colleges) {
      data = StratfordData.colleges;
    }
    if (activeTab.hospitals) {
      data = StratfordData.hospitals;
    }
    if (activeTab.doctors) {
      data = StratfordData.doctors;
    }
  } else if (city === 'Harrow') {
    if (activeTab.pharmacies) {
      data = HarrowData.pharmacies;
    }
    if (activeTab.colleges) {
      data = HarrowData.colleges;
    }
    if (activeTab.hospitals) {
      data = HarrowData.hospitals;
    }
    if (activeTab.doctors) {
      data = HarrowData.doctors;
    }
  } else if (city === 'Heathrow') {
    if (activeTab.pharmacies) {
      data = HeathrowData.pharmacies;
    }
    if (activeTab.colleges) {
      data = HeathrowData.colleges;
    }
    if (activeTab.hospitals) {
      data = HeathrowData.hospitals;
    }
    if (activeTab.doctors) {
      data = HeathrowData.doctors;
    }
  }

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
                <h3 className='text-center'>
                  Please choose a city and category first!
                </h3>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

const LoadingSpinner = () => {
  return (
    <div className='loader-div'>
      <Loader type='Oval' color='#1e58b0' height='100' width='100' />
      {/*Other cool spinner types are-: 1. Bars, 2. Three dots, 3. TailSpin*/}
    </div>
  );
};
export default App;
