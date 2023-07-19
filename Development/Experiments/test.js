//  // Function to handle form submission
//  function submitForm() {
//     // Get user input values
//     var name = document.getElementById("name").value;
//     var date = document.getElementById("date").value;
//     var time = document.getElementById("time").value;

//     // Create an object to store the data
//     var data = {
//       name: name,
//       date: date,
//       time: time
//     };

//     // Check if the localStorage already has stored data
//     var storedData = localStorage.getItem("userData");
//     var userData = storedData ? JSON.parse(storedData) : {};

//     // Check if the name already exists in userData
//     if (userData.hasOwnProperty(name)) {
//       // Check if the date already exists for the name
//       if (userData[name].hasOwnProperty(date)) {
//         // Append the time to the existing name and date
//         userData[name][date].push(time);
//       } else {
//         // Create a new date array for the name and append the time
//         userData[name][date] = [time];
//       }
//     } else {
//       // Create a new object for the name and date, and append the time
//       userData[name] = {};
//       userData[name][date] = [time];
//     }

//     // Store the updated userData in localStorage
//     localStorage.setItem("userData", JSON.stringify(userData));

//     // Reset the form
//     document.getElementById("name").value = "";
//     document.getElementById("date").value = "";
//     document.getElementById("time").value = "";
//   }



// Function to handle form submission
function submitForm() {
    // Get user input values
    var name = document.getElementById("name").value;
    var date = document.getElementById("date").value;
    var time = document.getElementById("time").value;
  
    // Create an object to store the data
    var data = {
      name: name,
      date: date,
      time: time
    };
  
    // Check if the localStorage already has stored data
    var storedData = localStorage.getItem("userData");
    var userData = storedData ? JSON.parse(storedData) : {};
  
    // Check if the name already exists in userData
    if (userData.hasOwnProperty(name)) {
      // Check if the date already exists for the name
      if (userData[name].hasOwnProperty(date)) {
        // Append the time to the existing name and date
        userData[name][date].push(time);
      } else {
        // Create a new date object for the name and append the time
        userData[name][date] = {
          count: 1,
          times: [time]
        };
      }
      // Update the count of entries for the name and date
      userData[name][date].count++;
    } else {
      // Create a new object for the name and date, and append the time
      userData[name] = {};
      userData[name][date] = {
        count: 1,
        times: [time]
      };
    }
  
    // Store the updated userData in localStorage
    localStorage.setItem("userData", JSON.stringify(userData));
  
    // Reset the form
    document.getElementById("name").value = "";
    document.getElementById("date").value = "";
    document.getElementById("time").value = "";
  }
  