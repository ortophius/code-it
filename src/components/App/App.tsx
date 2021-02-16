import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { start } from 'store/features/example/actions';
import { selectExampleMsg } from 'store/features/example';

export default function App(): JSX.Element {
  const message = useSelector(selectExampleMsg);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(start());
  });

  return (
    <h1>{message}</h1>
  );
}
