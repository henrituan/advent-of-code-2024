const parseInput = (input) => {
  const [rules, pagesToPrint] = input.split("\n\n");

  return {
    rules: rules.split("\n").map((rule) => rule.split("|")),
    pagesToPrint: pagesToPrint.split("\n").map((pages) => pages.split(",")),
  };
};

const compare = (rules, page1, page2) => {
  let count = 0;
  for (let i = 0; i < rules.length; i++) {
    if (rules[i].includes(page1) && rules[i].includes(page2)) {
      count++;
    }
  }

  return count;
};

const count1 = (input) => {
  const { rules, pagesToPrint } = parseInput(input);

  console.log({ rules, pagesToPrint });
};

const input1 = `47|53
97|13
97|61
97|47
75|29
61|13
75|53
29|13
97|29
53|29
61|53
97|53
61|29
47|13
75|47
97|75
47|61
75|61
47|29
75|13
53|13

75,47,61,53,29
97,61,53,29,13
75,29,13
75,97,47,61,53
61,13,29
97,13,75,29,47`;

console.log(count1(input1));
