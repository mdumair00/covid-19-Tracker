import './App.css';
import React, { useState, useEffect } from 'react';
import Header from './component/Header';
import InfoBox from './component/InfoBox';
import WorldMap from './component/Map';
import Table from './component/Table';
import "leaflet/dist/leaflet.css";
import { Card, CardContent } from '@material-ui/core';
import { sortData, prettyPrintStat } from './component/util';


function App() {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState('worldwide');
  const [countryInfo, setCountryInfo] = useState({});
  const [tableData, setTableData] = useState([]);
  const [mapCenter, setMapCenter] = useState([20, 77])
  const [casesType, setCasesType] = useState('cases');
  const [mapZoom, setMapZoom] = useState(2.5)
  const [mapCountries, setMapCountries]=useState([])

  useEffect(() => {
    fetch('https://disease.sh/v3/covid-19/all')
      .then(response => response.json())
      .then(data => {
        setCountryInfo(data);
        console.log("data= ",data)
      })
  }, [])

  useEffect(() => {
    const getCountriesData = async () => {
      await fetch('https://disease.sh/v3/covid-19/countries')
        .then(response => response.json())
        .then(data => {
          const countries = data.map((country) => (
            {
              name: country.country,
              value: country.country
            }
          ));
          const sortedData = sortData(data)
          setMapCountries(data)
          setTableData(sortedData)
          setCountries(countries)
        });
    };

    getCountriesData();
  }, [])

  const changeCountry = async (event) =>{
      
    const countryCode = event.target.value;
    setCountry(countryCode)
    const url = countryCode === 'worldwide'?'https://disease.sh/v3/covid-19/all':`https://disease.sh/v3/covid-19/countries/${countryCode}`;
    await fetch(url)
    .then(response => response.json())
    .then(data => {
      setCountry(countryCode)
      console.log(data)
      setCountryInfo(data)
      if(countryCode === 'worldwide')
      { 
        setMapCenter([20, 77])
        setMapZoom(2.5)
      }
      else{
        setMapCenter([data.countryInfo.lat, data.countryInfo.long]);
        setMapZoom(4);
      }
    })
      
  }

  return (
    <div className="app">
      <div className="app_left">
        <Header
          worldwide={country}
          countries={countries}
          onChangeCountry={changeCountry}
        />
        <div className="app_stats">
          <InfoBox 
            title="Active cases" 
            className="cases"
            active={casesType==="cases"}
            isRed
            cases={prettyPrintStat(countryInfo.todayCases)} 
            total={prettyPrintStat(countryInfo.cases)} 
            onClick={(event)=> setCasesType("cases")}
          />
          <InfoBox 
            title="Recovered" 
            className="recovered"
            active={casesType==="recovered"}
            cases={prettyPrintStat(countryInfo.todayRecovered)} 
            total={prettyPrintStat(countryInfo.recovered)} 
            onClick={(event)=> setCasesType("recovered")}
          />
          <InfoBox 
            title="Deaths" 
            className="Deaths" 
            active={casesType==="deaths"}
            isGrey
            cases={prettyPrintStat(countryInfo.todayDeaths)} 
            total={prettyPrintStat(countryInfo.deaths)} 
            onClick={(event)=> setCasesType("deaths")}
          />
        </div>
        <WorldMap 
          countries={mapCountries} 
          center={mapCenter} 
          zoom={mapZoom} 
          casesType={casesType}
        />
      </div>
      <Card className="app_right">
        <CardContent className="app_table">
          <h3>Live cases by Country</h3>
          <Table
            countries={tableData} />
        </CardContent>
      </Card>
    </div>
  );
}

export default App;
