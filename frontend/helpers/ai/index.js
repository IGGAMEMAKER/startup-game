import Product from '../../classes/Product';
import productStore from '../../stores/product-store';
import productActions from '../../actions/product-actions';

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

function run (id) {
  const product: Product = productStore.getProduct(id);

  const cost = productStore.getMainFeatureUpgradeCost(id, 3);

  if (productStore.enoughProgrammingPoints(cost, id)) {
    productActions.spendPoints(cost, 0, id);
    productActions.improveFeature(id, 'offer', 3, 10000, 1000);
  }

  productActions.increaseInfluenceOnMarket(id, 0);
  productActions.increaseInfluenceOnMarket(id, 1);
  productActions.increaseInfluenceOnMarket(id, 2);

  return;

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

export default {
  run
};
