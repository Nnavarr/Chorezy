import React, { useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { ASSIGN_TASK } from '../../utils/mutations';


const TaskAssign = () => {
  const [assignTask, { error }] = useMutation(ASSIGN_TASK);

  // submit assignment
  


}


