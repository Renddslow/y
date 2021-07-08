import { render } from 'preact';

import {State} from '../types';

const withRender = (Component, elementID: string) => (state: State) => {
  render(<Component state={state} />, document.getElementById(elementID));
};

export default withRender;
