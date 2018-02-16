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
  MP: <span title="Менеджмент">M</span>,
  PP: <span title="Программирование">P</span>,
  SP: <span title="Маркетинг">S</span>
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
