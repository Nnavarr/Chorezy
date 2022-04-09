import React from 'react';
import TaskList from '../components/TaskList';
import TaskForm from '../components/TaskForm';
import AwardList from '../components/AwardList';

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
      <div className="container">
        <div className="row">
          <div className="col l1"></div>
          <div className="col l10 center-align">
            <h1>Get your kids to work!</h1>
            <p>Assign a chore card for your kid.</p>
            <img className="home-img" src="../img/sweeping.png" ></img> 
          </div>
          <div className="col l1"></div>
        </div>
      </div>
    </section>

<div> 

</div>
<div class="row today">

<div class="card">
    <h2 class="card-header ">Chores lists: 3-7 years old</h2>

    <div class="card-body">
        <ul>
            <li>
                <p>clear the table</p>        
            </li>

            <li>
                <p>set the table</p>
            </li>

            <li>
                <p> feed the animals</p>
            </li>

            <li>
                <p> make your bed </p>
            </li>

            <li>
                <p>brush your teeth </p>
            </li>
        </ul>
        
    </div>
</div>

<div class="card">
<h2 class="card-header ">Chores lists: 8-11 years old</h2>
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

<div class="card">
<h2 class="card-header ">Chores lists: 12-16 years old</h2>
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

    </main>
  );
};

export default Home;