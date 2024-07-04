import { TronWeb } from 'tronweb';
import { AxiosHeaders } from 'axios';
require('dotenv').config();

/**
 *this is used to get tron instance
 @returns TronWeb instance
 
 */
function getTronWebInstance() {
  const headers = new AxiosHeaders();
  headers.set('TRON-PRO-API-KEY', process.env.TRONGRID_KEY);
  headers.set('Accept', 'application/json');

  const wallet = new TronWeb({
    fullHost: 'https://api.trongrid.io',
    headers,
  });

  return wallet;
}
