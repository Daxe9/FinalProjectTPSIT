import axios from "axios";

const apiClient = axios.create({
    baseURL: "https://api.coingecko.com/api/v3/",
    withCredentials: false,
    headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
    }
});

export default {
    getRawData(coinID: string) {
        return apiClient
            .get(`coins/${coinID}`)
            .then(({ data }) => data)
            .catch((error) => {
                return new Error(error);
            });
    },
    getMarketData(
        coinID: string,
        currency: string,
        days: number,
        interval: string = "daily"
    ) {
        return apiClient
            .get(
                `coins/${coinID}/market_chart?vs_currency=${currency.toLowerCase()}&days=${days}&interval=${interval}`
            )
            .then(({ data }) => data)
            .catch((error) => {
                return new Error(error);
            });
    },
    getCoinData(
        coinID: string,
        currency: string,
        days: number,
        interval: string = "daily"
    ) {
        return Promise.all([
            this.getRawData(coinID),
            this.getMarketData(coinID, currency, days, interval)
        ])
            .then(([basicData, marketData]) => {
                return {
                    ...basicData,
                    marketData
                };
            })
            .catch((error) => {
                return new Error(error);
            });
    }
};
