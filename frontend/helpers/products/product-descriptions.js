import * as IDEAS from '../../../shared/constants/products/ideas';

import { DefaultDescription } from '../../../shared/constants/products/types/product-description';

import webHosting from '../../../shared/content/products/WEB-HOSTING';

export default function (idea): DefaultDescription {
  switch (idea) {
    case IDEAS.IDEA_WEB_HOSTING:
      return webHosting;
      break;
  }
};
