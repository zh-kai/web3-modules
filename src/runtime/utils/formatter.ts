// import dayjs from 'dayjs'

import { BigNumberish } from "ethers";
import BigNumber from "bignumber.js";

export const formatAddress = (address: string, len = 4) => {
  return `${address.slice(0, len + 2)}...${address.slice(-len)}`;
};

// export const formatTime = (timestamp: number, formatter = 'YYYY-MM-DD HH:mm:ss') => {
//   return dayjs.unix(timestamp).format(formatter)
// }

function toFixed(value: BigNumber, digits = 0) {
  if (value.lt(1) && value.gt(0)) {
    return value
      .toFixed()
      .replace(new RegExp(`^(0.0*[1-9][0-9]{${digits - 1}}).*`), "$1")
      .replace(/0+$/, "");
  }
  return value
    .times(10 ** digits)
    .dp(0, BigNumber.ROUND_DOWN)
    .div(10 ** digits)
    .toFixed();
}
export function formatUnits(
  value: BigNumberish | BigInt | BigNumber,
  decimals = 18,
  digits = decimals,
  simple = false
) {
  value = new BigNumber(value.toString());

  // is 0 ?
  if (value.eq(0)) return "0";

  const units = toFixed(value.div(10 ** decimals), digits);
  if (digits < decimals && Number(units) < 1 / 10 ** digits && simple) {
    return "<" + `0.${"1".padStart(digits, "0")}`;
  }
  return units;
}
