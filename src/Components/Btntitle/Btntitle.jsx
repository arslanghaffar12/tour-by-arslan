import React from 'react'
import {BsDownload} from "react-icons/bs"
import { saveAs } from "file-saver";
import './Btntitle.scss'

const Btntitle = ({filelink,title}) => {

    const convertToCSV = (jsonData) => {
        const headers = Object.keys(jsonData[0]);
        const csvRows = [];
    
        // Add headers to CSV
        csvRows.push(headers.join(","));
    
        // Convert data to CSV rows
        jsonData.forEach((row) => {
          const values = headers.map((header) => row[header]);
          csvRows.push(values.join(","));
        });
    
        // Combine CSV rows into a single string
        const csvString = csvRows.join("\n");
    
        return csvString;
      };
    
      const handleDownload = () => {
        const csvData = convertToCSV(filelink);
    
        const blob = new Blob([csvData], { type: "text/csv;charset=utf-8" });
        saveAs(blob, `${title}.csv`);
      };

    return (
        <div className='main_btntitle'>
            <button onClick={handleDownload}>Download data <BsDownload/></button>
        </div>
        
    )
}

export default Btntitle
