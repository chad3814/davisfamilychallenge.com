import data from '../dfc.json';

export default function Leaderboard() {
    const players = data.participants.filter(
        p => !p.hide
    ).map(
        p => ({
            name: p.name,
            record: `${p.wins}-${p.losses}`,
            percent: Math.round(1000 * p.wins / (p.wins + p.losses)),
            place: -1
        })
    );
    players.sort(
        (a, b) => b.percent - a.percent
    );
    let lastPercent = -1;
    let place = 0;
    for (const player of players) {
        if (player.percent !== lastPercent) {
            place++;
        }
        player.place = place;
        lastPercent = player.percent;
    }

    const rows = players.map(
        (p, i) => {
            return (
                <tr key={i}>
                    <td>{p.place}</td>
                    <td>{p.name}</td>
                    <td>{p.record}</td>
                    <td>.{p.percent.toString(10).padStart(3, '0')}</td>
                </tr>
            )
        }
    )
    return (
        <main className="content">
            <h2>Leaderboard</h2>
            <table>
                <thead>
                    <tr>
                        <th>Rank</th>
                        <th>Player</th>
                        <th>Record</th>
                        <th>Win %</th>
                    </tr>
                </thead>
                <tbody>
                    {rows}
                </tbody>
            </table>
        </main>
    );
}
