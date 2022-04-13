import React from 'react';
import { Redirect, useParams } from 'react-router-dom';

import TaskForm from '../components/TaskForm';
import TaskList from '../components/TaskList';
import AwardList from '../components/AwardList';
import ChildList from '../components/ChildList';

import { useQuery, useMutation } from '@apollo/client';
import { QUERY_USER, QUERY_ME } from '../utils/queries';
import { ADD_AWARD, ADD_CHILD, ADD_USER } from '../utils/mutations';
import Auth from '../utils/auth';

const Profile = () => {
  const { username: userParam } = useParams();

  const { loading, data } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
    variables: { username: userParam }, 
  });

  const user = data?.me || data?.user || {};

  const [addChild] = useMutation(ADD_CHILD);
  const [addUser] = useMutation(ADD_USER);
  // const [addAward] = useMutation(ADD_AWARD);
  // const [userQuery] = useQuery(QUERY_USER);

  // redirect to personal profile page if username is yours
  

  if (Auth.loggedIn() && Auth.getProfile().data.username === userParam) {
    return <Redirect to="/profile" />;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user?.username) {
    return (
      <h4 className='text-secondary'>
        You need to be logged in to see this. Use the navigation links above to
        sign up or log in!
      </h4>
    );
  }

  // check whether the user is an admin or not
  if  (!user.admin){

    return (
      <div className="flex-row justify-space-between mb-3">
      
      <div className="col-12 mb-3 col-lg-8">
        <TaskList
          tasks={user.assignments}
          title={`${user.username}'s tasks...`}
        />
      </div></div>
    )
  }

  // TODO: update this handle click
  // const handleClick = async () => {
  //   try {
  //     await addAward({
  //       variables: { id: user._id },
  //     });
  //   } catch (e) {
  //     console.error(e);
  //   }
  // };

  const addNewChild = async () => {
    try {
      // estbalish variables
      let childUsername = 'new_child24';
      let childEmail = 'childemail24@email.com';
      let childPassword = 'child123';
      let childAdmin = false;

      // create new child user
      const { data } = await addUser({
        variables: { username: childUsername, email: childEmail, password: childPassword, admin: childAdmin}
      })

      let childId = data.addUser.user._id
    
      // assign to parent user (that created the child)
      await addChild({
        variables: {childId: childId}
      })

    } catch (e) {
      console.log(e)
    }
  }

  // main return statement
  return (
    <div>
      <div className="flex-row mb-3">
        <h2 className="text-secondary p-3 display-inline-block">
          Viewing {userParam ? `${user.username}'s` : 'your'} profile.
        </h2>
      </div>
  
      <div className="flex-row justify-space-between mb-3">
        
        <div className="col-12 mb-3 col-lg-8">
            {/* add child button: conditionally rendered*/}
          <button className="btn ml-auto modal" id='addChild' data-bs-toggle='modal' onClick={addNewChild}>
            Add Child
          </button>

        {/* onclick render childForm */}

          <ChildList
            username={user.username}
            children={user.children}
          />
        </div>

      </div>
      <div className="mb-3">{!userParam && 
        <TaskForm 
          children={user.children}
          tasks={user.tasks}
        />}
      </div>
    </div>
  );
};

export default Profile;
