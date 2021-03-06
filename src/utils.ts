// currency details
export interface CoinInfo {
    price_change_percentage_24h: number;
    total_volume: number;
    market_cap: number;
    current_price: number;
    name: string;
    image: string;
}

// return a new object with specified keys
export function pick(obj: any, [...keys]) {
    return Object.fromEntries(
        keys.filter((key) => key in obj).map((key) => [key, obj[key]])
    );
}

// currency market data
export interface MarketData {
    market_cap: Array<number>;
    prices: Array<number>;
    total_volumes: Array<number>;
}

// currency api data
export interface RawData {
    name: string;
    image: any;
    description: {
        en: string;
    };
    hashing_algorithm: string;
    market_data: {
        price_change_percentage_24h: number;
        price_change_24h: number;
        total_volume: {
            usd: number;
        };
        market_cap: {
            usd: number;
        };
        circulating_supply: number;
        total_supply: number;
        current_price: {
            usd: number;
            eur: number;
            cad: number;
            jpy: number;
            aud: number;
        };
    };

    price_change_percentage_24h: number;
    coingecko_rank: number;
    links: {
        blockchain_site: Array<string>;
        homepage: Array<string>;
    };
}

// trending currencies
export interface TrendingCoin {
    id: string;
    name: string;
    small: string;
    price_btc: number;
}

export interface APIData extends RawData {
    marketData: MarketData;
}
