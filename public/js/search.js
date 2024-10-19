function searchByYearMake() {
    const year = document.getElementById("year").value;
    const make = document.getElementById("make").value;
    axios
      .get(`/searchByYearMake?year=${year}&make=${make}`)
      .then((response) => {
        displayYearMakeResults(response.data, "searchByYearMakeResult");
      })
      .catch((error) => {
        console.error("Error searching cars by year and make:", error);
        document.getElementById("searchByYearMakeResult").innerHTML =
          "Error occurred.";
      });
  }

  function searchByYearMakeModel() {
    const year = document.getElementById("yearModel").value;
    const make = document.getElementById("makeModel").value;
    const model = document.getElementById("model").value;
    axios
      .get(
        `/searchByYearMakeModel?year=${year}&make=${make}&model=${model}`
      )
      .then((response) => {
        displayYearMakeModelResults(
          response.data,
          "searchByYearMakeModelResult"
        );
      })
      .catch((error) => {
        console.error(
          "Error searching cars by year, make, and model:",
          error
        );
        document.getElementById("searchByYearMakeModelResult").innerHTML =
          "Error occurred.";
      });
  }

  function searchByColor() {
    const year = document.getElementById("yearColor").value;
    const make = document.getElementById("makeColor").value;
    const model = document.getElementById("modelColor").value;
    const color = document.getElementById("color").value;

    axios
      .get(
        `/searchByColor?year=${year}&make=${make}&model=${model}&color=${color}`
      )
      .then((response) => {
        displayColorResults(response.data, "searchByColorResult");
      })
      .catch((error) => {
        console.error("Error searching cars by color:", error);
        document.getElementById("searchByColorResult").innerHTML =
          "Error occurred.";
      });
  }

function searchByFuel() {
  const model = document.getElementById("modelFuelTransmission").value;
  const fuelType = document.getElementById("fuelType").value;

  axios
      .get(`/searchByFuel?model=${model}&fuel_type=${fuelType}`)
      .then((response) => {
        console.log(response.data);
          displaySearchResults(response.data, "searchByFuelResult");
      })
      .catch((error) => {
          console.error("Error searching cars by fuel type and transmission:", error);
          document.getElementById("searchByFuelResult").innerHTML = "Error occurred.";
      });
}



function displaySearchResults(data, elementId) {
  const container = document.getElementById(elementId);
  container.innerHTML = "";

  if (data && data.length > 0) {
      data.forEach((car) => {
          const carInfo = document.createElement("div");
          carInfo.classList.add("car-info", "card", "my-3", "p-3");

          const icons = {
              city_mpg: "fas fa-gas-pump",
              class: "fas fa-car",
              combination_mpg: "fas fa-tachometer-alt",
              cylinders: "fas fa-cogs",
              displacement: "fas fa-ruler-horizontal",
              drive: "fas fa-road",
              fuel_type: "fas fa-gas-pump",
              highway_mpg: "fas fa-road",
              make: "fas fa-car",
              model: "fas fa-car",
              transmission: "fas fa-cogs",
              year: "fas fa-calendar-alt"
          };

          const customLabels = {
              city_mpg: "City MPG",
              class: "Class",
              combination_mpg: "Combination MPG",
              cylinders: "Cylinders",
              displacement: "Displacement",
              drive: "Drive",
              fuel_type: "Fuel Type",
              highway_mpg: "Highway MPG",
              make: "Make",
              model: "Model",
              transmission: "Transmission",
              year: "Year"
          };

          for (const [key, value] of Object.entries(car)) {
              const detail = document.createElement("p");
              const labelText = customLabels[key] || key.replace('_', ' ').toUpperCase(); // Use custom label if available, otherwise format key
              detail.innerHTML = `<i class="${icons[key]} text-danger"></i> <strong>${labelText}</strong>: ${value}`;
              carInfo.appendChild(detail);
          }

          container.appendChild(carInfo);
      });
  } else {
      container.innerHTML = "<p>No cars found.</p>";
  }
}






  function displayYearMakeResults(data, elementId) {
    const container = document.getElementById(elementId);
    container.innerHTML = "";

    // Get language preference from localStorage, default to 'en'
    const lang = localStorage.getItem("language") || "en";

    if (data && data.listings && data.listings.length > 0) {
        data.listings.forEach((listing) => {
          const row = document.createElement("div");
          row.classList.add("row", "mb-3");

          const imageColumn = document.createElement("div");
          imageColumn.classList.add("col-md-4");
          if (listing.media && listing.media.photo_links && listing.media.photo_links.length > 0) {
                const img = document.createElement("img");
                img.src = listing.media.photo_links[0];
                img.classList.add("img-fluid", "rounded");
                img.style.maxWidth = "200px";
                img.style.maxHeight = "150px";
                imageColumn.appendChild(img);
            }

            row.appendChild(imageColumn);

            // Car details column
            const detailsColumn = document.createElement("div");
            detailsColumn.classList.add("col-md-8");

            const title = document.createElement("h5");
            title.textContent = `${listing.build.year} ${listing.build.make} ${listing.build.model} ${listing.build.trim}`;

            const price = document.createElement("p");
            price.textContent = `${lang === "en" ? "Price" : "Цена"}: $${listing.price}`;

            const country = document.createElement("p");
            country.textContent = `${lang === "en" ? "Country" : "Страна"}: ${listing.dealer.country}`;

            const model = document.createElement("p");
            model.textContent = `${lang === "en" ? "Model" : "Модель"}: ${listing.build.model}`;

            detailsColumn.appendChild(title);
            detailsColumn.appendChild(price);
            detailsColumn.appendChild(country);
            detailsColumn.appendChild(model);

            row.appendChild(detailsColumn);

            container.appendChild(row);
        });
    } else {
        container.innerHTML = `<p>${lang === "en" ? "No cars found." : "Автомобили не найдены."}</p>`;
    }
}

