import data from "@/app/dfc.json";

export function generateStaticParams() {
    return data.years.map(
        y => ({year: y.year.toString()})
    );
}

type Props = {
    params: Promise<{
        year: string;
    }>;
};

export default async function Year({ params }: Props) {
    const year = Number((await params).year);

    if (Number.isNaN(year)) {
        throw new Error('Bad Year')
    }

    const yearData = data.years.find(
        yd => yd.year === year
    );

    if (!yearData) {
        throw new Error('No Data');
    }

    const games = yearData.games.map(
        g => {
            return (
                <div className="game" key={g.name}>
                    <h3>{g.name}</h3>
                    <p><strong>Winner:</strong> {g.winner}</p>
                    <p>{g.commentary}</p>
                </div>
            )
        }
    );

    return (
        <main className="content">
            <h2>Teams</h2>
            <p><strong>{yearData.teams[0].name}:</strong> {yearData.teams[0].members.join(', ')}</p>
            <p><strong>{yearData.teams[1].name}:</strong> {yearData.teams[1].members.join(', ')}</p>

            <h2>Games</h2>
            {games}
        </main>
    )
}
