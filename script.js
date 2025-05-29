// Plik JavaScript - interaktywność strony
// Animowany licznik klientów od 0 do 1200
document.addEventListener("DOMContentLoaded", () => {
  const countEl = document.getElementById("client-count");
  const target = 1200;
  let current = 0;
  const speed = 1;

  function updateCount() {
    if (current < target) {
      current += Math.ceil(target / 100);
      if (current > target) current = target;
      countEl.textContent = current;
      setTimeout(updateCount, speed);
    }
  }

  updateCount();

  // Obsługa trybu ciemnego (dark mode) z localStorage
  const darkModeToggle = document.getElementById("darkModeToggle");
  if (darkModeToggle) {
    if (localStorage.getItem("darkMode") === "enabled") {
      document.body.classList.add("dark-mode");
      darkModeToggle.checked = true;
    }

    darkModeToggle.addEventListener("click", () => {
      document.body.classList.toggle("dark-mode");
      if (document.body.classList.contains("dark-mode")) {
        localStorage.setItem("darkMode", "enabled");
      } else {
        localStorage.removeItem("darkMode");
      }
    });
  }
});

// Inicjalizacja mapy Google z pinezką lokalizacji
function initMap() {
  const salon = { lat: 52.091882, lng: 17.005609 };

  const map = new google.maps.Map(document.getElementById("googleMap"), {
    zoom: 15,
    center: salon,
  });

  const marker = new google.maps.Marker({
    position: salon,
    map: map,
    title: "Barber Bros – Stylowa 7",
  });

  marker.addListener("click", () => {
    window.open(
      "https://www.google.com/maps/dir/?api=1&destination=52.091882,17.005609",
      "_blank"
    );
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const reviews = document.querySelectorAll(".review-carousel .review");
  let index = 0;

  function showReview(i) {
    reviews.forEach((rev, idx) => {
      rev.classList.toggle("active", idx === i);
    });
  }

  setInterval(() => {
    index = (index + 1) % reviews.length;
    showReview(index);
  }, 6000); // Automatyczna zmiana opinii co 6 sekund

  showReview(index);
});

document.addEventListener("DOMContentLoaded", () => {
  const timeSelect = document.getElementById("time");
  const dateInput = document.getElementById("date");

  // Lista godzin dostępnych do wyboru w formularzu (można później dynamicznie ustawiać)
  const fullSchedule = [
    "09:00",
    "09:30",
    "10:00",
    "10:30",
    "11:00",
    "11:30",
    "12:00",
    "12:30",
    "13:00",
    "13:30",
    "14:00",
    "14:30",
    "15:00",
    "15:30",
    "16:00",
    "16:30",
  ];

  // Można tu symulować zarezerwowane godziny dla danej daty
  const bookedSlots = {
    "2025-05-30": ["10:00", "14:30"], // przykładowo: zarezerwowane
    "2025-06-01": ["09:00", "12:00"],
  };

  dateInput.addEventListener("change", () => {
    const selectedDate = dateInput.value;
    const reservations = JSON.parse(localStorage.getItem("reservations")) || [];

    // Filtruj zarezerwowane godziny dla tej daty
    const reserved = reservations
      .filter((r) => r.date === selectedDate)
      .map((r) => r.time);

    // Wyczyść listę
    timeSelect.innerHTML = '<option value="">Wybierz godzinę</option>';

    fullSchedule.forEach((hour) => {
      if (!reserved.includes(hour)) {
        const option = document.createElement("option");
        option.value = hour;
        option.textContent = hour;
        timeSelect.appendChild(option);
      }
    });
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector(".contact-form");

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = form.name.value;
    const email = form.email.value;
    const date = form.date.value;
    const time = form.time.value;
    const message = form.message.value;

    const reservation = {
      name,
      email,
      date,
      time,
      message,
    };

    // Zapisanie rezerwacji w localStorage (jako tablica rezerwacji)
    let reservations = JSON.parse(localStorage.getItem("reservations")) || [];
    reservations.push(reservation);
    localStorage.setItem("reservations", JSON.stringify(reservations));

    // Pokazanie potwierdzenia po wysłaniu formularza
    alert(
      `Dziękujemy ${name}, Twoja wizyta na ${date} o ${time} została zarezerwowana.`
    );

    // Reset formularza
    form.reset();

    // Opcjonalnie: wyczyść listę godzin
    const timeSelect = document.getElementById("time");
    timeSelect.innerHTML = '<option value="">Wybierz godzinę</option>';
  });
});
