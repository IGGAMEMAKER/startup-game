import { h, Component } from 'preact';

import Button from './Shared/Button';
import Modal from './Shared/Modal';
import Notification from './Shared/Notification';
import Range from './Shared/Range';
import Select from './Shared/Select';
import arrows from './Shared/arrows';
import Info from './Shared/Info';
import Bar from './Shared/Bar';
import Changeable from './Shared/Changeable';

const icons = {
  rating: 'R',
  XP: 'XP',
  MP: <span className="menu-money-indicator-icon" title="Очки Менеджмента">M</span>,
  PP: <span className="menu-money-indicator-icon" title="Очки Программирования">P</span>,
  SP: <span className="menu-money-indicator-icon" title="Очки Маркетинга">S</span>,
  money: <span className="menu-money-indicator-icon" title="Деньги">$</span>,

  // platforms
  web: <span title="WEB">WEB</span>,
  and: <span title="Android">Android</span>,
  ios: <span title="Ios">Ios</span>,
  mac: <span title="Mac">Mac</span>,
  win: <span title="Windows">Windows</span>,
  lin: <span title="Linux">Linux</span>,
  back: <span title="Сервер">Сервер</span>


};

export default {
  Button,
  Modal,
  Notification,
  Select,
  Range,
  symbols: arrows,
  icons,
  Info,
  Bar,
  Changeable
};
