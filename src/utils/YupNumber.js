import * as Yup from 'yup';

export const YupNumber = Yup.number().transform((val, orig) =>
  orig === '' || Number.isNaN(orig) ? undefined : val
);
