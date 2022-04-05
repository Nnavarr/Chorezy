import React from 'react';
import { useParams } from 'react-router-dom';

import ReactionList from '../components/ReactionList';
import ReactionForm from '../components/ReactionForm';

import Auth from '../utils/auth';
import { useQuery } from '@apollo/client';
import { QUERY_TASK } from '../utils/queries';

const SingleTask = (props) => {
  const { id: taskId } = useParams();

  const { loading, data } = useQuery(QUERY_TASK, {
    variables: { id: taskId },
  });

  const task = data?.task || {};

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="card mb-3">
        <p className="card-header">
          <span style={{ fontWeight: 700 }} className="text-light">
            {task.username}
          </span>{' '}
          task on {task.createdAt}
        </p>
        <div className="card-body">
          <p>{task.taskText}</p>
        </div>
      </div>

      {task.reactionCount > 0 && (
        <ReactionList reactions={task.reactions} />
      )}

      {Auth.loggedIn() && <ReactionForm taskId={task._id} />}
    </div>
  );
};

export default SingleTask;
