const input_show = document.getElementById("input-show");
const search_show = document.getElementById("submit-data");
const show_container = document.getElementById("show-container");

// fetch data from api
async function fetch_data(url) {
    const response = await fetch(url);
    const data = await response.json();
    return data;
}

async function set_data_to_table(show) {

    // fetch data from api
    const data_shows = await fetch_data("https://api.tvmaze.com/search/shows?q=" + show);

    data_shows.forEach((show) => {
        // get values
        console.log(show);
        let show_name = show.show.name;
        let show_image = show.show.image;
        let show_summary = show.show.summary;

        // create new elements
        let new_show = document.createElement("div");
        let new_show_image = document.createElement("img");
        let new_show_info = document.createElement("div");
        let new_show_name = document.createElement("h1");
        let new_show_summary = document.createElement("p");


        // insert values
        new_show.classList.add("show-data");
        new_show_image.src = show_image.medium;
        new_show_info.classList.add("show-info");
        new_show_name.innerText = show_name;
        new_show_summary.innerHTML = show_summary;

        // insert to table
        new_show.appendChild(new_show_image);
        new_show_info.appendChild(new_show_name);
        new_show_info.appendChild(new_show_summary);
        new_show.appendChild(new_show_info);
        show_container.appendChild(new_show);
    });


}

search_show.addEventListener("click", (event) => {
    event.preventDefault();
    set_data_to_table(input_show.value);
});
