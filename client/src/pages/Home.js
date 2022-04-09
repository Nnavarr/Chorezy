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
        <div className="container" style={{ backgroundColor: 'white'}}>
          {/*<div className="column">
            <div className="col 8 center-align">*/}
              <h1>Welcome to Chorezy!</h1>
              <p>Assign a chore card for your kid.</p>
        </div>
      </section>
      </main>
      ,/*}
      <div className="column">

        <div className="card-1" style={{columnSize: '4', columnPosition: 'left'}}>
          <h2 className="card-header ">Chores lists: 3-7 years old</h2>
          <div className="card-37" style={{backgroundColor: 'white'}}>
            <ul>
              <li>
                <p>clear the table</p>
              </li>

              <li>
                <p>set the table</p>
              </li>

              <li>
                <p>feed the animals</p>
              </li>

              <li>
                <p>make your bed </p>
              </li>

              <li>
                <p>brush your teeth </p>
              </li>
            </ul>

          </div>
        </div>

        <div className="card-2" style={{columnSize: '4', columnPosition: 'center'}}>
          <h2 className="card-header ">Chores lists: 8-11 years old</h2>
          <div className="card-811" style={{backgroundColor: 'white'}}>
            <ul>
              <li>
                <p>take out the trash</p>
              </li>

              <li>
                <p>vacuum floors</p>
              </li>

              <li>
                <p> pull out/back trash cans </p>
              </li>

              <li>
                <p> dust house </p>
              </li>

              <li>
                <p> help carry in groceries </p>
              </li>
            </ul>
          </div>
        </div>

        <div className="card-3" style={{columnSize: '4', columnPosition: 'right'}}>
          <h2 className="card-header ">Chores lists: 12-16 years old</h2>
          <div className="card-1216" style={{backgroundColor: 'white'}}>
            <ul>
              <li>
                <p>home by curfew</p>
              </li>

              <li>
                <p>clean garage</p>
              </li>

              <li>
                <p> clean bathrooms </p>
              </li>

              <li>
                <p> wash cars </p>
              </li>

              <li>
                <p> help with meal prep </p>
              </li>
            </ul>
          </div>
        </div>
  </div> */

      {/*         
      <div className="flex-row justify-space-between">
        {loggedIn && (
          <div className="col-12 mb-3">
            <TaskForm />
          </div>
        )}

        <div className={`col-12 mb-3 ${loggedIn && 'col-lg-8'}`}>
          {loading ? (
            <div>Loading...</div>
          ) : (
            <TaskList
              tasks={tasks}
              title="Some Feed for Task(s)..."
            />
          )}
        </div>

        {loggedIn && userData ? (
          <div className="col-12 col-lg-3 mb-3">
            <AwardList
              username={userData.me.username}
              awardCount={userData.me.awardCount}
              awards={userData.me.awards}
            /> 
          </div>
        ) : null}

      </div> */}
  );
};

export default Home;