import chalk from "chalk";
import inquirer from "inquirer";
let apilink = "https://v6.exchangerate-api.com/v6/766cd936f5604bd5388bb251/latest/PKR";
let fetchData = async (data) => {
    let fetchData = await fetch(data);
    let res = await fetchData.json();
    return res.conversion_rates;
};
let data = await fetchData(apilink);
let countries = Object.keys(data);
let firstCountry = await inquirer.prompt({
    type: "list",
    name: "name",
    message: "Converting From",
    choices: countries,
});
console.log(`Converting from ${chalk.greenBright.bold(firstCountry.name)}`);
let usermoney = await inquirer.prompt({
    type: "number",
    name: "rupee",
    message: `Please Enter the amount in ${chalk.greenBright.bold(firstCountry.name)}`,
});
let secondCountry = await inquirer.prompt({
    type: "list",
    name: "name",
    message: "Converting To",
    choices: countries,
});
let cnv = `https://v6.exchangerate-api.com/v6/766cd936f5604bd5388bb251/pair/${firstCountry.name}/${secondCountry.name}`;
// fetching data for conversion rate
let cnvData = async (data) => {
    let cnvData = await fetch(data);
    let res = await cnvData.json();
    return res.conversion_rates;
};
let conversionRate = await cnvData(cnv);
let convertedRate = usermoney.rupee * conversionRate;
console.log(`your ${chalk.bold.greenBright(firstCountry.name)} ${chalk.bold.greenBright(usermoney.rupee)} in ${chalk.bold.greenBright(secondCountry.name)} is ${chalk.bold.greenBright(convertedRate)}`);
