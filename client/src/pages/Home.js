import React from 'react'
import mainImage from "../assets/images/sweeping.png";

const Home = () => {

  return (
    <main>
      <section id="landing ">
        <div className="container" style={{ backgroundColor: 'white', border: '5px solid #f2f8b0'}}>
              <h1>Welcome!</h1>
              <p>Are you a family looking for ways to equally distribute chores throughout the household?
                With Chorezy, you can easily assign tasks to family members and track if they have been completed.
              </p>
              <img src={mainImage} style={{ width: '50%' }} alt="main Img"></img>
        </div>
      </section>
      </main>
  );
};

export default Home;