function displayYearMakeModelResults(data, elementId) {
    const container = document.getElementById(elementId);
    container.innerHTML = "";

    // Get language preference from localStorage, default to 'en'
    const lang = localStorage.getItem("language") || "en";

    if (data && data.listings && data.listings.length > 0) {
        data.listings.forEach((listing) => {
            const row = document.createElement("div");
            row.classList.add("row", "mb-3");

            const imageColumn = document.createElement("div");
            imageColumn.classList.add("col-md-4");

            if (listing.media && listing.media.photo_links && listing.media.photo_links.length > 0) {
                const img = document.createElement("img");
                img.src = listing.media.photo_links[0];
                img.classList.add("img-fluid", "rounded");
                img.style.maxWidth = "200px";
                img.style.maxHeight = "150px";
                imageColumn.appendChild(img);
            }

            row.appendChild(imageColumn);

            // Car details column
            const detailsColumn = document.createElement("div");
            detailsColumn.classList.add("col-md-8");

            const title = document.createElement("h5");
            title.textContent = `${listing.build.year} ${listing.build.make} ${listing.build.model} ${listing.build.trim}`;

            const price = document.createElement("p");
            price.textContent = `${lang === "en" ? "Price" : "Цена"}: $${listing.price}`;

            const country = document.createElement("p");
            country.textContent = `${lang === "en" ? "Country" : "Страна"}: ${listing.dealer.country}`;

            const model = document.createElement("p");
            model.textContent = `${lang === "en" ? "Model" : "Модель"}: ${listing.build.model}`;

            detailsColumn.appendChild(title);
            detailsColumn.appendChild(price);
            detailsColumn.appendChild(country);
            detailsColumn.appendChild(model);

            row.appendChild(detailsColumn);

            container.appendChild(row);
        });
    } else {
        container.innerHTML = `<p>${lang === "en" ? "No cars found." : "Автомобили не найдены."}</p>`;
    }
}

function displayColorResults(data, elementId) {
    const container = document.getElementById(elementId);
    container.innerHTML = "";

    // Get language preference from localStorage, default to 'en'
    const lang = localStorage.getItem("language") || "en";

    if (data && data.listings) {
        data.listings.forEach((listing) => {
            const row = document.createElement("div");
            row.classList.add("row", "mb-3");

            const imageColumn = document.createElement("div");
            imageColumn.classList.add("col-md-4");

            if (listing.media && listing.media.photo_links && listing.media.photo_links.length > 0) {
                const img = document.createElement("img");
                img.src = listing.media.photo_links[0];
                img.classList.add("img-fluid", "rounded");
                img.style.maxWidth = "200px";
                img.style.maxHeight = "150px";
                imageColumn.appendChild(img);
            }

            row.appendChild(imageColumn);

            const detailsColumn = document.createElement("div");
            detailsColumn.classList.add("col-md-8");

            const title = document.createElement("h5");
            title.textContent = `${listing.build.year} ${listing.build.make} ${listing.build.model} ${listing.build.trim}`;

            const price = document.createElement("p");
            price.textContent = `${lang === "en" ? "Price" : "Цена"}: $${listing.price}`;

            const country = document.createElement("p");
            country.textContent = `${lang === "en" ? "Country" : "Страна"}: ${listing.dealer.country}`;

            const model = document.createElement("p");
            model.textContent = `${lang === "en" ? "Model" : "Модель"}: ${listing.build.model}`;

            detailsColumn.appendChild(title);
            detailsColumn.appendChild(price);
            detailsColumn.appendChild(country);
            detailsColumn.appendChild(model);

            row.appendChild(detailsColumn);

            container.appendChild(row);
        });
    } else {
        container.innerHTML = `<p>${lang === "en" ? "No cars found." : "Автомобили не найдены."}</p>`;
    }
}


  $(document).ready(function() { 
    var searchSections = ['#searchByYearMake', '#searchByYearMakeModel', '#searchByColor','#searchByFuel'];
    var currentIndex = 0;

    $('#nextButton').click(function() {
        $(searchSections[currentIndex]).removeClass('animate__fadeInLeft').addClass('animate__fadeOutLeft').hide();
        currentIndex = (currentIndex + 1) % searchSections.length;
        $(searchSections[currentIndex]).removeClass('animate__fadeOutLeft').addClass('animate__fadeInLeft').show();
        $('#backButton').show(); 
    });

    $('#backButton').click(function() {
        $(searchSections[currentIndex]).removeClass('animate__fadeInLeft').addClass('animate__fadeOutLeft').hide();
        currentIndex = (currentIndex - 1 + searchSections.length) % searchSections.length;
        $(searchSections[currentIndex]).removeClass('animate__fadeOutLeft').addClass('animate__fadeInLeft').show();
        if (currentIndex === 0) {
            $('#backButton').hide(); 
        }
    });
});