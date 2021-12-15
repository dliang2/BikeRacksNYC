// A function that accepts two dates(start date and end date) and returns the data that are within these dates

import fetch from "node-fetch";

let URL = 'https://data.cityofnewyork.us/resource/au7q-njtk.json';

const dateSorter = async (startDate,endDate) => {
    	
    //Grab the inputs

    let start = startDate;
    let stop =  endDate;

    //validity checks
    //ensure start date is not greater than end date

    let validStartDate = new Date(start);
    let validEndDate = new Date(stop);

    if(validStartDate >= validEndDate){

        return 'Start date must not be greater than or equal to end date'
    
    }else{

        //fetch the data from the url

        const response = await fetch(URL);
        const data = await response.json()
        
        //map through the array to apply the filter based on the dates

        const filteredData = data.filter(item=>{

            //create a date object from the json for consistency and apply filter
            //and check if the response from the endpoint has a valid date
            if (item.date_inst !== undefined) {

                var date = new Date(item.date_inst)

              
                const result = date >= validStartDate && date <= validEndDate;

                //return the results
                return result

            }

        })

        //return the filtered data
        return  filteredData

    }


    
}


//testing the function

dateSorter('2009-06-16','2012-04-06').then(result=>console.log(result));

//error test
dateSorter('2019-06-16','2012-04-06').then(result=>console.log(result));