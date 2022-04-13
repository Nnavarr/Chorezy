import React from 'react';
import { Link } from 'react-router-dom';

const AwardList = ({ awardCount, username, awards }) => {
  if (!awards || !awards.length) {
    return <p className="bg-dark text-secondary p-3">{username}, make some awards!</p>;
  }

  return (
    <div>

      <h5>
        {username}'s {awardCount} {awardCount === 1 ? 'award' : 'awards'}
      </h5>

      {awards.map(award => (
          
        <button className="btn w-100 display-block mb-2" key={award._id}>
          <Link to={`/profile/${award.username}`}>{award.username}</Link>
        </button>
      ))}
    </div>
  );
};

export default AwardList;