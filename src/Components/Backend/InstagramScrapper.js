const axios = require('axios');
const cheerio = require('cheerio');



class InstagramScrapper {

    constructor() {
        this.foursquareClientId = 'YOUR_FOURSQUARE_CLIENT_ID';
        this.foursquareClientSecret = 'YOUR_FOURSQUARE_CLIENT_SECRET';
        this.foursquareVersion = '20210501'; // A versão da API do Foursquare a ser usada
    }

    async searchSilverShopsInTeresina() {
        try {
            const location = 'Teresina';
            const category = 'prata';
            return await this.searchAccountsByLocationAndCategory(location, category);
        } catch (error) {
            console.error('Erro ao buscar lojas de prata em Teresina:', error);
            return [];
        }
    }

    async searchPostsByHashtag(hashtag) {
        try {
            const response = await axios.get(`https://www.instagram.com/explore/tags/${hashtag}/`);
            const html = response.data;
            const $ = cheerio.load(html);
            const posts = [];

            $('article').each((index, element) => {
                const post = {
                    imageUrl: $(element).find('img').attr('src'),
                    text: $(element).find('img').attr('alt'),
                };
                posts.push(post);
            });

            return posts;
        } catch (error) {
            console.error('Erro ao buscar posts do Instagram:', error);
            return [];
        }
    }

    async searchAccountByName(accountName) {
        try {
            const response = await axios.get(`https://www.instagram.com/${accountName}/`);
            const html = response.data;
            const $ = cheerio.load(html);
            const posts = [];

            $('article').each((index, element) => {
                const post = {
                    imageUrl: $(element).find('img').attr('src'),
                    text: $(element).find('img').attr('alt'),
                };
                posts.push(post);
            });

            return posts;
        } catch (error) {
            console.error('Erro ao buscar posts da conta do Instagram:', error);
            return [];
        }
    }

    async searchAccountsByLocationAndCategory(location, category) {
        try {
            const hashtag = `${category}${location.replace(/ /g, '')}`;
            const response = await this.searchPostsByHashtag(hashtag);
            const accounts = [];

            response.forEach(post => {
                const accountName = post.text.match(/@([a-zA-Z0-9._]+)/);
                if (accountName) {
                    accounts.push(accountName[1]);
                }
            });

            return [...new Set(accounts)]; // Remover duplicatas
        } catch (error) {
            console.error('Erro ao buscar contas do Instagram:', error);
            return [];
        }
    }

    async searchInstagramPostsByHashtag(hashtag) {
        return await this.searchPostsByHashtag(hashtag);
    }

    async searchInstagramAccount(accountName) {
        return await this.searchAccountByName(accountName);
    }

    async searchInstagramAccountsByLocationAndCategory(location, category) {
        return await this.searchAccountsByLocationAndCategory(location, category);
    }

    async collectPostsFromAccounts(accounts) {
        let allPosts = [];
        for (const account of accounts) {
            const posts = await this.searchInstagramAccount(account);
            allPosts = allPosts.concat(posts);
        }
        return allPosts;
    }

    async collectSilverShopPostsInTeresina() {
        const accounts = await this.searchSilverShopsInTeresina();
        if (accounts.length === 0) {
            console.log('Nenhuma loja de prata encontrada em Teresina.');
            return [];
        }
        return await this.collectPostsFromAccounts(accounts);
    }

    extractDetailsFromPost(post) {
        // Exemplos de regex para extrair o nome da joia, preço e nome da loja.
        const nameRegex = /([A-Za-zÀ-ÖØ-öø-ÿ0-9\s]+)/;
        const priceRegex = /(?:R\$|r\$|R\$|\$)\s?(\d+(?:[.,]\d{2})?)/;
        const storeNameRegex = /(?:loja|store|@)([\w._]+)/i;

        const nameMatch = post.text.match(nameRegex);
        const priceMatch = post.text.match(priceRegex);
        const storeNameMatch = post.text.match(storeNameRegex);

        return {
            name: nameMatch ? nameMatch[1].trim() : null,
            price: priceMatch ? priceMatch[1].replace(',', '.') : null,
            storeName: storeNameMatch ? storeNameMatch[1] : null,
            imageUrl: post.imageUrl,
            text: post.text
        };
    }

    async getLocationsByCoordinates(lat, lon, radius) {
        const url = `https://api.foursquare.com/v2/venues/search?ll=${lat},${lon}&radius=${radius}&client_id=${this.foursquareClientId}&client_secret=${this.foursquareClientSecret}&v=${this.foursquareVersion}`;
        try {
            const response = await axios.get(url);
            return response.data.response.venues;
        } catch (error) {
            console.error('Erro ao buscar locais no Foursquare:', error);
            return [];
        }
    }

    async getInstagramData(lat, lon, radius) {
        const locations = await this.getLocationsByCoordinates(lat, lon, radius);

        const posts = [];
        for (const location of locations) {
            const locationName = location.name.replace(/ /g, '');
            const hashtag = `prata${locationName}`;
            const postsByHashtag = await this.searchPostsByHashtag(hashtag);
            posts.push(...postsByHashtag);
        }

        const detailedPosts = posts.map(post => this.extractDetailsFromPost(post)).filter(details => details.name && details.price && details.storeName);

        return detailedPosts;
    }
}

module.exports = InstagramScrapper;
