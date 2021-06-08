import React from 'react';
import {Circle, Popup} from 'react-leaflet'
import numeral from 'numeral';

const casesTypeColors = {
    cases: {
        hex: '#cc1034',
        multiplier: 250
    },
    recovered: {
        hex: "#7dd71d",
        multiplier: 120
    },
    deaths: {
        hex: 'grey',
        multiplier: 300
    }
}

//Draw circle on the Map with interactive tooltip
export const showDataOnMap = (data, casesType="cases")=>
    data.map(country=> (
        <Circle
            center={[country.countryInfo.lat, country.countryInfo.long]}
            fillOpacity={0.4}
            pathOptions={{
                color: casesTypeColors[casesType].hex,
                fillColor: casesTypeColors[casesType].hex,
            }}
            radius={Math.sqrt(country[casesType]) * casesTypeColors[casesType].multiplier}
            // radius = {50000}
        >
            <Popup>
                <h2>I'm a Popup</h2>
            </Popup>

        </Circle>    
    ))
    
// Sorting the Country in descreasing order by the covid cases in Table component
export const sortData = (data) => {
    const sortedData = [...data]
    return sortedData.sort((a, b) => (a.cases > b.cases) ? -1 : 1)
}
//Show cases in international system (ex-1k)
export const prettyPrintStat =(stat)=>
    stat? `+${numeral(stat).format("0.0a")}` : "+0";