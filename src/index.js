// index.js

// Callbacks
const handleClick = (ramen) => {
  // Add code to update DOM with ramen details
  const ramenDiv = document.createElement('div');
  ramenDiv.textContent = `${ramen.name} - ${ramen.restaurant}`;
  document.body.appendChild(ramenDiv);
};

const addSubmitListener = () => {
  // Add code to listen for form submit
  const form = document.querySelector('form');
  if (form) {
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      const name = document.querySelector('#name').value;
      const restaurant = document.querySelector('#restaurant').value;
      const ramen = { name, restaurant };
      handleClick(ramen);
      form.reset();
    });
  }
}

const displayRamens = () => {
  // Fetch and display ramens
  fetch('/ramens')
    .then(response => response.json())
    .then(ramens => {
      ramens.forEach(ramen => handleClick(ramen));
    })
    .catch(error => {
      console.error(error);
      // Handle error by displaying a message to the user
      const errorDiv = document.createElement('div');
      errorDiv.textContent = 'Error fetching ramens. Please try again later.';
      document.body.appendChild(errorDiv);
    });
};

const init = () => {
  displayRamens();
  addSubmitListener();
}

init();

// Export functions for testing
export {
  displayRamens,
  addSubmitListener,
  handleClick,
  init
}
