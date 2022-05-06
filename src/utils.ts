export interface CoinInfo {
    price_change_percentage_24h: number;
    total_volume: number;
    market_cap: number;
    current_price: number;
    name: string;
    image: string;
}

export function pick(obj: any, [...keys]) {
    return Object.fromEntries(
        keys.filter((key) => key in obj).map((key) => [key, obj[key]])
    );
}

export interface MarketData {
    market_cap: Array<number>;
    prices: Array<number>;
    total_volumes: Array<number>;
}

export interface RawData {
    name: string;
    image: any;
    description: {
        en: string;
    };
    hashing_algorithm: string;
    market_data: any;
    current_price: {
        usd: number;
        eur: number;
        cad: number;
        jpy: number;
        aud: number;
    };
    price_change_percentage_24h: number;
    coingecko_rank: number;
}
export interface APIData extends RawData {
    marketData: MarketData;
}
