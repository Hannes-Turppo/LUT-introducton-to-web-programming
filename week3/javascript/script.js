const municipality_table = document.getElementById("municipality-table");

async function fetch_data(url) {
    const response = await fetch(url);
    const data = await response.json();
    return data;
}

async function set_data_to_table() {
    const data_municipality = await fetch_data("https://statfin.stat.fi/PxWeb/sq/4e244893-7761-4c4f-8e55-7a8d41d86eff");
    const data_employment = await fetch_data("https://statfin.stat.fi/PxWeb/sq/5e288b40-f8c8-4f1e-b3b0-61b86ce5c065");

    const labels = data_municipality.dataset.dimension.Alue.category.label;
    const values = data_municipality.dataset.value;
    const employment = data_employment.dataset.value;

    Object.keys(labels).forEach((key, index) => {
        // create new elements
        let new_row = document.createElement("tr");
        let new_municipality = document.createElement("td");
        let new_population = document.createElement("td");
        let new_employment = document.createElement("td");
        let new_employment_rate = document.createElement("td");

        // insert values
        new_municipality.innerText = labels[key];
        new_population.innerText = values[index];
        new_employment.innerText = employment[index];

        // calculate employment rate
        let employment_rate = (employment[index] / values[index] * 100).toFixed(2);
        if (employment_rate < 25) {
            new_row.classList.add("bad");
        } else if (employment_rate > 45) {
            new_row.classList.add("good");
        }
        new_employment_rate.innerText = employment_rate + "%";
        
        // insert to table
        new_row.appendChild(new_municipality);
        new_row.appendChild(new_population);
        new_row.appendChild(new_employment);
        new_row.appendChild(new_employment_rate);
        municipality_table.appendChild(new_row);
    });
}

set_data_to_table();