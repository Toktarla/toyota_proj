const langSelect = document.getElementById("lang-select");
      langSelect.addEventListener("change", function () {
        setTimeout(function () {
          window.location.reload();
        }, 10);
      });