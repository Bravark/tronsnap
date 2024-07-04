import { AxiosHeaders } from 'axios';
import { TronWeb } from 'tronweb';
// eslint-disable-next-line no-restricted-globals, @typescript-eslint/no-require-imports, @typescript-eslint/no-var-requires
require('dotenv').config();

/**
 *this is used to get tron instance
 @returns TronWeb instance
 
 */
export function getTronWebInstance() {
  const headers = new AxiosHeaders();
  // eslint-disable-next-line no-restricted-globals
  headers.set('TRON-PRO-API-KEY', process.env.TRONGRID_KEY);
  headers.set('Accept', 'application/json');

  const tronweb = new TronWeb({
    fullHost: 'https://api.trongrid.io',
    headers,
  });

  return tronweb;
}

/**
 *get thr TRX banalce of an address
 @returns the banalce of the address
 @param address - the address to get the banalce of
 */
export async function getTrxBalance(address: string) {
  const tronWeb = getTronWebInstance();
  if (!tronWeb.isAddress(address)) {
    throw new Error(`Invalid address`);
  }
  return await tronWeb.trx.getBalance(address);
}
/**
 *get the bandwidth and energy balace of an address
 @returns the bandwidth and energy balace of the address
 @param address - the address to get the bandwidth and energy balace of
 */
export async function getAddressResources(address: string) {
  const tronWeb = getTronWebInstance();
  if (!tronWeb.isAddress(address)) {
    throw new Error(`Invalid address`);
  }
  return await getEnergyAndBandwidth(address, tronWeb);
}

/**
 *returns the energy and bandwidth of an address
 @param address - the address to get the bandwidth and energy balace of
 @param tronWeb - the tronweb instance to use for making requests
 @returns the energy and bandwidth of the address as an object with energyLeft and bandwidthLeft properties
 * @throws an error if the address is invalid or the tronweb instance is not provided
 */
async function getEnergyAndBandwidth(address: string, tronWeb: TronWeb) {
  const accountResources = await tronWeb.trx.getAccountResources(address);
  console.log('accountResources: ', accountResources);

  let energyLeft = 0;
  if (accountResources.EnergyLimit && accountResources.EnergyUsed) {
    energyLeft = accountResources.EnergyLimit - accountResources.EnergyUsed;
  }
  if (!accountResources.EnergyUsed && accountResources.EnergyLimit) {
    energyLeft = accountResources.EnergyLimit;
  }

  const bandwidthLeft = await tronWeb.trx.getBandwidth(address);
  return { energyLeft, bandwidthLeft };
}
