import RowLink from './RowLink';

const RowLinks = ({ game }) => (
  <div>
    <div>
      {game.last_inn !== null && (
        <>
          <RowLink to='box' id={game.id} />
          <RowLink to={game.has_records ? 'pitch' : 'plays'} id={game.id} />
        </>
      )}
      {game.has_records && <RowLink to='videos' id={game.id} />}
    </div>
  </div>
);

export default RowLinks;
