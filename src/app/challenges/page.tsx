import Link from 'next/link';
import data from '../dfc.json';

export default function Challenges() {
    const years = data.years.slice();
    years.sort(
        (a, b) => b.year - a.year
    );

    const rows = years.map(
        y => {
            return (
                <div className="year" key={y.year}>
                    <h3><Link href={`/challenges/${y.year}`}>{y.year}</Link></h3>
                    <p><strong>Team Scheme:</strong> {y.teamScheme}</p>
                    <p><strong>Challenge Theme:</strong> {y.challengeTheme}</p>
                    <p><strong>Winners:</strong> {y.winningTeam}</p>
                </div>
            )
        }
    )
    return (
        <main className="content">
            <h2>Yearly Challenges</h2>
            {rows}
        </main>
    )
}
