import { styled } from 'goober';

import { State } from '../../types';
import withRender from '../../utils/withRender';
import parseDay from '../../parseDay';

type Props = {
  state: State;
};

const Panel = styled('div')`
  width: 100%;
  display: block;
  border: 1px solid #000;
  height: 100%;
`;

const NameRow = styled('div')`
  display: grid;
  grid-gap: 1ex;
  grid-auto-flow: column;
  justify-content: start;
  align-items: end;
`;

const Character = (props: Props) => {
  const birthday = parseDay(props.state.character.birthday);
  return (
    <Panel>
      <NameRow>
        <span>Benjamin the Epithet</span>
        <span>of the tribe of {props.state.character.tribe},</span>
        <span data-tooltip={`${birthday.day} ${birthday.month}`}>{props.state.character.age}</span>
      </NameRow>
    </Panel>
  );
};

export default withRender(Character, 'character-view');
