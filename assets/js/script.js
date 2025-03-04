const burgerMenu = document.getElementById("burgerMenu");
const mobileNav = document.getElementById("mobileNav");
const closeBtn = document.getElementById("closeBtn");
const overlay = document.getElementById("overlay");

// Open mobile nav
burgerMenu.addEventListener("click", () => {
  mobileNav.classList.add("active");
  overlay.classList.add("active");
});

// Close mobile nav
closeBtn.addEventListener("click", () => {
  mobileNav.classList.remove("active");
  overlay.classList.remove("active");
});

// Close nav when clicking outside the menu (on the overlay)
overlay.addEventListener("click", () => {
  mobileNav.classList.remove("active");
  overlay.classList.remove("active");
});

// Wait until DOM is fully loaded
document.addEventListener("DOMContentLoaded", function () {
  // Header scroll effect
  window.addEventListener("scroll", function () {
    const header = document.querySelector(".internal-header");
    if (window.scrollY > 50) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  });

  // Marquee duplication and pause on hover
  const marqueeContainer = document.getElementById("marqueeContainer");
  const marqueeWrapper = document.getElementById("marqueeWrapper");
  marqueeWrapper.innerHTML += marqueeWrapper.innerHTML;

  marqueeContainer.addEventListener("mouseover", () => {
    marqueeWrapper.classList.add("paused");
  });

  marqueeContainer.addEventListener("mouseout", () => {
    marqueeWrapper.classList.remove("paused");
  });
});

$(document).ready(function () {
  $(".similar-services-cards").slick({
    vertical: true,
    verticalSwiping: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: true,
    dots: false,
    infinite: false,
  });
});

