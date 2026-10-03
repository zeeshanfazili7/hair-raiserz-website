  const menuBtn =
    document.getElementById("menuBtn");

  const navLinks =
    document.getElementById("navLinks");

  menuBtn.addEventListener("click", () => {
    navLinks.classList.toggle("open");
  });


  document
    .querySelectorAll("#navLinks a")
    .forEach(link => {

      link.addEventListener("click", () => {
        navLinks.classList.remove("open");
      });

    });


  document.getElementById("year").textContent =
    new Date().getFullYear();


  const dateInput =
    document.getElementById("date");

  const today =
    new Date().toISOString().split("T")[0];

  dateInput.min = today;


  const form =
    document.getElementById("bookingForm");

  const modal =
    document.getElementById("confirmationModal");

  const confirmationText =
    document.getElementById("confirmationText");


  form.addEventListener("submit", function(event){

    event.preventDefault();


    const booking = {

      name:
        document.getElementById("name").value,

      phone:
        document.getElementById("phone").value,

      service:
        document.getElementById("service").value,

      stylist:
        document.getElementById("stylist").value,

      date:
        document.getElementById("date").value,

      time:
        document.getElementById("time").value,

      notes:
        document.getElementById("notes").value

    };


    /*
      Temporary browser-side storage.

      Replace this later with:
      Firebase,
      Supabase,
      your own API,
      or Hair Raiserz booking backend.
    */

    const appointments =
      JSON.parse(
        localStorage.getItem("hairRaiserzAppointments")
        || "[]"
      );


    appointments.push({
      ...booking,
      createdAt:new Date().toISOString(),
      status:"Pending"
    });


    localStorage.setItem(
      "hairRaiserzAppointments",
      JSON.stringify(appointments)
    );


    confirmationText.innerHTML =
      `
      Thanks <strong>${booking.name}</strong>.
      Your request for
      <strong>${booking.service}</strong>
      on <strong>${booking.date}</strong>
      at <strong>${booking.time}</strong>
      has been prepared.<br><br>

      Please call Hair Raiserz to confirm the slot.
      `;


    modal.classList.add("active");

    form.reset();

  });


  document
    .getElementById("closeModal")
    .addEventListener("click", () => {

      modal.classList.remove("active");

    });


  modal.addEventListener("click", event => {

    if(event.target === modal){
      modal.classList.remove("active");
    }

  });