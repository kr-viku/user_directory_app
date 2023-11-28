import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function UserDetails() {
  const { userId } = useParams();
  const [userDetails, setUserDetails] = useState({});
  const [countryList, setCountryList] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState('');
  const [currentTime, setCurrentTime] = useState('');
  const [userPosts, setUserPosts] = useState([]);
  // const [selectedUserId, setSelectedUserId] = useState(userId);
  const [clockPaused, setClockPaused] = useState(false);

  useEffect(() => {
    // Fetch user details based on userId
    fetch(`https://jsonplaceholder.typicode.com/users/${userId}`)
      .then(response => response.json())
      .then(user => setUserDetails(user))
      .catch(error => console.error('Error fetching user details:', error));

    // Fetch the list of countries
    // fetch('http://worldtimeapi.org/api/timezone')
    // .then(response => response.json())
    // .then(countries => {
    //   // Extract country names from the list
    //   const countryNames = countries.map(country => country.split('/')[0]);
    //   setCountryList(countryNames);
    //   console.log(countryNames)
    // })
    // .catch(error => console.error('Error fetching countries:', error));

    // Fetch user posts based on userId
    fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`)
      .then(response => response.json())
      .then(posts => setUserPosts(posts))
      .catch(error => console.error('Error fetching user posts:', error));
  }, [userId]);


  

  // useEffect(() => {
  //   // Update userId when userId changes
  //   setSelectedUserId(userId);
  // }, [userId]);

  useEffect(() => {
    // Fetch the list of countries
    fetch('https://worldtimeapi.org/api/timezone')
      .then(response => response.json())
      .then(timezones => {
        // Extract unique country names from the list of timezones
        // const countrySet = new Set(timezones.map(timezone => timezone.split('/')[0]));
        console.log(timezones)
         const uniqueCountries = [...countryList];
        timezones.map((ele)=>{
          const countryData={
            area:ele.split('/')[0],
            location:ele.split('/')[1],
          }
          console.log(countryData)
            uniqueCountries.push(countryData)          
           console.log(uniqueCountries)
        })

        setCountryList(uniqueCountries);
        // const uniqueCountries = [...countrySet];
        // setCountryList(uniqueCountries);
      })
      .catch(error => console.error('Error fetching countries:', error));
  }, []);



  // useEffect(() => {
  //   // Fetch current time for the selected country
  //   const fetchCurrentTime = async () => {
  //     if (!clockPaused) {
  //       try {
  //         const response = await fetch(`http://worldtimeapi.org/api/timezone/${selectedCountry}`);
  //         const data = await response.json();
  //         setCurrentTime(data.utc_datetime);
  //       } catch (error) {
  //         console.error('Error fetching current time:', error);
  //       }
  //     }
  //   };

  //   const intervalId = setInterval(fetchCurrentTime, 1000);

  //   // Cleanup interval when component unmounts
  //   return () => clearInterval(intervalId);
  // }, [selectedCountry, clockPaused]);


  const handleCountryChange = async (country) => {
    // Pause the clock when changing the selected country
    // setClockPaused(true);

    console.log(country)
    setSelectedCountry(country.location)
    try {
      const response = await fetch(`http://worldtimeapi.org/api/timezone/${country.area}/${country.location}`);
      const data = await response.json();
      console.log(data);
      // setCurrentTime(data.utc_datetime);
      // setSelectedCountry(selectedCountry);
    } catch (error) {
      console.error('Error fetching current time:', error);
    }


    
  };

  const handlePauseResumeClick = () => {
    setClockPaused(!clockPaused);
  };
console.log(countryList)
  return (
    <div>
      <h1>User Details</h1>
      <div>
        <h2>{userDetails.name}</h2>
        <p>Email: {userDetails.email}</p>
        <p>Address: {userDetails.address && userDetails.address.city}, {userDetails.address && userDetails.address.country}</p>
        {/* Add more user details as needed */}

        <select value={selectedCountry} onChange={handleCountryChange}>
          <option value="">Select a country</option>
          {countryList.map((country, index) => (
            <option key={index} value={country}>
              {country.location}
            </option>
          ))}
        </select>

        <p>Current Time: {currentTime}</p>

        <button onClick={handlePauseResumeClick}>
          {clockPaused ? 'Resume Clock' : 'Pause Clock'}
        </button>

      <div>
        <h2>Posts</h2>
        <div className="posts-container">
          {userPosts.map(post => (
            <div key={post.id} className="post-card">
              <h3>{post.title}</h3>
              <p>{post.body}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
      </div>
  );
}

export default UserDetails;

