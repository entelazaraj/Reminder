document.addEventListener('DOMContentLoaded', () => {
  // Initialize the reminders array from local storage or an empty array
  const reminders = JSON.parse(localStorage.getItem('reminders')) || [];

  // Get references to HTML elements
  const reminderInput = document.getElementById('reminderInput');
  const distanceInput = document.getElementById('distanceInput');
  const setReminderButton = document.getElementById('setReminderButton');
  const remindersList = document.getElementById('remindersList');

  // Function to add a reminder to the array and update the list
  function addReminder(message, distance) {
    if (message && !isNaN(distance)) {
      reminders.push({ message, distance });
      localStorage.setItem('reminders', JSON.stringify(reminders));
      updateRemindersList();
    }
  }

  // Event listener for the "Set Reminder" button
  setReminderButton.addEventListener('click', () => {
    const reminderMessage = reminderInput.value.trim();
    const distance = parseFloat(distanceInput.value);
    addReminder(reminderMessage, distance);
    reminderInput.value = '';
    distanceInput.value = '';
  });

  function addReminder(message, distance) {
    const currentTime = new Date(); // Get the current time
    const formattedTime = currentTime.toLocaleDateString(); // Format the date as a string
    const reminder = {
      message: message,
      distance: distance,
      time: formattedTime,
    };
    reminders.push(reminder);
    localStorage.setItem('reminders', JSON.stringify(reminders));
    updateRemindersList();
  }
  
  // Modify your function to include date when adding reminders
  function updateRemindersList() {
    const tbody = document.getElementById('remindersList');
    tbody.innerHTML = ''; // Clear the existing table rows
  
    for (let i = 0; i < reminders.length; i++) {
      const reminder = reminders[i];
      const row = document.createElement('tr');
  
      // Nr column
      const nrCell = document.createElement('td');
      nrCell.textContent = i + 1; // Add 1 to the index to start numbering from 1
      row.appendChild(nrCell);
  
      // Message column
      const messageCell = document.createElement('td');
      messageCell.textContent = reminder.message;
      row.appendChild(messageCell);
  
      // Date column
      const dateCell = document.createElement('td');
      dateCell.textContent = reminder.time; // Display the formatted date
      row.appendChild(dateCell);
  
      // Distance column
      const distanceCell = document.createElement('td');
      const distanceText = document.createElement('span');
      distanceText.textContent = reminder.distance + ' m';
      distanceText.classList.add('distance-text');
      distanceCell.appendChild(distanceText);
      row.appendChild(distanceCell);
  
      // Action column with delete button
      const actionCell = document.createElement('td');
      const deleteButton = document.createElement('button');
      deleteButton.textContent = 'Delete';
      deleteButton.classList.add('delete-button');
      deleteButton.addEventListener('click', () => {
        reminders.splice(i, 1);
        localStorage.setItem('reminders', JSON.stringify(reminders));
        updateRemindersList();
      });
      actionCell.appendChild(deleteButton);
      row.appendChild(actionCell);
  
      tbody.appendChild(row);
    }
  }
  
  // Call the updateRemindersList function to populate the table on page load
  updateRemindersList();
  
  // Rest of your code for the location-based reminder system
  const targetLocation = {
    latitude: YOUR_TARGET_LATITUDE, // Replace with actual latitude
    longitude: YOUR_TARGET_LONGITUDE, // Replace with actual longitude
  };

  const distanceThreshold = 0.2; // 200 meters
  let reminderTriggered = false;

  function calculateDistance(location1, location2) {
    const earthRadius = 6371; // Earth's radius in kilometers
    const latDiff = degreesToRadians(location2.latitude - location1.latitude);
    const lonDiff = degreesToRadians(location2.longitude - location1.longitude);

    const a =
      Math.sin(latDiff / 2) * Math.sin(latDiff / 2) +
      Math.cos(degreesToRadians(location1.latitude)) *
        Math.cos(degreesToRadians(location2.latitude)) *
        Math.sin(lonDiff / 2) *
        Math.sin(lonDiff / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = earthRadius * c;

    return distance;
  }

  function degreesToRadians(degrees) {
    return degrees * (Math.PI / 180);
  }

  function updateMessage(message) {
    const messageElement = document.getElementById('message');
    messageElement.textContent = message;
  }

  function checkLocation() {
    navigator.geolocation.getCurrentPosition(
      position => {
        const currentLocation = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        };

        const distance = calculateDistance(currentLocation, targetLocation);

        if (distance >= distanceThreshold && !reminderTriggered) {
          reminderTriggered = true;
          updateMessage("You've moved away! Remember your task.");
        }
      },
      error => {
        console.error('Error getting location:', error);
      }
    );
  }

  // Add this part at the end to start checking location after setting up reminders
  setInterval(checkLocation, 5000); // Check location every 5 seconds
});


// script.js
const menuToggle = document.getElementById('menuToggle');
const mainMenu = document.getElementById('mainMenu');

menuToggle.addEventListener('click', () => {
  mainMenu.classList.toggle('show-menu');
});



