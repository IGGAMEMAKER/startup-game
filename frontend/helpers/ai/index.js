import Product from '../../classes/Product';

const timeUntilMoneyCollapse = (p) => { return 0; };
const isMoneyCollapsing = (p) => false;

const isMPCollapsing = (p) => false;
const timeUntilMPCollapse = (p) => false;

const isPPCollapsing = (p) => true;
const timeUntilPPCollapse = (p) => 5;

const needsMoney = () => { return 1000 };
const needsMP = () => { return 0 };
const needsPP = () => { return 100 };

const getIncomeOf = product => 2000;

export default function (products: Array<Product>, id) {
  const product: Product = products[id];

  const baseValue = 0.5;

  const query = [
    -needsMoney(),
    -needsMP(),
    -needsPP()
  ];

  const priorities = new Array(3);

  priorities[0] = isMoneyCollapsing(product) ? 1 / (Math.pow(1 + timeUntilMoneyCollapse(product), 3)) : baseValue;
  priorities[1] = isMPCollapsing(product) ? 1 / (Math.pow(1 + timeUntilMPCollapse(product), 3)) : baseValue;
  priorities[2] = isPPCollapsing(product) ? 1 / (Math.pow(1 + timeUntilPPCollapse(product), 3)) : baseValue;

  const actions = [];

  actions.push({
    moneyDelta: 1000,
    mpDelta: -15,
    ppDelta: 0,
    cb: () => {
      
    }
  });
  // improve main features
  // improve payments
  // improve marketing block
  // ad campaign
  // pick bonus
  // rent techs
}
