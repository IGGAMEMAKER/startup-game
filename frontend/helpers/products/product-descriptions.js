import * as IDEAS from '../../constants/products/ideas';

import { DefaultDescription } from '../../constants/products/types/product-description';

import webStudio from '../../content/products/WEB-STUDIO';
import webHosting from '../../content/products/WEB-HOSTING';

export default function (idea): DefaultDescription {
  switch (idea) {
    case IDEAS.IDEA_WEB_STUDIO:
      return webStudio;
      break;
    case IDEAS.IDEA_WEB_HOSTING:
      return webHosting.compute();
      break;
  }
};
