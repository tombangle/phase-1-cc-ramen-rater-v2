// index.js

// Fetch and display all ramen images and details
const displayRamens = () => {
  fetch('http://localhost:3000/ramens')
    .then(response => response.json())
    .then(ramens => {
      const ramenMenu = document.querySelector('#ramen-menu');
      ramens.forEach(ramen => {
        const img = document.createElement('img');
        img.src = ramen.image;
        img.alt = ramen.name;
        img.addEventListener('click', () => handleClick(ramen));
        ramenMenu.appendChild(img);
      });

      // Display the first ramen details initially
      if (ramens.length > 0) {
        handleClick(ramens[0]);
      }
    })
    .catch(error => {
      console.error('Error fetching ramens:', error);
      const errorDiv = document.createElement('div');
      errorDiv.textContent = 'Error fetching ramens. Please try again later.';
      document.body.appendChild(errorDiv);
    });
};

// Display ramen details in the #ramen-detail section
const handleClick = (ramen) => {
  const detailDiv = document.querySelector('#ramen-detail');
  detailDiv.querySelector('.detail-image').src = ramen.image;
  detailDiv.querySelector('.name').textContent = ramen.name;
  detailDiv.querySelector('.restaurant').textContent = ramen.restaurant;
  detailDiv.querySelector('#rating-display').textContent = ramen.rating;
  detailDiv.querySelector('#comment-display').textContent = ramen.comment;

  // Attach the ramen ID to the detail div for easy reference
  detailDiv.dataset.ramenId = ramen.id;

  // Add delete button functionality
  addDeleteListener(ramen.id);
};

// Add a new ramen to the menu and persist it with POST
const addSubmitListener = () => {
  const form = document.querySelector('#new-ramen');
  if (form) {
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      const name = form.querySelector('#new-name').value;
      const restaurant = form.querySelector('#new-restaurant').value;
      const image = form.querySelector('#new-image').value;
      const rating = form.querySelector('#new-rating').value;
      const comment = form.querySelector('#new-comment').value;

      const ramen = { name, restaurant, image, rating, comment };

      // Add ramen to the menu visually
      const ramenMenu = document.querySelector('#ramen-menu');
      const img = document.createElement('img');
      img.src = ramen.image;
      img.alt = ramen.name;
      img.addEventListener('click', () => handleClick(ramen));
      ramenMenu.appendChild(img);

      // Persist the new ramen
      fetch('http://localhost:3000/ramens', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(ramen),
      });

      form.reset();
    });
  }
};

// Update the featured ramen's rating and comment
const addEditListener = () => {
  const editForm = document.querySelector('#edit-ramen');
  if (editForm) {
    editForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const rating = editForm.querySelector('#edit-rating').value;
      const comment = editForm.querySelector('#edit-comment').value;

      const detailDiv = document.querySelector('#ramen-detail');
      const ramenId = detailDiv.dataset.ramenId;

      // Update the frontend
      detailDiv.querySelector('#rating-display').textContent = rating;
      detailDiv.querySelector('#comment-display').textContent = comment;

      // Persist the update
      fetch(`http://localhost:3000/ramens/${ramenId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ rating, comment }),
      });

      editForm.reset();
    });
  }
};

// Delete a ramen from the menu and persist the deletion
const addDeleteListener = (ramenId) => {
  let deleteButton = document.querySelector('.delete-button');
  if (!deleteButton) {
    deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.classList.add('delete-button');
    document.querySelector('#ramen-detail').appendChild(deleteButton);
  }

  deleteButton.onclick = () => {
    // Remove ramen from menu
    const ramenMenu = document.querySelector('#ramen-menu');
    const ramenImg = [...ramenMenu.querySelectorAll('img')].find(img => img.alt === document.querySelector('.name').textContent);
    if (ramenImg) ramenImg.remove();

    // Clear details
    const detailDiv = document.querySelector('#ramen-detail');
    detailDiv.querySelector('.detail-image').src = './assets/image-placeholder.jpg';
    detailDiv.querySelector('.name').textContent = 'Insert Name Here';
    detailDiv.querySelector('.restaurant').textContent = 'Insert Restaurant Here';
    detailDiv.querySelector('#rating-display').textContent = 'Insert rating here';
    detailDiv.querySelector('#comment-display').textContent = 'Insert comment here';

    // Persist the deletion
    fetch(`http://localhost:3000/ramens/${ramenId}`, { method: 'DELETE' });
  };
};

// Initialize the application
const main = () => {
  document.addEventListener('DOMContentLoaded', () => {
    displayRamens();
    addSubmitListener();
    addEditListener();
  });
};

main();

// Export functions for testing
export {
  displayRamens,
  addSubmitListener,
  handleClick,
  addEditListener,
  main
};