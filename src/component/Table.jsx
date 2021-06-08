import React from 'react'
import '../App.css';
import numeral from 'numeral';

function Table(props) {
    return (
        <div className="app_table_info">
            {props.countries.map(({ country, cases }) => (
                <tr>
                    <td>{country}</td>
                    <td>
                        <strong>{numeral(cases).format("000,000")}</strong>
                    </td>
                </tr>
            ))}

        </div>
    )
}

export default Table
