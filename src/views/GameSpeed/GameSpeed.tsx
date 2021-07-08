import { styled } from 'goober';

import withRender from '../../utils/withRender';
import { State } from '../../types';
import parseDay from '../../parseDay';
import emit from '../../utils/emitter';

type Props = {
  state: State;
};

const Box = styled('div')`
  border: 1px solid #000;
  padding: 4px 8px;
  box-sizing: border-box;
  display: grid;
  grid-template-columns: minmax(0, max-content) minmax(0, max-content);
  justify-content: space-between;
  width: 400px;
  align-items: center;
  font-size: 12px;
`;

const ButtonRow = styled('div')`
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  grid-gap: 8px;
`;

const PlaybackButton = styled('button')`
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  appearance: none;
  background: ${(props) => (props.active ? '#ccc' : 'transparent')};
  padding: 0;
  line-height: 1;
  position: relative;
  border: 1px solid #000;
  cursor: pointer;
  font-size: 14px;
  color: #000;

  &:hover:not(:disabled) {
    background: #eee;
  }

  &:disabled {
    cursor: default;
  }
`;

const Pause = styled('span')`
  &:before,
  &:after {
    display: block;
    content: '';
    background: #000;
    width: 2px;
    height: 12px;
    position: absolute;
    top: 5px;
  }

  &:before {
    left: 8px;
  }

  &:after {
    left: 12px;
  }
`;

const GameSpeed = (props: Props) => {
  const handlePlaybackClick = (speed: 1 | 2 | 3) => () => {
    emit('playspeedchange', { speed });
  };

  const handlePauseClick = () => {
    emit('pausechange', { paused: !props.state.paused });
  };

  return (
    <Box>
      <span>{parseDay(props.state.day)}</span>
      <ButtonRow>
        <PlaybackButton onClick={handlePauseClick} active={props.state.paused}>
          <Pause />
        </PlaybackButton>
        <PlaybackButton onClick={handlePlaybackClick(1)} active={props.state.playRate === 1} disabled={props.state.playRate === 1}>
          1
        </PlaybackButton>
        <PlaybackButton onClick={handlePlaybackClick(2)} active={props.state.playRate === 2} disabled={props.state.playRate === 2}>
          2
        </PlaybackButton>
        <PlaybackButton onClick={handlePlaybackClick(3)} active={props.state.playRate === 3} disabled={props.state.playRate === 3}>
          3
        </PlaybackButton>
      </ButtonRow>
    </Box>
  );
};

export default withRender(GameSpeed, 'game-speed');
