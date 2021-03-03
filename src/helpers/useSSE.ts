import AsyncContext from 'components/AsyncContext';
import { useContext } from 'react';

export default function useSSE<T>(key: string, effect: Function, init?: T): typeof init {
  const ctx = useContext(AsyncContext);

  const data = ctx.values[key];

  if (data) return data;

  ctx.promises.push(
    Promise.resolve(effect())
      .then((value: T) => { ctx.values[key] = value || true; }),
  );

  return (init) ? ctx.values[key] || init : undefined;
}