$(document).ready(function () {
  $(".similar-services-cards").on("wheel", function (e) {
    e.preventDefault();

    // Check if the slider is throttled
    if ($(this).data("isThrottled")) {
      return;
    }

    // Set the throttle flag
    $(this).data("isThrottled", true);

    if (e.originalEvent.deltaY < 0) {
      $(this).slick("slickPrev");
    } else {
      $(this).slick("slickNext");
    }

    // Remove the throttle after 400ms (adjust delay as needed)
    setTimeout(() => {
      $(this).data("isThrottled", false);
    }, 400);
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("customForm");

  // Custom dropdown logic
  const dropdown = document.getElementById("serviceDropdown");
  const dropdownSelected = dropdown.querySelector(".dropdown-selected");
  const dropdownOptions = dropdown.querySelector(".dropdown-options");
  const hiddenServiceInput = document.getElementById("serviceCategory");

  dropdown.addEventListener("click", function (e) {
    // Toggle the dropdown options
    dropdownOptions.style.display =
      dropdownOptions.style.display === "block" ? "none" : "block";
  });

  // When a dropdown option is clicked, update the selected text and hidden input
  dropdownOptions.querySelectorAll("li").forEach(function (option) {
    option.addEventListener("click", function (e) {
      e.stopPropagation();
      dropdownSelected.textContent = option.textContent;
      hiddenServiceInput.value = option.getAttribute("data-value");
      dropdownOptions.style.display = "none";
      // Remove error styling if any
      dropdown.classList.remove("error");
      const helper = dropdown.parentElement.querySelector(".helper-text");
      if (helper) {
        helper.style.display = "none";
      }
    });
  });

  // Click outside to close dropdown
  document.addEventListener("click", function (e) {
    if (!dropdown.contains(e.target)) {
      dropdownOptions.style.display = "none";
    }
  });
  function showToast(message) {
    const toast = document.createElement("div");
    toast.className = "toast";
    toast.textContent = message;
    document.body.appendChild(toast);

    // After 3 seconds, add the fade-out class to start the transition
    setTimeout(() => {
      toast.classList.add("fade-out");
    }, 3000);

    // Remove the toast element once the fade-out transition is complete
    toast.addEventListener("transitionend", () => {
      toast.remove();
    });
  }

  // Form validation on submit
  form.addEventListener("submit", function (e) {
    let hasError = false;
    const fields = ["fullname", "company", "email", "message"];
    fields.forEach(function (id) {
      const input = document.getElementById(id);
      const helper = input.parentElement.querySelector(".helper-text");
      if (input.value.trim() === "") {
        input.classList.add("error");
        if (helper) {
          helper.textContent = "Bu sahə mütləq doldurulmalıdır.";
          helper.style.display = "block";
        }
        hasError = true;
      } else {
        input.classList.remove("error");
        if (helper) {
          helper.style.display = "none";
        }
      }
    });

    const hiddenServiceInput = document.getElementById("serviceCategory");
    const dropdown = document.getElementById("serviceDropdown");
    const dropdownHelper =
      hiddenServiceInput.parentElement.querySelector(".helper-text");
    if (hiddenServiceInput.value.trim() === "") {
      dropdown.classList.add("error");
      if (dropdownHelper) {
        dropdownHelper.textContent = "Bu sahə mütləq doldurulmalıdır.";
        dropdownHelper.style.display = "block";
      }
      hasError = true;
    } else {
      dropdown.classList.remove("error");
      if (dropdownHelper) {
        dropdownHelper.style.display = "none";
      }
    }

    if (hasError) {
      e.preventDefault(); // Prevent submission if there are errors
    } else {
      e.preventDefault(); // Prevent actual submission for demo purposes
      showToast("Form uğurla təsdiqləndi!!");
    }
  });
});

$(document).ready(function () {
  // Initialize the slider with desired settings
  $(".slider").slick({
    infinite: false, // Do not loop infinitely
    slidesToShow: 5, // Show 5 items at a time
    slidesToScroll: 1, // Scroll one slide at a time
    draggable: true, // Enable dragging
    prevArrow: $(".prev-arrow"),
    nextArrow: $(".next-arrow"),
  });

  $(".slider").on(
    "init reInit afterChange",
    function (event, slick, currentSlide) {
      var i = currentSlide ? currentSlide : 0;
      if (i === 0) {
        $(".prev-arrow").hide();
      } else {
        $(".prev-arrow").show();
      }
      if (i >= slick.slideCount - slick.options.slidesToShow) {
        $(".next-arrow").hide();
      } else {
        $(".next-arrow").show();
      }
    }
  );
});

const modal = document.getElementById("modal");
const openModalBtn = document.getElementById("openModalBtn");
const closeBtnn = modal.querySelector(".close");

openModalBtn.addEventListener("click", function () {
  modal.style.display = "block";
  document.body.style.overflow = "hidden"; // Prevent background scroll
});

function closeModal() {
  modal.style.display = "none";
  document.body.style.overflow = ""; // Restore scroll
}

closeBtnn.addEventListener("click", closeModal);
window.addEventListener("click", function (event) {
  if (event.target == modal) {
    closeModal();
  }
});

/* ---------- Dropdown Toggle Functionality ---------- */
const dropdown = document.getElementById("serviceDropdown-modal");
const dropdownSelected = dropdown.querySelector(".modal-dropdown-selected");
const dropdownOptions = dropdown.querySelector(".modal-dropdown-options");
const hiddenInput = document.getElementById("serviceCategory-modal");

dropdown.addEventListener("click", function (e) {
  // Prevent event bubbling so window click doesn't immediately close it
  e.stopPropagation();
  dropdownOptions.style.display =
    dropdownOptions.style.display === "block" ? "none" : "block";
});

dropdownOptions.addEventListener("click", function (e) {
  if (e.target && e.target.nodeName === "LI") {
    dropdownSelected.textContent = e.target.textContent;
    hiddenInput.value = e.target.getAttribute("data-value");
    dropdownOptions.style.display = "none";
  }
});

// Close dropdown when clicking outside of it
window.addEventListener("click", function (e) {
  if (!dropdown.contains(e.target)) {
    dropdownOptions.style.display = "none";
  }
});

/* ---------- Form Validation for Helper Texts and Red Borders ---------- */
const form = document.getElementById("modalForm");
form.addEventListener("submit", function (event) {
  event.preventDefault();
  let valid = true;
  // Select all text, email inputs, and textarea fields within the form
  const inputs = document.querySelectorAll(
    "#modalForm input[type='text'], #modalForm input[type='email'], #modalForm textarea"
  );
  inputs.forEach(function (input) {
    const helperText = input.parentElement.querySelector(".modal-helper-text");
    if (input.value.trim() === "") {
      input.classList.add("error");
      helperText.textContent = "Bu sahə mütləq doldurulmalıdır.";
      helperText.style.display = "block";
      valid = false;
    } else {
      input.classList.remove("error");
      helperText.textContent = "";
      helperText.style.display = "none";
    }
  });
  if (valid) {
    // Process valid form (e.g., send data to server)
    console.log("Form submitted successfully!");
    closeModal();
  }
});
