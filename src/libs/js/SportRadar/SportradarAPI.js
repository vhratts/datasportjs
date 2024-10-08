import axios from 'axios';
import { wrapper } from 'axios-cookiejar-support';
import { CookieJar } from 'tough-cookie';

class SportradarAPI {
    providers = [
        {
            tid: 1,
            name: 'Sport Radar',
            default: true,
            slug: 'sport-radar',
            id: 'sportradar',
            s5: 'https://stats.fn.sportradar.com/sportradar',
            url: 'https://sportradar.com'
        },
        {
            tid: 2,
            name: 'Bet365',
            default: false,
            slug: 'bet-365',
            id: 'bet365',
            s5: 'https://stats.fn.sportradar.com/bet365',
            url: 'https://bet365.com'
        },
        {
            tid: 3,
            name: 'BetWay',
            default: false,
            slug: 'bet-way',
            id: 'betway',
            s5: 'https://stats.fn.sportradar.com/betway',
            url: 'https://betway.com'
        },
        {
            tid: 4,
            name: 'BetFair',
            default: false,
            slug: 'bet-fair',
            id: 'betFair',
            s5: 'https://stats.fn.sportradar.com/betFair',
            url: 'https://betfair.com'
        },
        {
            tid: 5,
            name: 'Betano',
            default: false,
            slug: 'betano',
            id: 'betano',
            s5: 'https://stats.fn.sportradar.com/betano',
            url: 'https://betano.com'
        },
        {
            tid: 6,
            name: 'Rivalo',
            default: false,
            slug: 'rivalo',
            id: 'rivalo',
            s5: 'https://stats.fn.sportradar.com/rivalo',
            url: 'https://rivalo.com'
        },
        {
            tid: 7,
            name: '888Sport',
            default: false,
            slug: '888sport',
            id: '888sport',
            s5: 'https://stats.fn.sportradar.com/888sport',
            url: 'https://888sport.com'
        },
        {
            tid: 8,
            name: 'SportingBet',
            default: false,
            slug: 'sporting-bet',
            id: 'sportingbet',
            s5: 'https://stats.fn.sportradar.com/sportingbet',
            url: 'https://sportingbet.com'
        },
    ];

    headers = {
        'accept': '*/*',
        'content-type': 'application/json',
        'accept-encoding': 'gzip, deflate, br, zstd',
        'accept-language': 'pt-BR,pt;q=0.9,en-US;q=0.8,en;q=0.7',
        'cache-control': 'no-cache',
        'origin': 'https://s5.sir.sportradar.com',
        'pragma': 'no-cache',
        'priority': 'u=1, i',
        'referer': 'https://s5.sir.sportradar.com/',
        'sec-ch-ua': '"Google Chrome";v="129", "Not=A?Brand";v="8", "Chromium";v="129"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"macOS"',
        'sec-fetch-dest': 'document',
        'sec-fetch-mode': 'navigate',
        'sec-fetch-site': 'none',
        'sec-fetch-user': '?1',
        'upgrade-insecure-requests': 1,
        'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36',
    };
    /**
     * Construtor da classe SportradarAPI.
     * Configura o Axios com suporte a cookies usando `axios-cookiejar-support`.
     * 
     * @param {string} baseURL - A URL base para as chamadas da API (ex: https://stats.fn.sportradar.com/bet365).
     * @param {string} [locale='br'] - O idioma da API (ex: 'en', 'br'). O padrão é 'br'.
     * @param {string} [timezone='America:New_York'] - O fuso horário utilizado nas requisições. O padrão é 'America:New_York'.
     */
    constructor(baseURL = null, locale = 'br', timezone = 'America:New_York') {

        if (baseURL == null) {
            var providers = this.providers.filter((value) => {
                return value.default;
            })[0];

            baseURL = providers.s5;
        }

        this.jar = new CookieJar();
        this.axiosInstance = wrapper(axios.create({
            baseURL: `${baseURL}/${locale}/${timezone}/gismo`,
            jar: this.jar,
            withCredentials: true,
            headers: this.headers,
        }));
    }

