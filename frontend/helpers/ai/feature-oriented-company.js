import Product from '../../../shared/classes/Project';
import productStore from '../../stores/store';


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
}
