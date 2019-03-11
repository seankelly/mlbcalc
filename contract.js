class Player {
    constructor(age, projected_war) {
        this.start_age = age;
        this.start_war = projected_war;
    }
    war_projection(age, previous_war) {
        let projection = previous_war;
        if (age <= 24) {
            projection += 0.25;
        }
        else if (age <= 30) {
            // No change in WAR projection.
        }
        else if (age <= 36) {
            projection -= 0.5;
        }
        else {
            projection -= 0.75;
        }
        return projection;
    }
    projection(years) {
        let end_age = this.start_age + years;
        let war = this.start_war;
        let projection = [war];
        for (let age = this.start_age + 1; age <= end_age; age++) {
            war = this.war_projection(age, war);
            projection.push(war);
        }
        return projection;
    }
}
class Contract {
    constructor(years, dollars_per_war, inflation) {
        this.years = years;
        this.dollars_per_war = dollars_per_war;
        this.inflation = inflation;
    }
}
function contract_projection(initial_years, initial_age, initial_war, initial_cost, initial_inflation) {
    // Let people input inflation as X% rather than calculating the X/100 value.
    let inflation = initial_inflation;
    if (initial_inflation >= 1) {
        inflation = 1 + initial_inflation / 100;
    }
    let player = new Player(initial_age, initial_war);
    let war_projection = player.projection(initial_years);
    let cost = initial_cost;
    let contract = [];
    let age = initial_age;
    for (let year = 0; year < initial_years; year++) {
        let war = war_projection[year];
        let contract_year = {
            year: year + 1,
            age: age,
            war: war,
            cost: cost,
            estimated_contract: war * cost,
        };
        contract.push(contract_year);
        age++;
        cost *= inflation;
    }
    console.log(contract);
    return contract;
}
function format_number(num, digits) {
    if (!digits) {
        digits = 1;
    }
    return num.toFixed(digits);
}
function table_make_row(fields) {
    let row = document.createElement('tr');
    for (let field of fields) {
        let column = document.createElement('td');
        column.innerText = field;
        row.appendChild(column);
    }
    return row;
}
function calculate_contract(ev) {
    let years_el = document.getElementById('years');
    let age_el = document.getElementById('age');
    let war_el = document.getElementById('war');
    let cost_el = document.getElementById('cost');
    let inflation_el = document.getElementById('inflation');
    let initial_years = parseInt(years_el.value);
    let initial_age = parseInt(age_el.value);
    let initial_war = parseFloat(war_el.value);
    let initial_cost = parseFloat(cost_el.value);
    let initial_inflation = parseFloat(inflation_el.value);
    if (!initial_years || !initial_age || !initial_war || !initial_cost || !initial_inflation) {
        return;
    }
    else if (initial_years < 1) {
        return;
    }
    let contract = contract_projection(initial_years, initial_age, initial_war, initial_cost, initial_inflation);
    let results = document.getElementById('contract-results');
    let summary = document.getElementById('contract-summary');
    clear_children(results);
    clear_children(summary);
    let results_fragment = document.createDocumentFragment();
    let total_war = 0;
    let estimated_cost = 0;
    for (let year of contract) {
        let columns = [
            year.year,
            year.age,
            format_number(year.war),
            "$" + format_number(year.cost) + " M",
            "$" + format_number(year.estimated_contract) + " M",
        ];
        let row = table_make_row(columns);
        results_fragment.appendChild(row);
        total_war += year.war;
        estimated_cost += year.estimated_contract;
    }
    results.appendChild(results_fragment);
    // One more row to get the summary.
    let columns = [
        "Summary",
        "",
        format_number(total_war),
        "",
        "$" + format_number(estimated_cost) + " M",
    ];
    summary.appendChild(table_make_row(columns));
}
function clear_children(element) {
    while (element.firstChild) {
        element.removeChild(element.firstChild);
    }
}
function init() {
    let calculate = document.getElementById('contract-calculate');
    calculate.onclick = calculate_contract;
}
init();