    /**
     * Função auxiliar para fazer requisições GET usando Axios.
     * 
     * @param {string} endpoint - O endpoint específico para a chamada de API (sem a URL base).
     * @returns {Object|null} - Retorna um objeto contendo os dados da API ou `null` em caso de erro.
     */
    async fetchData(endpoint) {
        try {
            const response = await this.axiosInstance.get(endpoint);
            return response.data.doc[0].data;
        } catch (error) {
            console.error(`Erro ao buscar dados do endpoint ${endpoint}:`, error);
            return null;
        }
    }

    /**
     * Obtém a lista de esportes suportados pela API.
     * 
     * @returns {Object|null} - Um objeto contendo a lista de esportes. 
     * Exemplo de retorno:
     * {
     *   "sports": [
     *     { "sport_id": 1, "name": "Football" },
     *     { "sport_id": 2, "name": "Basketball" },
     *     ...
     *   ]
     * }
     */
    async getSportsList() {
        return this.fetchData('config_sports/41/0');
    }

    /**
     * Obtém a lista de países suportados para um determinado esporte.
     * 
     * @param {number} sportId - O ID do esporte cujos países suportados serão retornados.
     * @returns {Object|null} - Um objeto contendo a lista de países suportados. 
     * Exemplo de retorno:
     * {
     *   "countries": [
     *     { "country_id": 1, "name": "Brazil" },
     *     { "country_id": 2, "name": "United States" },
     *     ...
     *   ]
     * }
     */
    async getSupportedCountries(sportId) {
        return this.fetchData(`config_tree_mini/41/0/${sportId}`);
    }

    /**
     * Obtém os detalhes de um país específico.
     * 
     * @param {number} countryId - O ID do país cujos detalhes serão retornados.
     * @returns {Object|null} - Um objeto contendo os detalhes do país. Exemplo de retorno:
     * {
     *   "country": {
     *     "id": 1,
     *     "name": "Brazil",
     *     "population": 211000000,
     *     ...
     *   }
     * }
     */
    async getCountryDetails(countryId) {
        return this.fetchData(`category_get/${countryId}`);
    }

    /**
     * Obtém a lista de torneios de um determinado país e esporte.
     * 
     * @param {number} sportId - O ID do esporte.
     * @param {number} countryId - O ID do país.
     * @returns {Object|null} - Um objeto contendo a lista de torneios. Exemplo de retorno:
     * {
     *   "tournaments": [
     *     { "tournament_id": 101, "name": "Brazilian Championship" },
     *     { "tournament_id": 102, "name": "Copa do Brasil" },
     *     ...
     *   ]
     * }
     */
    async getTournaments(sportId, countryId) {
        return this.fetchData(`config_tree_mini/41/0/${sportId}/${countryId}`);
    }

    /**
     * Obtém os metadados de uma temporada específica de um torneio.
     * 
     * @param {number} tournamentId - O ID do torneio.
     * @returns {Object|null} - Um objeto contendo os metadados da temporada. Exemplo de retorno:
     * {
     *   "season": {
     *     "id": 2023,
     *     "name": "Season 2023",
     *     "start_date": "2023-01-01",
     *     "end_date": "2023-12-31",
     *     ...
     *   }
     * }
     */
    async getSeasonMeta(tournamentId) {
        return this.fetchData(`stats_season_meta/${tournamentId}`);
    }

    /**
     * Obtém as tabelas de uma temporada específica de um torneio.
     * 
     * @param {number} tournamentId - O ID do torneio.
     * @returns {Object|null} - Um objeto contendo os dados da tabela da temporada. Exemplo de retorno:
     * {
     *   "tables": [
     *     { "team_id": 1, "name": "Team A", "points": 45 },
     *     { "team_id": 2, "name": "Team B", "points": 42 },
     *     ...
     *   ]
     * }
     */
    async getSeasonTables(tournamentId) {
        return this.fetchData(`stats_season_tables/${tournamentId}`);
    }

