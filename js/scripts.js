const sidebar = document.querySelector('.sidebar');
const collapseBtn = document.querySelector('.collapse-btn');
const darkModeToggle = document.querySelector('.dark-mode-toggle');

collapseBtn.addEventListener('click', () => {
    sidebar.classList.toggle('collapsed');
});

darkModeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
});

// Data for the chart
const data = [
    { month: 'Jan', registrations: 800 },
    { month: 'Feb', registrations: 600 },
    { month: 'Mar', registrations: 950 },
    { month: 'Apr', registrations: 400 },
    { month: 'May', registrations: 850 },
    { month: 'Jun', registrations: 300 },
    { month: 'Jul', registrations: 600 },
    { month: 'Aug', registrations: 500 },
    { month: 'Sep', registrations: 900 },
    { month: 'Oct', registrations: 700 },
    { month: 'Nov', registrations: 600 },
    { month: 'Dec', registrations: 400 }
  ];
  
  // Create the chart
  const ctx = document.getElementById('registrationChart').getContext('2d');
  const registrationChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: data.map(item => item.month),
      datasets: [{
        label: 'Registrations',
        data: data.map(item => item.registrations),
        backgroundColor: '#8B5CF6',
        borderRadius: 4
      }]
    },
    options: {
      scales: {
        x: {
          ticks: { color: '#6B7280' },
          grid: { display: false }
        },
        y: {
          ticks: { color: '#6B7280' },
          grid: { drawBorder: false }
        }
      },
      plugins: {
        tooltip: {
          backgroundColor: '#fff',
          titleColor: '#333',
          bodyColor: '#333',
          borderColor: '#ccc',
          borderWidth: 1,
          boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
          padding: 10
        }
      }
    }
  });
  

  // Sample data
  const eventsData = [
    { name: "Cloud Innovation Summit", date: "2024-10-15", speaker: "Jane Doe", status: "Completed" },
    { name: "Blockchain Revolution Conference", date: "2024-11-05", speaker: "Dr. Peter Smith", status: "In Progress" },
    { name: "AI in Healthcare Symposium", date: "2024-12-01", speaker: "Dr. Aisha Malik", status: "Completed" },
    { name: "Future of Fintech Forum", date: "2024-10-25", speaker: "John Lee", status: "Completed" },
    { name: "Data Analytics in Business", date: "2024-11-12", speaker: "Rachel Moore", status: "Completed" },
    { name: "Sustainable Energy Expo", date: "2024-09-28", speaker: "Prof. Alan Green", status: "Completed" },
    { name: "Web3 Interfaces Workshop", date: "2024-10-10", speaker: "Kevin Adams", status: "In Progress" },
    { name: "Cybersecurity for Startups", date: "2024-11-19", speaker: "Emily Zhang", status: "Completed" },
    { name: "Smart Cities Forum", date: "2024-10-18", speaker: "Dr. Maria Hernandez", status: "In Progress" },
    { name: "Tech Safari Mixer", date: "2024-09-30", speaker: "Guest Panel", status: "In Progress" }
];

