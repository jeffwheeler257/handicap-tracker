// Notes on handicap calculation found in ../../handicap-note.txt

export function calculateHandicap(rounds: { scoreDifferential: number }[]): number | null {
    const numberOfRounds: number = rounds.length;
    if (numberOfRounds < 3){ // Cannot calculate a handicap with less than 3 rounds
        return null;
    } else if (numberOfRounds === 3){
        const bestScoreDifferentials = getBestScoreDifferentials(rounds, 1);
        return (getAverageOfBestScoreDifferentials(bestScoreDifferentials) - 2) * 0.96;
    } else if (numberOfRounds === 4) {
        const bestScoreDifferentials = getBestScoreDifferentials(rounds, 1);
        return (getAverageOfBestScoreDifferentials(bestScoreDifferentials) - 1) * 0.96;
    } else if (numberOfRounds === 5) {
        const bestScoreDifferentials = getBestScoreDifferentials(rounds, 1);
        return getAverageOfBestScoreDifferentials(bestScoreDifferentials) * 0.96;
    } else if (numberOfRounds === 6) {
        const bestScoreDifferentials = getBestScoreDifferentials(rounds, 2);
        return (getAverageOfBestScoreDifferentials(bestScoreDifferentials) - 1) * 0.96;
    } else if (numberOfRounds >= 7 && numberOfRounds <= 8) {
        const bestScoreDifferentials = getBestScoreDifferentials(rounds, 2);
        return getAverageOfBestScoreDifferentials(bestScoreDifferentials) * 0.96;
    } else if (numberOfRounds >= 9 && numberOfRounds <= 11) {
        const bestScoreDifferentials = getBestScoreDifferentials(rounds, 3);
        return getAverageOfBestScoreDifferentials(bestScoreDifferentials) * 0.96;
    } else if (numberOfRounds >= 12 && numberOfRounds <= 14) {
        const bestScoreDifferentials = getBestScoreDifferentials(rounds, 4);
        return getAverageOfBestScoreDifferentials(bestScoreDifferentials) * 0.96;
    } else if (numberOfRounds >= 15 && numberOfRounds <= 16) {
        const bestScoreDifferentials = getBestScoreDifferentials(rounds, 5);
        return getAverageOfBestScoreDifferentials(bestScoreDifferentials) * 0.96;
    } else if (numberOfRounds >= 17 && numberOfRounds <= 18) {
        const bestScoreDifferentials = getBestScoreDifferentials(rounds, 6);
        return getAverageOfBestScoreDifferentials(bestScoreDifferentials) * 0.96;
    } else if (numberOfRounds === 19) {
        const bestScoreDifferentials = getBestScoreDifferentials(rounds, 7);
        return getAverageOfBestScoreDifferentials(bestScoreDifferentials) * 0.96;
    } else { // player has 20 or more rounds is the default calc
        const lastTwentyRounds = rounds.slice(-20);
        const bestScoreDifferentials = getBestScoreDifferentials(lastTwentyRounds, 8);
        return getAverageOfBestScoreDifferentials(bestScoreDifferentials) * 0.96;
    }
}

function getBestScoreDifferentials(rounds: { scoreDifferential: number }[], count: number): number[] {
    return [...rounds]
        .sort((a, b) => a.scoreDifferential - b.scoreDifferential)
        .slice(0, count)   
        .map(round => round.scoreDifferential);
}

function getAverageOfBestScoreDifferentials(best: number[]): number {
    if (best.length === 0) return 0;
    return best.reduce((acc, curr) => acc + curr, 0) / best.length;
}