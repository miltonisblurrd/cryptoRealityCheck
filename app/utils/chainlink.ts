import { ethers } from 'ethers';

const CHAINLINK_FEEDS = {
  ETH: '0x5f4eC3Df9cbd43714FE2740f5E3616155c5b8419', // ETH/USD Mainnet
  BTC: '0xF4030086522a5bEEa4988F8cA5B36dbC97BeE88c'  // BTC/USD Mainnet
};

export async function getPrice(crypto: 'ETH' | 'BTC'): Promise<number> {
  const provider = new ethers.providers.JsonRpcProvider(
    'https://eth-mainnet.g.alchemy.com/v2/AJ8XojgWSbamFMFaReoV0ihNDGf6Em5x'
  );

  const aggregatorV3InterfaceABI = [
    "function latestRoundData() external view returns (uint80 roundId, int256 answer, uint256 startedAt, uint256 updatedAt, uint80 answeredInRound)",
    "function decimals() external view returns (uint8)"
  ];

  const priceFeed = new ethers.Contract(
    CHAINLINK_FEEDS[crypto],
    aggregatorV3InterfaceABI,
    provider
  );

  const roundData = await priceFeed.latestRoundData();
  const decimals = await priceFeed.decimals();

  return Number(roundData.answer.toString()) / Math.pow(10, decimals);
}