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
        
      </div>

    </main>
  );
};

export default Home;