function v(id: string) {
    let element = <HTMLInputElement>document.getElementById(id);
    return element.value;
}

/*
 * Return number of outs from innings pitched.
 *
 * Input: ip
 *   ip should be in the form X.0, X.1, or X.3
 */
function outs(ip: number) {
    let innings = Math.floor(ip);
    let frac_ip = Math.round(10*(ip - innings));
    let outs = 3*innings + frac_ip;

    return outs;
}

/*
 * Function to calculate game score.
 */
function game_score_calculate() {
    let ip = parseFloat(v("innings")) || 0.0;
    let h  = parseInt(v("hits")) || 0;
    let r  = parseInt(v("runs")) || 0;
    let er = parseInt(v("earned-runs")) || 0;
    let bb = parseInt(v("walks")) || 0;
    let so = parseInt(v("strikeouts")) || 0;
    let hr = parseInt(v("home-runs")) || 0;

    if (er > r) // just in case someone is trying to be cute
        r = er;

    let ur = r - er; // unearned runs
    let innings = Math.floor(ip);
    let past_4 = innings - 4;
    if (past_4 < 0)
        past_4 = 0;

    let Outs = outs(ip);

    let gs_v1 = 50 + Outs + 2*past_4 + so - (2*h + 4*er + 2*ur + bb);
    let gs_v2 = 40 + 2*Outs + so - (2*bb + 2*h + 3*er + 3*ur + 6*hr);

    let br_result = document.getElementById("gs-v1");
    let mlb_result = document.getElementById("gs-v2");
    br_result.innerText = String(gs_v1);
    mlb_result.innerText = String(gs_v2);
}

function game_score_init() {
    let calculate = document.getElementById('game-score-calculate');
    calculate.onclick = game_score_calculate;
}

game_score_init();
