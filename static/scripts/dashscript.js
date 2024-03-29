// Define API endpoints for instrument search and price updates
const SEARCH_API_URL = 'ce17fet4bjf7fg4c';
const PRICE_API_URL = 'ce17fet4bjf7fg4c';

// Mock data for wishlist items (replace with actual data from backend)
let wishlistItems = [];

// Function to search instruments and update UI
function searchInstruments() {
  const searchInput = document.getElementById('searchInput').value.trim().toUpperCase();
  if (!searchInput) {
    alert('Please enter an instrument to search.');
    return;
  }

  // Make API call to search instruments
  fetch(`${SEARCH_API_URL}?query=${searchInput}`)
    .then(response => response.json())
    .then(data => {
      console.log('Search Results:', data);
      // Update UI with search results (can be a dropdown or modal to select instruments)
      // For simplicity, we are directly adding the first instrument to the wishlist
      if (data.length > 0) {
        const instrument = data[0]; // Assuming the first result is relevant
        addToWishlist(instrument);
      } else {
        alert('No instruments found. Please try again.');
      }
    })
    .catch(error => {
      console.error('Error searching instruments:', error);
      alert('An error occurred while searching instruments.');
    });
}

// Function to add instrument to wishlist
function addToWishlist(instrument) {
  // Check if instrument already exists in the wishlist
  if (wishlistItems.some(item => item.symbol === instrument.symbol)) {
    alert('Instrument already exists in the wishlist.');
    return;
  }

  // Add instrument to the wishlist
  wishlistItems.push(instrument);
  updateWishlistUI();
  fetchPriceUpdates(); // Start fetching price updates for added instruments
}

// Function to update UI with wishlist items
function updateWishlistUI() {
  const wishlistContainer = document.getElementById('wishlist');
  wishlistContainer.innerHTML = ''; // Clear existing items

  wishlistItems.forEach(item => {
    const li = document.createElement('li');
    li.className = 'list-group-item';
    li.textContent = `${item.symbol} - ${item.name}`;
    wishlistContainer.appendChild(li);
  });
}

// Function to fetch tick-by-tick price updates for wishlist items
function fetchPriceUpdates() {
  if (wishlistItems.length === 0) return; // No items in the wishlist

  // Make API call to fetch price updates for each instrument in the wishlist
  wishlistItems.forEach(item => {
    fetch(`${PRICE_API_URL}?symbol=${item.symbol}`)
      .then(response => response.json())
      .then(priceData => {
        console.log('Price Update:', priceData);
        // Update UI with price updates (e.g., update price next to instrument in the wishlist)
        const updatedPrice = priceData.price; // Assuming API response contains price
        updatePriceUI(item.symbol, updatedPrice);
      })
      .catch(error => {
        console.error('Error fetching price:', error);
      });
  });

  // Set interval to fetch updates every few seconds (adjust interval as needed)
  setInterval(fetchPriceUpdates, 5000); // Fetch updates every 5 seconds
}

// Function to update price UI for a specific instrument
function updatePriceUI(symbol, price) {
  const wishlistItemsUI = document.querySelectorAll('#wishlist li');
  wishlistItemsUI.forEach(item => {
    const [itemSymbol, itemName] = item.textContent.split(' - ');
    if (itemSymbol === symbol) {
      item.textContent = `${itemSymbol} - ${itemName} (${price})`; // Update with updated price
    }
  });
}

// Initialize dashboard functionality when the document is ready
document.addEventListener('DOMContentLoaded', function() {
  updateWishlistUI(); // Update UI with existing wishlist items
  fetchPriceUpdates(); // Start fetching price updates for wishlist items
});