// Populate table
function populateTable(data) {
    const tableBody = document.getElementById('eventsTableBody');
    tableBody.innerHTML = '';

    data.forEach(event => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td class="event-name">${event.name}</td>
            <td class="event-date">${formatDate(event.date)}</td>
            <td class="event-speaker">${event.speaker}</td>
            <td class="event-status">
                <span class="status-badge ${event.status === 'Completed' ? 'status-completed' : 'status-in-progress'}">
                    ${event.status}
                </span>
            </td>
        `;
        // Add click event listener to each row
        row.addEventListener('click', () => showModal(event));

        tableBody.appendChild(row);
    });
}

// Format date
function formatDate(dateStr) {
    const date = new Date(dateStr);
    return date.toISOString().split('T')[0];
}

// Search functionality
const searchInput = document.querySelector('.search-input');
searchInput.addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const filteredData = eventsData.filter(event => 
        event.name.toLowerCase().includes(searchTerm) ||
        event.speaker.toLowerCase().includes(searchTerm)
    );
    populateTable(filteredData);
});

// Initial table population
populateTable(eventsData);


 // Function to show modal with event data
function showModal(event) {
    const modal = document.querySelector('.modal');
    const eventTitle = document.querySelector('.modal .event-title');
    const eventDate = document.querySelector('.modal .event-date');
    const eventDescription = document.querySelector('.modal .event-description');
    const speakersInfo = document.querySelector('.modal .speakers-info');
    const attendeesInfo = document.querySelector('.modal .attendees');

    // Populate modal with event data
    eventTitle.textContent = event.name;
    eventDate.textContent = `Date: ${formatDate(event.date)}`;
    eventDescription.textContent = 'This is a description of the event.'; // You can modify this to pull real descriptions
    speakersInfo.textContent = `Guest Speaker: ${event.speaker}`;
    attendeesInfo.textContent = `300 Attendees`; // This can be dynamic if you have attendee data

    // Show the modal
    modal.style.display = 'flex';
}

// Close modal functionality
const closeButton = document.querySelector('.modal .close-button');
closeButton.addEventListener('click', () => {
    const modal = document.querySelector('.modal');
    modal.style.display = 'none';
});

// Close modal when clicking outside of the modal
document.addEventListener('click', function (event) {
    const modal = document.querySelector('.modal');
    if (event.target === modal) {
        modal.style.display = 'none';
    }
});

const carousel = {
  currentSlide: 0,
  slides: document.querySelectorAll('.news-card'),
  dotsContainer: document.querySelector('.carousel-dots'),
  
  init() {
      // Create dots
      this.slides.forEach((_, index) => {
          const dot = document.createElement('div');
          dot.classList.add('dot');
          if (index === 0) dot.classList.add('active');
          dot.addEventListener('click', () => this.goToSlide(index));
          this.dotsContainer.appendChild(dot);
      });

      // Add navigation listeners
      document.querySelector('.nav-dot.left').addEventListener('click', () => this.prevSlide());
      document.querySelector('.nav-dot.right').addEventListener('click', () => this.nextSlide());

      // Add keyboard navigation
      document.addEventListener('keydown', (e) => {
          if (e.key === 'ArrowLeft') this.prevSlide();
          if (e.key === 'ArrowRight') this.nextSlide();
      });

      // Add touch support
      let touchStartX = 0;
      document.addEventListener('touchstart', (e) => {
          touchStartX = e.touches[0].clientX;
      });
      document.addEventListener('touchend', (e) => {
          const touchEndX = e.changedTouches[0].clientX;
          const diff = touchStartX - touchEndX;
          if (Math.abs(diff) > 50) { // Minimum swipe distance
              if (diff > 0) this.nextSlide();
              else this.prevSlide();
          }
      });

      // Auto-play
      this.startAutoPlay();
  },

  goToSlide(index) {
      this.slides[this.currentSlide].classList.remove('active');
      this.dotsContainer.children[this.currentSlide].classList.remove('active');
      
      this.currentSlide = index;
      
      this.slides[this.currentSlide].classList.add('active');
      this.dotsContainer.children[this.currentSlide].classList.add('active');
  },

  nextSlide() {
      const next = (this.currentSlide + 1) % this.slides.length;
      this.goToSlide(next);
  },

  prevSlide() {
      const prev = (this.currentSlide - 1 + this.slides.length) % this.slides.length;
      this.goToSlide(prev);
  },

  startAutoPlay() {
      setInterval(() => this.nextSlide(), 5000); // Change slide every 5 seconds
  }
};

// Initialize the carousel
carousel.init();

const hamburgerBtn = document.querySelector('.hamburger-menu');
const mobileSidebar = document.querySelector('.sidebar');
const mobileNavClose = document.querySelector('.mobile-nav-close')
hamburgerBtn.addEventListener('click', () => {
  mobileSidebar.classList.add('open-sidebar')
});
mobileNavClose.addEventListener('click', () => {
  mobileSidebar.classList.remove('open-sidebar')
});