    /**
     * Obtém a tabela de forma de um torneio (desempenho recente).
     * 
     * @param {number} tournamentId - O ID do torneio.
     * @returns {Object|null} - Um objeto contendo a tabela de forma. Exemplo de retorno:
     * {
     *   "form_table": [
     *     { "team_id": 1, "name": "Team A", "form": "WWLWD" },
     *     { "team_id": 2, "name": "Team B", "form": "LLWWW" },
     *     ...
     *   ]
     * }
     */
    async getFormTable(tournamentId) {
        return this.fetchData(`stats_formtable/${tournamentId}`);
    }

    /**
     * Obtém o resumo da liga para uma temporada de torneio.
     * 
     * @param {number} tournamentId - O ID do torneio.
     * @returns {Object|null} - Um objeto contendo o resumo da liga. Exemplo de retorno:
     * {
     *   "league_summary": {
     *     "total_games": 380,
     *     "total_goals": 1023,
     *     ...
     *   }
     * }
     */
    async getLeagueSummary(tournamentId) {
        return this.fetchData(`stats_season_leaguesummary/${tournamentId}/main`);
    }

    /**
     * Obtém estatísticas únicas de times de uma temporada específica.
     * 
     * @param {number} tournamentId - O ID do torneio.
     * @returns {Object|null} - Um objeto contendo as estatísticas dos times. Exemplo de retorno:
     * {
     *   "team_stats": [
     *     { "team_id": 1, "name": "Team A", "shots_on_goal": 56 },
     *     { "team_id": 2, "name": "Team B", "shots_on_goal": 52 },
     *     ...
     *   ]
     * }
     */
    async getUniqueTeamStats(tournamentId) {
        return this.fetchData(`stats_season_uniqueteamstats/${tournamentId}`);
    }

    /**
     * Obtém dados de gols de uma temporada específica de um torneio.
     * 
     * @param {number} tournamentId - O ID do torneio.
     * @returns {Object|null} - Um objeto contendo os dados de gols. Exemplo de retorno:
     * {
     *   "goals": {
     *     "total_goals": 1023,
     *     "average_goals_per_game": 2.7,
     *     ...
     *   }
     * }
     */
    async getGoalsData(tournamentId) {
        return this.fetchData(`stats_season_goals/${tournamentId}/main`);
    }

    /**
     * Obtém dados de over/under de uma temporada específica de um torneio.
     * 
     * @param {number} tournamentId - O ID do torneio.
     * @returns {Object|null} - Um objeto contendo os dados de over/under. Exemplo de retorno:
     * {
     *   "over_under": {
     *     "over_2_5": 210,
     *     "under_2_5": 170,
     *     ...
     *   }
     * }
     */
    async getOverUnder(tournamentId) {
        return this.fetchData(`stats_season_overunder/${tournamentId}`);
    }

    /**
     * Obtém os próximos jogos de um time específico.
     * 
     * @param {number} teamId - O ID do time.
     * @returns {Object|null} - Um objeto contendo informações sobre os próximos jogos do time. Exemplo de retorno:
     * {
     *   "next_games": [
     *     { "match_id": 123, "opponent": "Team B", "date": "2023-10-10" },
     *     { "match_id": 124, "opponent": "Team C", "date": "2023-10-17" },
     *     ...
     *   ]
     * }
     */
    async getTeamNextGames(teamId) {
        return this.fetchData(`stats_team_nextx/${teamId}`);
    }

    /**
     * Obtém os detalhes de uma partida específica.
     * 
     * @param {number} matchId - O ID da partida.
     * @returns {Object|null} - Um objeto contendo detalhes da partida. Exemplo de retorno:
     * {
     *   "match": {
     *     "id": 123,
     *     "home_team": "Team A",
     *     "away_team": "Team B",
     *     "score": "2-1",
     *     "date": "2023-10-10",
     *     ...
     *   }
     * }
     */
    async getMatchDetails(matchId) {
        return this.fetchData(`match_get/${matchId}`);
    }
}

export {
    SportradarAPI
};
