import React from 'react'
import { Select, MenuItem, FormControl } from '@material-ui/core'
import '../App.css'

function Header(props) {

    function handleCountryChange(event) {
        props.onChangeCountry(event)
    }

    return (
        <>
            <div className="header">
                <h1 className="app_title">COVID-19 TRACKER</h1>
                <FormControl>

                    <Select className="app_dropdown" variant="outlined" onChange={handleCountryChange} value={props.worldwide}>
                        <MenuItem value="worldwide">Worldwide</MenuItem>
                        {props.countries.map(country =>
                            <MenuItem value={country.value}>{country.name}</MenuItem>
                        )}
                    </Select>
                </FormControl>
            </div>
        </>
    )
}

export default Header
