const parseInput = (input) => {
  const rows = input.split("\n");
  const grid = rows.map((row) => row.split(""));
  return grid;
};

const printRslt = (input, markedNodes) => {
  let rslt = "";

  for (let i = 0; i < input.length; i++) {
    for (let j = 0; j < input[0].length; j++) {
      const nodeStr = `${j}_${i}`;
      if (markedNodes.includes(nodeStr)) {
        rslt = rslt + "#";
      } else {
        rslt = rslt + input[i][j];
      }
    }
    rslt = rslt + "\n";
  }

  console.log(rslt);
};

const getAntiNodes = (node1, node2, maxX, maxY) => {
  const deltaX = node1.x - node2.x;
  const deltaY = node1.y - node2.y;

  let antiNode1 = { x: node1.x + deltaX, y: node1.y + deltaY };
  let antiNode2 = { x: node2.x - deltaX, y: node2.y - deltaY };

  if (
    antiNode1.x > maxX ||
    antiNode1.y > maxY ||
    antiNode1.x < 0 ||
    antiNode1.y < 0
  )
    antiNode1 = null;
  if (
    antiNode2.x > maxX ||
    antiNode2.y > maxY ||
    antiNode2.x < 0 ||
    antiNode2.y < 0
  )
    antiNode2 = null;

  return [antiNode1, antiNode2].filter((node) => node !== null);
};

const getAntiNodes2 = (node1, node2, maxX, maxY) => {
  const deltaX = node1.x - node2.x;
  const deltaY = node1.y - node2.y;

  const rslt = [node1, node2];

  let isOutOfBound1 = false;
  let isOutOfBound2 = false;
  const nextNode1 = {
    x: node1.x,
    y: node1.y,
  };
  const nextNode2 = {
    x: node2.x,
    y: node2.y,
  };

  while (true) {
    const antiNode1 = { x: nextNode1.x + deltaX, y: nextNode1.y + deltaY };
    const antiNode2 = { x: nextNode2.x - deltaX, y: nextNode2.y - deltaY };

    if (
      !isOutOfBound1 &&
      antiNode1.x <= maxX &&
      antiNode1.y <= maxY &&
      antiNode1.x >= 0 &&
      antiNode1.y >= 0
    ) {
      rslt.push(antiNode1);
      nextNode1.x = antiNode1.x;
      nextNode1.y = antiNode1.y;
    } else {
      isOutOfBound1 = true;
    }

    if (
      !isOutOfBound2 &&
      antiNode2.x <= maxX &&
      antiNode2.y <= maxY &&
      antiNode2.x >= 0 &&
      antiNode2.y >= 0
    ) {
      rslt.push(antiNode2);
      nextNode2.x = antiNode2.x;
      nextNode2.y = antiNode2.y;
    } else {
      isOutOfBound2 = true;
    }

    if (isOutOfBound1 && isOutOfBound2) break;
  }

  return rslt;
};

const main = () => {
  const input = parseInput(input2);

  const maxY = input.length - 1;
  const maxX = input[0].length - 1;

  const nodeGroups = {};
  let markedNodes = [];

  for (let i = 0; i <= maxY; i++) {
    for (let j = 0; j <= maxX; j++) {
      const cell = input[i][j];

      if (cell === "." || cell === "#") continue;

      if (nodeGroups[cell]) {
        nodeGroups[cell].push({ x: j, y: i });
      } else {
        nodeGroups[cell] = [{ x: j, y: i }];
      }
    }
  }

  Object.values(nodeGroups).forEach((nodeGroup) => {
    if (nodeGroup.length <= 1) return;

    for (let i = 0; i < nodeGroup.length - 1; i++) {
      for (let j = i + 1; j < nodeGroup.length; j++) {
        const node1 = nodeGroup[i];
        const node2 = nodeGroup[j];

        const antiNodes = getAntiNodes2(node1, node2, maxX, maxY);

        antiNodes.forEach((antiNode) => {
          const str = `${antiNode.x}_${antiNode.y}`;
          if (!markedNodes.includes(str)) {
            markedNodes.push(str);
          }
        });
      }
    }
  });

  console.log(markedNodes);
  console.log(markedNodes.length);

  // printRslt(input, markedNodes);
};

const input1 = `............
........0...
.....0......
.......0....
....0.......
......A.....
............
............
........A...
.........A..
............
............`;

const input2 = `........5..................................e..3...
.......q...........m................e.............
....m.......................................e.....
.........................................C........
.u.m........................8.....................
...........7......9.......8...........F...s.......
6...q..............................s..............
..................................................
..................................................
..................................................
..........9....................F..................
.................................M....D...........
.........U........................................
..q................................8..............
.......9..........................................
0....6.....................e..Qs...............F..
.................................Q...D............
.0.u....................................2.........
..................................................
........u................Q........................
.....E........1...................................
...n....v....................................3....
......u..0................N.......................
............................................z.....
.........7....U.........4.....Z...Q.....D.....V...
..............n1.........f.................2......
E.............................f..............z....
...E........1.Z.......U......................D....
.......n...v....7Z...N............................
..........7..N.....Zf...........................3.
................................b............V....
............4..................................9..
..n...v........................5................2.
.........v.................5.........S............
..........................s.......................
.....U.........4..C.....................S..V......
..................................................
......................c........b............M.....
...........4.Wc....d.......1.....b.....S..........
..E........c............................5......z..
..............w..C....................SM.2........
........................d.........................
...............c......C3..........................
...............w....W.............................
..................................................
.........d.......B....w...........................
....B.....W.......dw..........................M...
...............W......................N...V.......
.B................................................
....................B...............b.............`;

main();
