import { Game } from '@/types';

interface GameNarrativeProps {
  game: Game;
}

export default function GameNarrative({ game }: GameNarrativeProps) {
  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold mb-4">{game.name}</h2>

      <div className="prose max-w-none">
        <div
          className="text-base leading-relaxed"
          dangerouslySetInnerHTML={{ __html: game.description }}
        />

        {game.playByPlay && (
          <div className="mt-4">
            <div
              className="text-base leading-relaxed"
              dangerouslySetInnerHTML={{ __html: game.playByPlay }}
            />
          </div>
        )}

        {game.scoringTable && (
          <div className="mt-4 overflow-x-auto">
            <div dangerouslySetInnerHTML={{ __html: game.scoringTable }} />
          </div>
        )}
      </div>
    </div>
  );
}
