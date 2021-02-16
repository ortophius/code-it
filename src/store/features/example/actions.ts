const START = 'example/start';

interface StartAction {
  type: typeof START;
}

/**
 * You can add new action types like this:
 * export type ExampleActions = StartAction | MyAction | EtcAction
 * refer to: https://redux.js.org/recipes/usage-with-typescript#type-checking-actions--action-creators
 */

export type ExampleAction = StartAction;

export const start = (): ExampleAction => ({
  type: START,
});
