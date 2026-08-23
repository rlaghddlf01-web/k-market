// Pure K-Market Korean Master
import { common } from './common';
import { header } from './header';
import { footer } from './footer';
import { hero } from './hero';
import { feed } from './feed';
import { item_detail } from './item_detail';
import { post_create } from './post_create';
import { moving_sale } from './moving_sale';
import { chat } from './chat';
import { appointment } from './appointment';
import { community } from './community';
import { auth } from './auth';
import { safety } from './safety';
import { scam_warning } from './scam_warning';
import { report_block } from './report_block';
import { review } from './review';
import { tax_benefit } from './tax_benefit';

export const ko = {
  ...common,
  ...header,
  ...footer,
  ...hero,
  ...feed,
  ...item_detail,
  ...post_create,
  ...moving_sale,
  ...chat,
  ...appointment,
  ...community,
  ...auth,
  ...safety,
  ...scam_warning,
  ...report_block,
  ...review,
  ...tax_benefit,
};

export default ko;
