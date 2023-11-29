import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function UserDetails() {
  const { userId } = useParams();
  const [userDetails, setUserDetails] = useState({});
  const [countryList, setCountryList] = useState([]);
  const [currentTime, setCurrentTime] = useState('');
  const [userPosts, setUserPosts] = useState([]);
  const [clockPaused, setClockPaused] = useState(false);

  useEffect(() => {
    // Fetch user details based on userId
    fetch(`https://jsonplaceholder.typicode.com/users/${userId}`)
      .then(response => response.json())
      .then(user => setUserDetails(user))
      .catch(error => console.error('Error fetching user details:', error));

    // Fetch user posts based on userId
    fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`)
      .then(response => response.json())
      .then(posts => setUserPosts(posts))
      .catch(error => console.error('Error fetching user posts:', error));
  }, [userId]);

  useEffect(() => {
    // Fetch the list of countries
    fetch('https://worldtimeapi.org/api/timezone')
      .then(response => response.json())
      .then(timezones => {
        setCountryList(timezones);
       
      })
      .catch(error => console.error('Error fetching countries:', error));
  }, []);


  const handleCountryChange = async (e) => {
    // Pause the clock when changing the selected country
    // setClockPaused(true);

    console.log(e.target.value);
    let countryData = e.target.value;

    let country = countryData.split("/")
    try {
      const response = await fetch(`https://worldtimeapi.org/api/timezone/${country[0]}/${country[1]}`);
      const data = await response.json();
      console.log(data);
      setCurrentTime(data.utc_datetime);
    } catch (error) {
      console.error('Error fetching current time:', error);
    }


    
  };

  const handlePauseResumeClick = () => {
    setClockPaused(!clockPaused);
  };

  
  return (
    <div>
      <h1>User Details</h1>
      <div>
        <h2>{userDetails.name}</h2>
        <p>Email: {userDetails.email}</p>
        <p>Address: {userDetails.address && userDetails.address.city}, {userDetails.address && userDetails.address.country}</p>
        {/* Add more user details as needed */}

        <select onChange={(e) => handleCountryChange(e)}>
          {countryList.map((country, index) => (
            <option key={country+index+1} value={country}>
              {country}
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

