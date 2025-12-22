import { Game } from '@/types';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface GameNarrativeProps {
  game: Game;
}

export default function GameNarrative({ game }: GameNarrativeProps) {
  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold mb-4 text-blue-600">{game.name}</h2>

      <div className="prose max-w-none">
        <div className="text-base leading-relaxed">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {game.description}
          </ReactMarkdown>
        </div>

        {game.playByPlay && (
          <div className="mt-4 text-base leading-relaxed">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {game.playByPlay}
            </ReactMarkdown>
          </div>
        )}

        {game.scoringTable && (
          <div className="mt-4 overflow-x-auto text-base leading-relaxed">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {game.scoringTable}
            </ReactMarkdown>
          </div>
        )}
      </div>
    </div>
  );
}
