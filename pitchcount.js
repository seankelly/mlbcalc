function value(id) {
    let element = document.getElementById(id);
    return element.value;
}
function pitch_count() {
    let bf = parseInt(value("pitch-count-batters-faced")) || 0;
    let bb = parseInt(value("pitch-count-walks")) || 0;
    let so = parseInt(value("pitch-count-strikeouts")) || 0;
    /*
     * Tom Tango's pitch count estimator: http://www.tangotiger.net/pitchCounts.html
     * pitches = 3.3 * PA + 1.5 * SO + 2.2 * BB
     */
    let pitches = 3.3 * bf + 1.5 * so + 2.2 * bb;
    let count_result = document.getElementById('pitch-count');
    count_result.innerText = String(pitches);
}
function pitch_count_init() {
    let calculate = document.getElementById('pitch-count-calculate');
    calculate.onclick = pitch_count;
}
pitch_count_init();
