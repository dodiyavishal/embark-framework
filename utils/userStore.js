const fs = require('fs');
const path = require('path');

const userFile = path.join(__dirname, 'user.json');

// Save user details to JSON file
function saveUser(user) {
  try {
    fs.writeFileSync(userFile, JSON.stringify(user, null, 2), 'utf-8');
    console.log(`User saved: ${user.username}`);
  } catch (err) {
    console.error('Error saving user:', err);
  }
}

// Fetch user details from JSON file
function fetchUser() {
  try {
    if (fs.existsSync(userFile)) {
      const data = fs.readFileSync(userFile, 'utf-8');
      return JSON.parse(data);
    } else {
      console.warn('User file not found. Run registration first.');
      return null;
    }
  } catch (err) {
    console.error('Error fetching user:', err);
    return null;
  }
}

// Clear stored user
function clearUser() {
  try {
    if (fs.existsSync(userFile)) {
      fs.unlinkSync(userFile);
      console.log('User store cleared.');
    }
  } catch (err) {
    console.error('Error clearing user:', err);
  }
}

module.exports = { saveUser, fetchUser, clearUser };
