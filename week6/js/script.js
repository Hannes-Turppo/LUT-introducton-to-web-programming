const source = "https://statfin.stat.fi/PxWeb/api/v1/en/StatFin/synt/statfin_synt_pxt_12dy.px";
const submit_municipality= document.getElementById("submit-data");

submit_municipality.addEventListener("click", async (e) => {
    e.preventDefault();
    let municipality = document.getElementById("input-area").value;
    let new_municipality = "";
    let index = 0;


    // fetch area list
    const res_area_list = await fetch("https://statfin.stat.fi/PxWeb/api/v1/en/StatFin/synt/statfin_synt_pxt_12dy.px")
    const area_list = await res_area_list.json();
    const municipalities = Object.values(area_list.variables[1].valueTexts);

    
    // check if municipality is empty
    if (municipality === "") {
        new_municipality = "SSS";
    } else { // if new_municipality has a value, update chart
        municipality = municipality.toLowerCase();
        for (place in municipalities) {
            if (municipalities[place].toLowerCase() === municipality) {
                index = place;
                break;
            }
        }
        new_municipality = Object.values(area_list.variables[1].values)[index];
    }

    create_chart(new_municipality);
});

const body_for_this_fucking_data = (municipality) => { 
    const query = {
        "query": [
        {
            "code": "Vuosi",
            "selection": {
                "filter": "item",
                "values": [
                    "2000",
                    "2001",
                    "2002",
                    "2003",
                    "2004",
                    "2005",
                    "2006",
                    "2007",
                    "2008",
                    "2009",
                    "2010",
                    "2011",
                    "2012",
                    "2013",
                    "2014",
                    "2015",
                    "2016",
                    "2017",
                    "2018",
                    "2019",
                    "2020",
                    "2021"
                ]
            }
        },
        {
            "code": "Alue",
            "selection": {
                "filter": "item",
                "values": [municipality]
            }
        },
        {
            "code": "Tiedot",
            "selection": {
                "filter": "item",
                "values": ["vaesto"]
            }
        }
    ],
    "response": {
        "format": "json-stat2"
    }}
    return query;
}


// function for fetching data
const get_data = async (url, municipality) => {
    const res = await fetch(url, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(body_for_this_fucking_data(municipality))
    });

    // check for response
    if (!res.ok) {
        throw new Error(res.statusText);
    }

    // return data
    const data = await res.json();
    return data;
}

// function for creating chart
const create_chart = async (municipality) => {
    // get data
    const data = await get_data(source, municipality);
    // pick relevant stuff
    const years = Object.values(data.dimension.Vuosi.category.label);
    const municipalities = Object.values(data.dimension.Alue.category.label)
    const information = Object.values(data.dimension.Tiedot.category.label)
    const population = Object.values(data.value);

    // map data to chart
    const chart_data = {
        labels: years,
        datasets: [
            {
                name: "Population",
                values: population
            }]}

    // create chart
    new frappe.Chart("#chart", {
        title: `Population of ${municipality}`,
        data: chart_data,
        type: "line",
        height: 450,
        colors: ["#eb5146"]
    });
}


create_chart("SSS");
