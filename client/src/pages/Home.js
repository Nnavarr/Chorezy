import React from 'react'
import Auth from '../utils/auth';
import { useQuery } from '@apollo/client';
import { QUERY_TASKS, QUERY_ME_BASIC } from '../utils/queries';


const Home = () => {
  const { loading, data } = useQuery(QUERY_TASKS);
  const { data: userData } = useQuery(QUERY_ME_BASIC);
  const tasks = data?.tasks || [];
  const loggedIn = Auth.loggedIn();

  return (
    <main>
      <section id="landing ">
        <div className="container" style={{ backgroundColor: 'white', border: '5px solid #f2f8b0'}}>
              <h1>Welcome!</h1>
              <p>Are you a family looking for ways to equally distribute chores throughout the household?
                With Chorezy, you can easily assign tasks to family members and track if they have been completed.
              </p>
        </div>
      </section>
      </main>
  );
};

export default Home;